const express = require("express");
const router = express.Router();
const userData = require("../data/users")
const uuid = require('uuid/v4');
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/", async (req, res) => {
	let user = await getUserFromCookie(req);

	// Redirect to /account if already logged in
	if (user) {
		res.redirect("/account");
	} else {
		res.render("login");
	}
});

router.post("/", async(req, res) =>
{
    const username = req.body.name;
    const password = req.body.password;

    var error_message = "Incorrect username/password."
    var auth = false;
    try {
        auth = await userData.checkPassword(username, password);
        console.log(auth);
    } catch (e) {
        error_message = "Invalid username/password"
    }
    if(auth) {
        res.redirect("/account");
    } else {
        var errdata = {
            title: "Home",
            error: error_message
        }
        res.render("login", errdata);
    }
});

module.exports = router;