import {Schema} from "mongoose";
import Organizer = require("../mongoose/Organizer");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class OrganizerSchema {
    static get schema() {

        const organizer = new Schema({
                email: {
                    type: String,
                    unique: true,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                specialization: {
                    type: String,
                    required: true
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
