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
                organizerId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Organizer' 
                },
                logo: {
                    type: String
                },
                problemStatement: {
                    type: String
                },
                rulesAndRegulations : {
                    type: String
                },
                winnerTeamId: {
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
                },
                status: {
                    type: String
                },
                prizes :  [{ type: Schema.Types.ObjectId, ref: 'Prize' }]
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
