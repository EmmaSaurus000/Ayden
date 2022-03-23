const path = require('path');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const config = require('./config/index.js');

// pg
// const { Client } = require('pg'); // replaced by pool
// const client = new Client();

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host:  'localhost', // 'database.server.com',
  database: 'ayden',
  password: 'postgres',
  port: 5432,
});

// async declaration as lambda

(async () => {
    await pool.connect();
    //let hash = await bcrypt.hash('passwordmcpassword', config.hash_rounds);
    //console.log(hash);
    //let correct_pwd = await bcrypt.compare('passwordmcpassword', hash);
    //console.log(correct_pwd);
    
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT, pwd TEXT);');
    // await pool.query('INSERT INTO first_table VALUES($1);', [numb]);
    //let res = await pool.query('SELECT numbers FROM first_table where numbers = $1;', [numb]);
    //console.log(res);
    
    // console.log(res.rows[0].message); // Hello world! // nothing returned
    // await client.end(); // don't want it to end automatically
})();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(28000, () => {console.log('listening')});


