const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const uuid = require('uuid/v4');

router.get("/", async (req, res) => {
	res.render("login");
});

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	let error_message = "Account with that username already exists";
	let userCreated = false;
	try {
		userCreated = await userData.createUser(username, password);
	} catch (e) {
		error_message = "Empty username/password."
	}
	
	if (userCreated) {
		// Create cookie
		let sID = uuid();
		res.cookie("AuthCookie", sID);
		userData.addUserSessionID(userCreated._id, sID);

		res.redirect("/account");
	} else {
		let data = {
			error: error_message
		}
		res.render("login", data);
	}

	return true;
});

module.exports = router;