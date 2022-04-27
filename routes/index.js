const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const User = require('../models/user');

router.use('/user', user);


router.get('/', async (req, res) => {
    if (req.session.email) return res.redirect('/dashboard'); // only accessible on session object if logged in
    res.render('index'); // first var page, second arg vars provided
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.email) return res.redirect('/'); // only accessible on session object if logged in
    const user = await User.get(req.session.email);
    //res.send('Holder text'); // sends raw text
    res.render('dashboard', {note: user.note}); // first var page, second arg vars provided
    // render uses view name; redirect uses path so needs /
});

module.exports = router; // way to make return value avail rather than just code

