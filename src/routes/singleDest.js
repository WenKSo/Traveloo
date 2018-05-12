const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const destData = require("../data/destinations");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/:_id", async (req, res) =>{
    let user = await getUserFromCookie(req);
    try{
        let _id = req.params._id;
        // console.log("1");
        // console.log(_id);
        let dest = await destData.getDestinationByID(_id);
        // console.log("2");
        var data = {
            user,
            dest
        };
		// console.log("3");
        res.render("singleDest", data)
        // console.log("4");
    } catch (e) {
		let errorNum = 404;
		let data = {
			errorNum: errorNum,
			description: "Destination not in the database"
		}
		res.status(errorNum).render("error", data);
	}
});

router.post("/addComment", async (req, res)=>{
    let user = await getUserFromCookie(req);
    let pid = req.headers.referer;
    console.log(pid.length);
    if(pid[pid.length-1] == '/'){
        pid = pid.substr(0, pid.length-1);
    }
    let _id = pid.substr(pid.lastIndexOf('/') +1);

    let dest = await destData.getDestinationByID(_id);
    let text = req.body;
    console.log(_id);
    console.log(text);
    destData.addComments(dest, user, text);
    res.redirect("/singleDest/" + _id);
});

module.exports = router;