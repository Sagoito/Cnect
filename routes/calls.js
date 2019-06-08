var express = require("express"),
router = express.Router(),
possibleCall = require("../models/possibleCall"),
middleware = require("../middleware");




//SHOW ALL CALLS
router.get("/", function(req, res) {
    possibleCall.find({}, function(err, allCalls){
        if(err){
            console.log(err);
        } else {
            res.render("calls/calls", {possibleCalls: allCalls});
        }
    });
});






//CREATE CALLS
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var school = req.body.school;
    var time = req.body.time;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    var newCall = {name: name, school: school, time: time, image: image, author: author};
    // save to db
    possibleCall.create(newCall, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect
            res.redirect("/calls");
        }
    });
});


router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("calls/new");
});

// SHOW MORE INFO

router.get("/:id", function(req, res) {
    //find calls
    possibleCall.findById(req.params.id, function(err, foundCall){
        if(err) {
            console.log(err);
        } else {
            //render template
            res.render("calls/show", {possibleCall: foundCall});
        }
    });
});

//EDIT CALL ROUTE


router.get("/:id/edit", middleware.checkCallOwership, function(req, res) {
    possibleCall.findById(req.params.id, function(err, foundCall){
        if(err) {
            console.log(err);
        } else {
            res.render("calls/edit", {possibleCall: foundCall});
        }
    });
});

// UPDATE CALL ROUTE
router.put("/:id", middleware.checkCallOwership, function(req, res){
    possibleCall.findByIdAndUpdate(req.params.id, req.body.possibleCall, function(err, updatedCall){
        if(err) {
            res.redirect("/calls");
        } else {
            res.redirect("/calls/" + req.params.id);
        }
    });
});


// DESTROY CALL ROUTE

router.delete("/:id", middleware.checkCallOwership, function(req, res) {
    possibleCall.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/calls");
            } else {
                res.redirect("/calls");
        }
    });
});


module.exports = router;
