const sql = require("mssql");
const config = require('../../config.json');

const connect = async () => {

  const pool = new sql.ConnectionPool({
    user: config.sql.user,
    password: config.sql.password,
    server: config.sql.dataSource,
    database: config.sql.databse,
    options: {
    trustServerCertificate: true
    }
  });

  return await pool.connect();
};


module.exports = connect()