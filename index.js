const path = require('path');
const express = require('express');
const app = express();

// pg
// const { Client } = require('pg'); // replaced by pool
// const client = new Client();

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host:  'localhost', // 'database.server.com',
  database: 'Ayden',
  password: 'postgres',
  port: 5432,
});

// async declaration as lambda
(async () => {
    await pool.connect();
    const res = await pool.query('CREATE TABLE IF NOT EXISTS first_table (numbers INTEGER);');
    // console.log(res.rows[0].message); // Hello world! // nothing returned
    // await client.end(); // don't want it to end automatically
})();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));




app.get('/', (req, res) => {
    res.render('index');
});

app.listen(28000);


