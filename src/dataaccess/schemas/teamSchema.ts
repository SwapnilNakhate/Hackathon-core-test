import {Schema} from "mongoose";
import Team = require("../mongoose/Team");
import DataAccess = require("./../dataaccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class TeamSchema {
    static get schema() {

        const user = new Schema({
                email: {
                    type: String
                },
                firstName: {
                    type: String
                },
                lastName: {
                    type: String
                },
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
