const express = require("express");
const router = express.Router();
const userData = require("../data/users")
const uuid = require('uuid/v4');

router.get("/", async (req, res) =>{
    res.render("register");
});

router.post("/", async(req, res) =>
{
    const username = req.body.user;
    const password = req.body.pw;
    const confirm = req.body.confirm;
    const gender = req.body.sex;
    let error_message = "Account already exists.";
    let userCreated = false;
    try{
      console.log("Debug1");
        userCreated = await userData.createUser(username, password, gender, []);
        console.log("Debug2");
    } catch(e) {
        error_message = "Empty username/password";
    }
    console.log("Debug3");
    if(userCreated) {
        res.redirect("login");
    } else {
        let data = {
            error: error_message
        }
        res.render("login", data);
    }
    console.log("Debug4");
    let users = await userData.getAllUsers();
    console.log(users.length);
    return true;
    
});

module.exports = router;