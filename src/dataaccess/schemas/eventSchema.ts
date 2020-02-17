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
                difficulty : {
                    type: String
                },
                status: {
                    type: String,
                    required: true
                },
                technologies: [],
                nameSpaceId: {
                    type: String,
                    required: true
                },
                teams :  [{
                    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
                    repoLink: { type: String },
                    evaluations: { type: Array }
                }],
                evaluationConfiguration : {
                    type: Array
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
