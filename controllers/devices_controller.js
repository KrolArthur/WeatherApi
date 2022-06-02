import db from '../database/db.js'

export const getDevices = (req, res) => {
    db.query("SELECT id FROM device", 
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        }
    );
}   

export const createDevice = (req, res) => {  
    const user = req.body; 
    console.log('User [${user.username}] added to the database.');
};

export const getDevice = (req, res) => {
    res.send(req.params.id);
    console.log(req.params.id);
};

export const deleteDevice = (req, res) => { 
    console.log('user with id ${req.params.id} has been deleted');

};

export const updateDevice =  (req,res) => {
    console.log('username has been updated to ${req.body.username}.age has been updated to ${req.body.age}')
};