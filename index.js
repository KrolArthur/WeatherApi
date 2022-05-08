import usersRoutes from './routes/users.js';
import express from 'express';
import mysql from 'mysql';

const app = express();

app.use('/users', usersRoutes);

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "weatherdb",
    port : 3306
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log('Listening on port 3000'));