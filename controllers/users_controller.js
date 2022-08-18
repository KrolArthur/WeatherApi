import db from '../database/db.js'
import { 
    users_query, 
    login_query,
    user_create_query,
    user_query,
    user_delete_query } from '../queries/user_queries.js'

export const getUsers = (req, res) => {
    if (req?.query?.username && req?.query?.password) {
        let username = req?.query?.username
        let password = req?.query?.password
        if (username && password) {
            db.query(login_query, [ username, password ],
                function (err, result, fields) {
                    if (err) throw err;
                    res.send(result);
                }
            );
        } else {
            res.sendStatus(404);
        }
    } else {
        db.query(users_query, 
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    }
}   

export const createUser = (req, res) => {  
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    db.query(user_create_query, 
        [req?.query?.username, req?.query?.email, req?.query?.password, date],
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        }
    );
};

export const getUser = (req, res) => {
    db.query(user_query, 
        [req?.params?.id],
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        }
    );
};

export const deleteUser = (req, res) => { 
    db.query(user_delete_query, 
        [req?.params?.id],
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        }
    );
};

export const updateUser =  (req,res) => {
    res.send(404);
};