const mongoCollections = require("../config/mongoCollections");
const destinations = mongoCollections.destinations;
const uuid = require("node-uuid")

async function getAllDestinations(){
        const postCollection = await posts();
        return await postCollection.find({}).toArray();
    }

async function getDestinationByName(name){
        if (!name) throw "No destination name provided";
        const destCollection = await destinations();
        return await destCollection.find({ name: name }).toArray();
    }

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

async function addActivities(destination,event,content){
    if (typeof event !== "string") throw "No event provided";
    if (typeof content !== "string") throw "No content provided";
    
    const newActivity = {
        event: event,
        content: content
    };
    
    destination.activities.push(newActivity);
}

async function updateRating(destination, score){
    const num = destination.numOfRating;
    const beforeRate = destination.rating;
    destination.rating = ((beforeRate * num) + score) / (num+1);
    destination.numOfRating++;
}

module.exports = {
    getAllDestions,
    getDestinationByName,
    addDestination,
    addComments,
    addActivities,
    updateRating
};