import db from '../database/db.js'
import { 
    measurements_query, 
    measurement_query, 
    measurement_create_query, 
    measurement_delete_query } from '../queries/measurement_queries.js'

export const getMeasurments = (req, res) => {
    db.query(measurements_query, 
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        }
    );
}   

export const createMeasurment = (req, res) => {  
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    db.query(measurement_create_query, 
        [req?.query?.temperature, req?.query?.humidity, req?.query?.device_id, date],
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        }
    );
};

export const getMeasurment = (req, res) => {  
    db.query(measurement_query, 
        [req?.params?.id],
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        }
    );
};

export const deleteMeasurment = (req, res) => {
    db.query(measurement_delete_query, 
        [req?.params?.id],
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            console.log(result);
        }
    );
}