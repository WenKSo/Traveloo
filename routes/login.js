const express = require("express");
const router = express.Router();
const userData = require("../data/users");
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

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	let error_message = "Incorrect username/password."
	let user = undefined;

	try {
		user = await userData.loginUser(username, password);
	} catch (e) {
		error_message = "Empty username/password."
	}

	if (user) {
		// Create cookie

		res.redirect("/account");
	} else {
		let data = {
			error: error_message
		}
		res.render("login", data);
	}
});

module.exports = router;