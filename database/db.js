import mysql from 'mysql'

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "weatherdb",
    port : 3306
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database...");
  });

export default db;