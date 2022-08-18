import db from '../database/db.js'
import { 
    devices_query,
    device_by_serial_query
    } from '../queries/device_queries.js'

export const getDevices = (req, res) => {
    if (req?.query?.serial) {
        let serial = req.query.serial;
        if(serial) {
            db.query(device_by_serial_query, [ serial ],
                function (err, result, fields) {
                    if (err) throw err;
                    console.log(result)
                    res.send(result);
                }
            );
        }
    } else {
        db.query(devices_query, 
            function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            }
        );
    }
}   

export const createDevice = (req, res) => {  
    const device = req.body; 
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