const express = require("express");
const router = express.Router();
const userData = require("../data/users")
const destData = require("../data/destinations")
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/", async (req, res) =>{
    let user = await getUserFromCookie(req);
    try{
        let searchInfo = req.query['query'];
		let searchResults = await destData.searchDestination(searchInfo);
		var data = {
			searchResults,
			user
		};

		res.render("result", data);
    } catch (e) {
		let errorNum = 404;
		let data = {
			errorNum: errorNum,
			description: e
		}
		res.status(errorNum).render("error", data);
	}
});

router.get("/")

module.exports = router;