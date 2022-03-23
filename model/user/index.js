// reg, log in, delete user -- all functionality
const config = require('../config');

async function register(email, pwd) {
    let hash = await bcrypt.hash($pwd, config.hash_rounds);
    console.log(hash);
    const res = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    // res.rows contains response data
    const is_email_unique = (res.rows.length == 0);
}

async function log_in(email, pwd) {
    let is_pwd_correct = await bcrypt.compare(pwd, hash);
    console.log(is_pwd_correct);
    return is_pwd_correct;
}