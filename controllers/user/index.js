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
    User.log_in(email, password);
    res.redirect('/');
})

module.exports = router; //