import {Schema} from "mongoose";
import Organizer = require("../mongoose/Organizer");
import DataAccess = require("./../dataaccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class OrganizerSchema {
    static get schema() {

        const organizer = new Schema({
                email: {
                    type: String,
                    unique: true
                },
                name: {
                    type: String
                },
                organization: {
                    type: String
                },
                logo : {
                    type: String
                },
                contactNo : {
                    type: Number
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return organizer;
    }
}
const organizerSchema = mongooseConnection.model<Organizer>("Organizer", OrganizerSchema.schema);
export = organizerSchema;
