import {Schema} from "mongoose";
import User = require("../mongoose/User");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {
    static get schema() {

        const user = new Schema({
                email: {
                    type: String,
                    unique: true
                },
                firstName: {
                    type: String
                },
                lastName: {
                    type: String
                },
                password : {
                    type: String
                },
                teamId : {
                    type: Schema.Types.ObjectId,
                    ref: 'Team'
                },
                contactNumber : {
                    type: String
                },
                gitId : {
                    type: String
                },
                designation : {
                    type: String
                },
                image : {
                    type: String
                },
                tShirtSize : {
                    type: String
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return user;
    }
}
const userSchema = mongooseConnection.model<User>("User", UserSchema.schema);
export = userSchema;
