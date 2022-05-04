const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', (req, res) => {    // router receives req and passes to request handlers / here being relative path ie /user/
    const {email, password } = req.body; // alt req.body.password
    User.register(email, password);
    res.redirect('/');
        // this the request handler!
});

router.post('/log_in', async (req, res) => {
    const {email, password } = req.body; // alt req.body.password
    let is_correct_details = await User.log_in(email, password); // BUG promises returned produces T?; await fixes
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

router.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let userFile = req.files.userFile;

  // Use the mv() method to place the file somewhere on your server
  userFile.mv('../../uploads/filename.txt', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = router; //