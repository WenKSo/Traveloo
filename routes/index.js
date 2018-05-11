const accountRoute = require("./account");
const destRoute = require("./destination");
const resultRoute = require("./result");
const homeRoute = require("./home");
const loginRoute = require("./login");
const registrationRoute = require("./registration");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

function constructorMethod(app) {
    app.use("/home", homeRoute);
    app.use("/account", accountRoute);
    app.use("/destination", destRoute);
    app.use("/result", resultRoute);
    app.use("/login", loginRoute);
    app.use("/registration", registrationRoute);
    app.use("*", async (req, res) => {
        res.redirect("/home");
        
    });
};

module.exports = constructorMethod;