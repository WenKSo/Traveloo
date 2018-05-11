const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v4');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');

async function getUserByUsername(username) {
    try{
        if(!username || typeof username != 'string'){
            throw "username must be a non-empty string";
        }

        let userCollection = await users();
        let user = await userCollection.findOne({username});
        return user;
    } catch(e) {
        throw e;
    }
}

async function loginUser(username, password) {
	if (!username || typeof username != 'string' || !password || typeof password != 'string')
		throw "username and password must be non-empty strings";

	let user = undefined;
	try {
		user = await getUserByUsername(username);
	} catch (e) {
		return false;
	}

	if (user && await bcrypt.compare(password, user.hashedpassword))
		return user;
	else
		return false;
}

const createUser = async function createUser(name, password, gender, searchHistory) {

    if (!name)
        throw "You must provide name and description";

    try {
        let ID = uuid();
        let newInfo = {
            _id : ID,
            name: name,
            password: password,
            gender: gender,
            history: searchHistory
        };

        const userCollection = await users();
        const insertInfo = await userCollection.insertOne(newInfo);

        if (insertInfo.insertedCount === 0)
            throw "Could not add user info";

        const thisUser = await this.getUser(ID);
        return thisUser;
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
        return await userCollection.findOne( {name: username});
    }
    catch (err) {
        console.log(err);
    }
}

const updateUser = async function updateUser(userId, input, destination) {

    if (!userId)
        throw "You must provide a user Id to search for"

    try {
        const userCollection = await users();
        const usergo = await userCollection.findOne({_id: id });
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

const checkPassword = async function checkPassword(username, password) {
    if (!username || typeof username != 'string' || !password || typeof password != 'string')
        throw "Invalid username or password."

    try {
        var user = getExistingUser(username)
    } catch (error) {
        return false;
    }

    if (getExistingUser(username).password == password) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
	checkPassword,
	getUserByUsername,
	loginUser,
	getUser,
	createUser,
	findExistingUser,
	updateUser
};
