const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const destData = require("../data/destinations");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

function noUserError(res) {
    let errorNum = 403;
    let data = {
        errorNum:errorNum,
        description: "User is not logged in."
    };

    res.status(errorNum).render("error", data);
}

router.get("/", async (req, res) =>{
    let user = await getUserFromCookie(req);

    if(user) {

        data ={
            user
        }
        res.render("account", data);
    }else{
        noUserError(res);
    }
});



module.exports = router;