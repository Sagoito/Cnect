var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing");
});

//show register form

router.get("/register", function(req, res){
    res.render("register");
});

//sign up logic

router.post("/register", function(req, res){
    var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        skype: req.body.skype,
        country: req.body.country,
        avatar: '/img/avatar.png'
        
    });
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Cnect " + user.username);
            res.redirect("/calls");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/calls",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout rout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged you out")
    res.redirect("/calls");
});





module.exports = router;