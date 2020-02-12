import {Schema} from "mongoose";
import Event = require("../mongoose/Event");
import DataAccess = require("./../dataAccess");

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
                prizes :  [{ type: Schema.Types.ObjectId, ref: 'Prize' }],
                teams :  [{
                    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
                    repoLink: { type: String },
                    coding_standards: { type: Number, default: 0 },
                    usablity: { type: Number, default: 0 },
                    ui_ux: { type: Number, default: 0 },
                    functionalCompleteness: { type: Number, default: 0 },
                    finalScore: { type: Number, default: 0 }
                }]
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
