import {Schema} from "mongoose";
import Event = require("../mongoose/Event");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class EventSchema {
    static get schema() {

        const event = new Schema({
                name: {
                    type: String,
                    required: true
                },
                shortDescription: {
                    type: String
                },
                organizerId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Organizer',
                    required: true
                },
                logo: {
                    type: String
                },
                problemStatement: {
                    type: String,
                    required: true
                },
                rulesAndRegulations : {
                    type: String,
                    required: true
                },
                maxTeamSize: {
                    type: Number,
                    required: true
                },
                startDateTime: {
                    type: Date,
                    required: true
                },
                endDateTime: {
                    type: Date,
                    required: true
                },
                status: {
                    type: String,
                    required: true
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
