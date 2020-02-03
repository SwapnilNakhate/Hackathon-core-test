import * as Mongoose from "mongoose";
import config = require("config");
import { getLogger } from 'log4js';
const logger = getLogger("Dataccess");
let dbConfig = config.get("database.name");

class DataAccess {
    public static mongooseInstance: any;
    public static mongooseConnection: Mongoose.Connection;

    public static connect(): Mongoose.Connection {
        if (this.mongooseInstance) { return this.mongooseInstance; }

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            logger.debug("Connected to mongodb.");
            console.log("Connected to mongodb.");
        });
        Mongoose.set("debug", true);
        var dbURL;// = "mongodb://sbr-devp-129:27017/" + dbConfig;
        if(process.env.pathToMongoDb != null) {
            
            dbURL = process.env.pathToMongoDb;
        } else {
            dbURL = "mongodb://sbr-devp-129:27017/" + dbConfig;
        }
        this.mongooseInstance = Mongoose.connect(dbURL, { useNewUrlParser: true });
        return this.mongooseInstance;
    }
}
DataAccess.connect();
export = DataAccess;
