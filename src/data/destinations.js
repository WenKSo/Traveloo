const mogodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const destinations = mongoCollections.destinations;
const uuid = require("uuid/v4")

const destinationList = [
    {
        name: "Hoboken",
        region: "New Jersey",
        climate: "humid continental",
        rating: 0,
        numOfRating: 0,
        comments: []
    },
    {
        name: "Paris",
        region: "France",
        climate: "oceanic",
        rating: 0,
        numOfRating: 0,
        comments: []
    },
    {
        name: "London",
        region: "England",
        climate: "temperate oceanic",
        rating: 0,
        numOfRating: 0,
        comments: []
    },
    {
        name: "Hawaii",
        region: "Pacific Ocean",
        climate: "tropical",
        rating: 0,
        numOfRating: 0,
        comments: []
    },
    {
        name: "Vancouver",
        region: "Canada",
        climate: "oceanic",
        rating: 0,
        numOfRating: 0,
        comments: []
    },
    {
        name: "Beijing",
        region: "China",
        climate: "temperate continental",
        rating: 0,
        numOfRating: 0,
        comments: []
    },

]



async function getDestinationByName(name) {
    if (!name) throw "No destination name provided";
    const destCollection = await destinations();
    return await destCollection.find({ name: name }).toArray();
}

async function getDestinationByID(_id) {
    try {
        if (!_id || typeof _id !== "string") {
            // console.log(_id);
            throw "ID must be a non-empty string";
        }
        // console.log("6");
        let destCollection = await destinations();
        // console.log("7");
        return await destCollection.findOne({
            _id: _id
        });
    } catch (e) {
        throw e;
    }
}


async function searchDestination(searchInfo) {
    try {
        if (!searchInfo || typeof searchInfo !== "string")
            return [];

        searchInfo = searchInfo.toLowerCase();
        let regEx = new RegExp('.*' + searchInfo + '.*', 'i');

        let destCollection = await destinations();

        // console.log(await destCollection.find({name: "hoboken"}).toArray());
        // console.log(await destCollection.find({name: "london"}).toArray());
        let nameResult = await destCollection.find(
            {
                name: regEx
            }).toArray();
        // let climateResult = await destCollection.find(
        //     {
        //         climate: regEx
        //     }).toArray();
        // let RegionResult = await destCollection.find(
        //     {
        //         region: regEx
        //     }).toArray();
        // let finalresult = {$setUnion: [nameResult, climateResult]}.toArray();
        // console.log(finalresult);
        return nameResult;

    } catch (e) {
        throw e;
    }
}

async function addDestination(destination) {

    const destCollection = await destinations();
    const newDestination = {
        _id: uuid(),
        name: Object.values(destination)[0],
        region: Object.values(destination)[1],
        climate: Object.values(destination)[2],
        rating: Object.values(destination)[3],
        numOfRating: Object.values(destination)[4],
        comments: Object.values(destination)[5]
    };
    // if(newDestination.name == destCollection.find({name: newDestination.name}).name){}
    // console.log("new Destination");
    // console.log("here");
    if ((await destCollection.find({ name: newDestination.name }).toArray())[0] != undefined) {
        if ((await destCollection.find({ name: newDestination.name }).toArray())[0].name != newDestination.name) {
            // console.log("loged");
            const newInsert = await destCollection.insertOne(newDestination);
            const newName = newInsert.name;
            return await getDestinationByName(newName);
        }
    } else {
        // console.log("loged");
        const newInsert = await destCollection.insertOne(newDestination);
        return true;
    }
}

async function loadAllDestination() {
    for (var i = 0; i < destinationList.length; i++) {
        addDestination(destinationList[i]);

        // console.log(destinationList[i]);
    }
    return true;
}

async function addComments(destination, author, text) {
    if (typeof author !== "string") throw "No author provided";
    // if (typeof title !== "string") throw "No title provided";
    if (typeof text !== "string") throw "No text provided";

    const newComment = {
        author: author,
        // title: title,
        text: text
    };

    destination.comments.push(newComment);
}

async function updateRating(destination, score) {
    const num = destination.numOfRating;
    const beforeRate = destination.rating;
    destination.rating = ((beforeRate * num) + score) / (num + 1);
    destination.numOfRating++;

    return rating;
}

loadAllDestination();

module.exports = {
    getDestinationByName,
    getDestinationByID,
    addComments,
    addDestination,
    updateRating,
    loadAllDestination,
    searchDestination,
    destinationList
};