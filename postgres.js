const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host:  'localhost', // 'database.server.com',
  database: 'ayden',
  password: 'postgres',
  port: 5432,
});

// functuoin in line with obj
module.exports = {
    db: () => {
        return pool;
    },
    connect: async () => {
        await pool.connect();
    }
};