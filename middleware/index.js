var possibleCall = require("../models/possibleCall");


var middlewareObj = {};

middlewareObj.checkCallOwership = function(req, res, next) {
    if(req.isAuthenticated()){
        possibleCall.findById(req.params.id, function(err, foundCall) {
            if(err){
                req.flash("error", "This Call couldn't be found");
                res.redirect("back");
            } else {
                // does user own the campground?
                if (foundCall.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You can't do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You have to be logged in to do that");
        res.redirect("back");
    }
};



middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You have to be logged in to do that");
    res.redirect("/login");
};



module.exports = middlewareObj;