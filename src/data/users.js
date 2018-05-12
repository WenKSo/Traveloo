const mongoCollections = require("../config/mongoCollections");
const uuid = require("uuid/v4");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;


const createUser = async function createUser(name, password, gender, searchHistory) {
    console.log(password);
    console.log("in create user");
    //if (typeof name !== "string") throw "No user name provided";
    if (typeof password !== "string") throw "No password provided";
    //if (typeof gender !== "string") throw "No gender provided";
    console.log("about to make new user");
    let hash = await bcrypt.hash(password, saltRounds)
    console.log(hash);
    try {
        let ID = uuid();
        let newInfo = {
            _id: ID,
            name: name,
            password: hash,
            gender: gender,
            history: searchHistory
        };

        const userCollection = await users();
        const insertInfo = await userCollection.insertOne(newInfo);

        if (insertInfo.insertedCount === 0)
            throw "Could not add user info";

        const thisUser = await this.getUser(ID);
        console.log(thisUser.name);
        console.log(thisUser.password);
        return thisUser;
    }

    catch (err) {
        console.log(err);
    }

}

const getAllUsers = async function getAllUsers() {
    console.log("In get users");
    try {
        console.log("debug 1");
        const userCollection = await users();
        console.log("debug 2");
        const allUsers = await userCollection.find({}).toArray();
        console.log(allUsers);
        return allUsers;
    }

    catch (err) {
        console.log(err);
    }

}

const getUser = async function getUser(id) {

    if (!id)
        throw "You must provide an id to search for";

    try {
        const userCollection = await users();
        const usergo = await userCollection.findOne({ _id: id });

        if (usergo === null)
            throw "No user found with this id"

        return usergo;
    }

    catch (err) {
        console.log(err);
    }

}

const findExistingUser = async function findExistingUser(username) {
    if (!username)
        throw "You must provide an username";
    try {
        const userCollection = await users();
        return await userCollection.findOne({ name: username });
    }
    catch (err) {
        console.log(err);
    }
}

const getExistingUser = async function getExistingUser(username) {
    console.log(username);
    if (!username) throw "No destination name provided";
    console.log("get1");
    const userCollection = await users();
    console.log("get2");
    return await userCollection.findOne({ name: username });
}

const updateUser = async function updateUser(userId, input, destination) {

    if (!userId)
        throw "You must provide a user Id to search for"

    try {
        const userCollection = await users();
        const usergo = await userCollection.findOne({ _id: id });
        var newHistory = {
            input: input,
            destination: destination
        };

        usergo.history.push(newHistory);
        return await this.getUser(userId);
    }

    catch (err) {
        console.log(err);
    }

}

const removeUser = async function removeUser(id) {

    if (!id)
        throw "You must provide an id to search for"

    try {

        const userCollection = await users();
        const deletionInfo = await userCollection.removeOne({ _id: id });

        if (deletionInfo.deletedCount === 0)
            throw `Could not delete user with id of ${id}`;

        return true;
    }

    catch (err) {
        console.log(err);
    }

}

const checkPassword = async function checkPassword(username, password) {
    console.log("d0");
    let hash = await bcrypt.hash(password, saltRounds)
    console.log(hash);
    // if (!username || typeof username != 'string' || !password || typeof password != 'string')
    //     throw "Invalid username or password."
    console.log(username);
    console.log(password);
    try {
        console.log("d1");
        var user = await getExistingUser(username);
        console.log("d2");
        console.log(user);
    } catch (error) {
        console.log("d3");
        return false;
    }
    if (user) {
        try {
            console.log("d4");
            var res = (user && await bcrypt.compare(password, user.password));
            console.log(password);
            console.log(user.name);
            console.log(res);
            if (res) {
                console.log("d5");
                return true;
            }
            console.log("d6");
            return false;
        } catch (e) {
            throw e;
        }
    } 
    /*if (user && await bcrypt.compare(password, user.password)) {
        console.log("d4");
        return true;
    } else {
        console.log("d5");
        return false;
    }*/
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    findExistingUser,
    getExistingUser,
    updateUser,
    removeUser,
    checkPassword
};