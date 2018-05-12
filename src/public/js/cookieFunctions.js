const userData = require("../../data/users");

async function getUserFromCookie(req) {
    let user;
    try {
        user = await userData.getUserBySessionID(req.cookies.AuthCookie);
    } catch(e){
        user = undefined;
    }

    return user;
}

module.exports ={
    getUserFromCookie
};