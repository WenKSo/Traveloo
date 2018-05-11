const express = require("express");
const router = express.Router();
const destData = require("../data/destinations")
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/", async (req, res) => {
	let user = await getUserFromCookie(req);

	let data = {
		user
	};
	res.render('home', data);
});

module.exports = router;