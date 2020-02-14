import {Schema} from "mongoose";
import Team = require("../mongoose/Team");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class TeamSchema {
    static get schema() {

        const team = new Schema({
                name: {
                    type: String,
                    unique : true,
                    required: true
                },
                tagline: {
                    type: String
                },
                teamLeaderId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                members: [{
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }],
                events: [{
                    type: Schema.Types.ObjectId,
                    ref: 'Event'
                }]
            },
            {
                timestamps: true,
                versionKey: false
            });
        return team;
    }
}
const teamSchema = mongooseConnection.model<Team>("Team", TeamSchema.schema);
export = teamSchema;
