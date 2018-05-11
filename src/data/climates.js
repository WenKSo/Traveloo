const mongoCollections = require("../config/mongoCollections");
const climates = mongoCollections.climates;
const uuid = require("uuid/v4");

async function getAllClimates(){
        const climateCollection = await climates();
        return await climateCollection.find({}).toArray();
    }

async function getClimateByName(){
        if (!name) throw "No climate name provided";
        const climateCollection = await climates();
        return await climateCollection.find({ name: name }).toArray();
    }

async function addClimate(name){
        if (typeof name !== "string") throw "No climate name provided";
        const climateCollection = await climates();
        
        return await climateCollection.find({}).toArray();
    }

async function addCityId(name, cityId){
        if (typeof name !== "string") throw "No climate name provided";
        const climateCollection = await climates();
        const newClimate = {
          _id: uuid.v4(),
          name: name,
          cities: [cityId]
        };
    
        const newInsert = await climateCollection.insertOne(newClimate);
        const newName = newInsert.name;
        return await this.getClimateByName(newName);
    }

module.exports = {
    getAllClimates,
    getClimateByName,
    addClimate,
    addCityId
};


