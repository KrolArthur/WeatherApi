import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import db from './database/db.js'
import { login_query } from './queries/authentication_queries.js'

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

const accessTokenSecret = 'eb29c5b0-935f-47fc-b2cd-77349876394f';
const refreshTokenSecret = '02e8ff09-9cd5-4ae1-b62e-3ace8dfc9158';

let refreshTokens = [];

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let user = db.query(
        login_query,
        [ username, password ],
        function (err, result) {
            if (err) throw err;
            if(result != null) {
                let idResult = JSON.stringify(result[0].id)
                let usernameResult = JSON.stringify(result[0].username)
                let roleResult = JSON.stringify(result[0].isAdmin)
                const accessToken = jwt.sign(
                    { 
                        username: usernameResult, 
                        role: roleResult 
                    }, 
                    accessTokenSecret, 
                    { 
                        expiresIn: '20m' 
                    }
                );

                const refreshToken = jwt.sign({ username: usernameResult, role: roleResult }, refreshTokenSecret);
        
                refreshTokens.push(refreshToken);
                res.json({
                    id: idResult,
                    accessToken,
                    refreshToken
                });
        
            } else {
                res.send('Username or password incorrect');
            }
        }
    );
});

app.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        console.log('no token');
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err) => {
        if (err) {
            console.log('verify fail');
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
});

app.listen(3001, () => {
    console.log('Authentication service started on port 3001');
});
