var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
flash = require("connect-flash"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
methodOverride = require("method-override"),
middleware = require("./middleware"),
User = require("./models/user");

// all routes

var callRoutes = require("./routes/calls"),
indexRoutes = require("./routes/index");

//deleted line with connecting to databse (password)
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// PASPORT CONFIGURATION

app.use(require("express-session")({
    secret: "You can't know this one",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// show profile rout

app.get("/profile/:id", middleware.isLoggedIn, function(req, res) {
    User.findById(req.params.id, function(err, foundUser){
        if(err) {
            console.log(err);
        } else {
                res.render("profile", {User: foundUser});
        }
    })
});


app.use("/", indexRoutes);
app.use("/calls", callRoutes);





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Your application is running!");
});
















