const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', (req, res) => {    // router receives req and passes to request handlers / here being relative path ie /user/
    const {email, password } = req.body; // alt req.body.password
    User.register(email, password);
    res.redirect('/');
        // this the request handler!
});

router.post('/log_in', (req, res) => {
    const {email, password } = req.body; // alt req.body.password
    let is_correct_details = User.log_in(email, password);
    if (is_correct_details) {
        // here is where session is set
        req.session.email = email;
    }
    res.redirect('/');
})

router.post('/set_note', (req, res) => {
    User.update_note(req.session.email, req.body.note);
    res.redirect('/dashboard');
});

module.exports = router; //