const MongoClient = require("mongodb").MongoClient;

const settings = {
	mongoConfig: {
		serverUrl: "mongodb://localhost:27017/",
<<<<<<< HEAD
		database: "Final-Project"
=======
		database: "traveloo"
>>>>>>> 0eb5c1ac7853961d6c27077f24bdfa3104c301ff
	}
};

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined;


let connectDb = () => {
	if (!_connection) {
		_connection = MongoClient.connect(fullMongoUrl)
			.then(db => {
				return db;
			});
	}

	return _connection;
};

module.exports = connectDb;