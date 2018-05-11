const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const destData = require("../data/destinations");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/:_id", async (req, res) => {
	let user = await getUserFromCookie(req);
	try {
		let _id = req.params._id;
		let destination = await destData;

		let comments = destination.comments;

		var data = {
			user,
			destination,
			comments
		};

		res.render("destination", data);
	} catch (e) {
		let errorNum = 404;
		let data = {
			user,
			errorNum: errorNum,
			description: "the destination is not in the database"
		}
		res.status(errorNum).render("error", data);
	}
});

router.get("/addComment", async (req, res) => {
	let user = await getUserFromCookie(req);
	let destination = await destData;
	let text = req.body;
	let destID = destination._id;
	
	if (user) {
		try {
			destination.addComments(destination, user, text);
			res.redirect("/destination/" + destID);
		} catch (e) {
			res.redirect("/destination/" + destID);
		}
	} else {
		noUserError(res);
	}
});

module.exports = router;