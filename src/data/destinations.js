<<<<<<< HEAD
const mogodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const destinations = mongoCollections.destinations;
const uuid = require("uuid/v4")
=======
const mongoCollections = require("../config/mongoCollections");
const destinations = mongoCollections.destinations;
const uuid = require("node-uuid")
>>>>>>> 0eb5c1ac7853961d6c27077f24bdfa3104c301ff

async function getAllDestinations(){
        const postCollection = await posts();
        return await postCollection.find({}).toArray();
    }

async function getDestinationByName(name){
        if (!name) throw "No destination name provided";
        const destCollection = await destinations();
        return await destCollection.find({ name: name }).toArray();
    }

<<<<<<< HEAD
async function getDestinationByID(_id){
    try{
        if (!_id || typeof _id !== "string")
        {
            throw "ID must be a non-empty string";
        }

        let destCollection = await destinations();
        return await destCollection.findOne({
            _id: _id
        });
    } catch (e) {
        throw e;
    }
}
=======
>>>>>>> 0eb5c1ac7853961d6c27077f24bdfa3104c301ff
async function addDestination(name,region,climate){
    if (typeof name !== "string") throw "No destination name provided";
    if (typeof region !== "string") throw "No region provided";
    if (typeof climate !== "string") throw "No climate provided";
    
    const destCollection = await destinations();
    
    const newDestination = {
      _id: uuid.v4(),
      name: name,
      region: region,
      climate: climate,
      rating: 0,
      numOfRating: 0,
      comments: [],
      activities: []
    };

    const newInsert = await destCollection.insertOne(newDestination);
    const newName = newInsert.name;
    return await this.getDestinationByName(newName);
}

<<<<<<< HEAD
=======
async function addComments(destination,author,title,text){
    if (typeof author !== "string") throw "No author provided";
    if (typeof title !== "string") throw "No title provided";
    if (typeof text !== "string") throw "No text provided";
    
    const newComment = {
        author : author,
        title: title,
        text: text
    };
    
    destination.comments.push(newComment);
}

>>>>>>> 0eb5c1ac7853961d6c27077f24bdfa3104c301ff
async function addActivities(destination,event,content){
    if (typeof event !== "string") throw "No event provided";
    if (typeof content !== "string") throw "No content provided";
    
    const newActivity = {
        event: event,
        content: content
    };
    
    destination.activities.push(newActivity);
}

<<<<<<< HEAD
async function searchDestination(searchInfo){
    try {
		if (!searchInfo || typeof searchInfo !== "string")
			return [];

		searchInfo = searchInfo.toLowerCase();
		let regEx = new RegExp('.*' + searchInfo + '.*', 'i');

		let destCollection = await destinations();
		let searchResults = await destCollection.find(
		{
			name: regEx
		}).toArray();

		return searchResults;
	} catch (e) {
		throw e;
	}
}

async function addComments(destination,author, text){
    if (typeof author !== "string") throw "No author provided";
    // if (typeof title !== "string") throw "No title provided";
    if (typeof text !== "string") throw "No text provided";
    
    const newComment = {
        author : author,
        // title: title,
        text: text
    };
    
    destination.comments.push(newComment);
}

=======
>>>>>>> 0eb5c1ac7853961d6c27077f24bdfa3104c301ff
async function updateRating(destination, score){
    const num = destination.numOfRating;
    const beforeRate = destination.rating;
    destination.rating = ((beforeRate * num) + score) / (num+1);
    destination.numOfRating++;
<<<<<<< HEAD

    return rating;
}

module.exports = {
    getAllDestinations,
    getDestinationByName,
    getDestinationByID,
    addComments,
    addDestination,
    addActivities,
    updateRating,
    searchDestination
=======
}

module.exports = {
    getAllDestions,
    getDestinationByName,
    addDestination,
    addComments,
    addActivities,
    updateRating
>>>>>>> 0eb5c1ac7853961d6c27077f24bdfa3104c301ff
};