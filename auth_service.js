import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import db from './database/db.js'

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
//tokens should be generated with for example Crypto lib
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

let refreshTokens = [];

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let sql = "SELECT id, username, isAdmin FROM authentication WHERE username = ? AND password = ?"
    const user = db.query(sql,
        [ username, password ],
        function (err, result) {
            if (err) throw err;
            return {
                username : JSON.stringify(result[0].username),
                role : JSON.stringify(result[0].isAdmin)
            }
        }
    );

    if (user) {
        const accessToken = jwt.sign(
            { 
                username: user.username, 
                role: user.admin 
            }, 
            accessTokenSecret, 
            { 
                expiresIn: '1m' 
            }
        );
        const refreshToken = jwt.sign({ username: user.username, role: user.admin }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });

    } else {
        res.send('Username or password incorrect');
    }
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

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            console.log('verify fail');
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

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
