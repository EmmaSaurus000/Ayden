// reg, log in, delete user -- all functionality
const config = require('../../config');
const db = require('../../postgres').db();
const bcrypt = require('bcrypt');

async function register(email, pwd) {
    let hash = await bcrypt.hash(pwd, config.hash_rounds);
    let is_email_unique = !(await is_email_registered(email)); //Q? ! 
    if (is_email_unique) {
        await db.query('INSERT INTO users values($1, $2, $3)', [email, hash, 'Hello world']);
    } else {
        throw "Email already in use";
    }
}

async function is_email_registered(email) {
    const res = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    // res.rows contains response data
    const does_email_exist = (res.rows.length >= 1);
    return does_email_exist;
}

async function log_in(email, pwd) {
    const res = await db.query('SELECT pwd FROM users WHERE email = $1;', [email]);
    if ( res.rows.length <1) {
        throw 'No account with that email';
    }
    const account = res.rows[0];
    let is_pwd_correct = await bcrypt.compare(pwd, account.pwd);
    return is_pwd_correct;
}

async function get(email){
    const res = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return res.rows[0];
}

async function update_note(email, note){
    const res = await db.query('UPDATE users SET note = $1 WHERE email = $2;', [note, email]);
}

module.exports = {register, log_in, get, update_note};