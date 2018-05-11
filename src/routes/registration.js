const express = require("express");
const router = express.Router();
const userData = require("../data/users")
const uuid = require('uuid/v4');

router.get("/", async (req, res) =>{
    res.render("registration")
});

router.post("/", async(req, res) =>
{
    const username = req.body.name;
    const password = req.body.password;
    const gender = req.body.gender;
    let error_message = "Account already exists.";
    let userCreated = false;
    try{
        userCreated = await userData.createUser(username, password, gender);
    } catch(e) {
        error_message = "Empty username/password";
    }
    
    if(userCreated) {
        res.redirect("login");
    } else {
        let data = {
            error: error_message
        }
        res.render("login", data);
    }
    return true;
    
});

module.exports = router;