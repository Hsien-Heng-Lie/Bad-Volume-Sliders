const sql = require("mssql/msnodesqlv8");
const config = require('../../config.json');

const connect = async () => {

  const pool = new sql.ConnectionPool({
    user: config.sql.user,
    password: config.sql.password,
    server: config.sql.dataSource,
    database: config.sql.databse,
    options: {
      trustedConnection: false
    }
  });

  return await pool.connect();
};


module.exports = connect()