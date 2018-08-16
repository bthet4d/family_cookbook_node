var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook.js');

router.get('/login', function(req, res, next){
  res.render('login', {title: 'Please Sign In with:'});
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect();
})

router.get('/facebook', passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    //successul authentication redirect home
    res.redirect('/');
});

module.exports = router;
