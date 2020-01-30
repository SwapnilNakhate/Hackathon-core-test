import {Schema} from "mongoose";
import Event = require("../mongoose/Event");
import DataAccess = require("./../dataaccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class EventSchema {
    static get schema() {

        const event = new Schema({
                name: {
                    type: String
                },
                shortDescription: {
                    type: String
                },
                logo: {
                    type: String
                },
                maxTeamSize: {
                    type: Number
                },
                startDateTime: {
                    type: Date
                },
                endDateTime: {
                    type: Date
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return event;
    }
}
const eventSchema = mongooseConnection.model<Event>("Event", EventSchema.schema);
export = eventSchema;
