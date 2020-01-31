import {Schema} from "mongoose";
import Team = require("../mongoose/Team");
import DataAccess = require("./../dataaccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class TeamSchema {
    static get schema() {

        const user = new Schema({
                name: {
                    type: String
                },
                tagline: {
                    type: String
                },
                teamLeaderId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                members: {
                    type: Array
                },
                events: {
                    type: Array
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return user;
    }
}
const teamSchema = mongooseConnection.model<Team>("Team", TeamSchema.schema);
export = teamSchema;
