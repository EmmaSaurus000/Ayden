const path = require("path");
const express = require("express");
const app = express();
const csurf = require("csurf");
const fupload = require("express-fileupload");
const config = require("./config/index.js");
const postgres = require("./postgres");
const routes = require("./routes");
const session = require("express-session");
const { session_secret } = require("./config/secrets.js");

// pg
// const { Client } = require('pg'); // replaced by pool
// const client = new Client();

/* moved
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host:  'localhost', // 'database.server.com',
  database: 'ayden',
  password: 'postgres',
  port: 5432,
});
*/

// async declaration as lambda

(async () => {
  await postgres.connect();
  // await pool.connect();
  //let hash = await bcrypt.hash('passwordmcpassword', config.hash_rounds);
  //console.log(hash);
  //let correct_pwd = await bcrypt.compare('passwordmcpassword', hash);
  //console.log(correct_pwd);

  await postgres
    .db()
    .query(
      "CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, pwd TEXT, note TEXT);"
    );
  // await pool.query('INSERT INTO first_table VALUES($1);', [numb]);
  //let res = await pool.query('SELECT numbers FROM first_table where numbers = $1;', [numb]);
  //console.log(res);

  // console.log(res.rows[0].message); // Hello world! // nothing returned
  // await client.end(); // don't want it to end automatically

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "/views"));
  // middleware for form data must be declared before routes as routes uses form data
  app.use(express.urlencoded({ extended: true }));
  // Session middleware must appear before routes
  app.use(
    session({
      secret: config.secrets.session_secret,
      resave: false,
      saveUninitialized: true,
      // http only for dev: change to true for prod
      cookie: { secure: config.is_production }, // TODO: adding in session expiry
    })
  );
  // csrf - modifies req object; adds token() which returns token to client
  app.use(csurf());
  // see notes on next
  app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.csrfToken = req.csrfToken();

    // console.log(req.session);
    next();
  });
  app.use(fupload({ limits: { fileSize: 50 * 1024 * 1024 }, safeFileNames: true, }));
  app.use("/", routes); // routes are middleware! all requests sent via here

  app.listen(28000, () => {
    console.log("listening");
  });
})();

/*
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(28000, () => {console.log('listening')});
*/
