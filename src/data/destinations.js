const mongoCollections = require("../config/mongoCollections");
const destinations = mongoCollections.destinations;
const uuid = require("node-uuid")

function getAllDestinations(){
        return destinations;
    }

function getDestinationByName(name){
        for(let i = 0; i < destinations.length; i++){
            if(destionations[i].name == name){
                return destinations[i];
            }
        }
        return null;
    }

function addComments(author,title,text){
    if (typeof author !== "string") throw "No author provided";
    if (typeof title !== "string") throw "No title provided";
    if (typeof text !== "string") throw "No text provided";
    
    const newComment = {
        author : author,
        title: title,
        text: text
    }
    
    
    
}

module.exports = {
    getAllDestions,
    getDestinationByName
};