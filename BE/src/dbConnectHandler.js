const sql = require("mssql/msnodesqlv8");
const config = require('./config.json');

const connect = async () => {
  const pool = new sql.ConnectionPool({
    server: config.sql.dataSource,
    database: config.sql.databse,
    options: {
      trustedConnection: true
    }
  });

  return await pool.connect();
};


module.exports = connect()