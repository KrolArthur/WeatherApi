import db from '../database/db.js'

export const getUsers = (req, res) => {
    db.query("SELECT id, username, email, password FROM user", 
        function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        }
    );
}   

export const createUser = (req, res) => {  
    const user = req.body; 
    console.log('User [${user.username}] added to the database.');
};

export const getUser = (req, res) => {
    res.send(req.params.id);
    console.log(req.params.id);
};

export const deleteUser = (req, res) => { 
    console.log('user with id ${req.params.id} has been deleted');

};

export const updateUser =  (req,res) => {
    console.log('username has been updated to ${req.body.username}.age has been updated to ${req.body.age}')
};