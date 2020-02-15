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
                    unique: true,
                    required: true
                },
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                password : {
                    type: String,
                    required: true
                },
                teamId : {
                    type: Schema.Types.ObjectId,
                    ref: 'Team'
                },
                contactNumber : {
                    type: String
                },
                gitId : {
                    type: String,
                    required: true
                },
                designation : {
                    type: String,
                    required: true
                },
                image : {
                    type: String
                },
                tShirtSize : {
                    type: String
                },
                dob : {
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
const userSchema = mongooseConnection.model<User>("User", UserSchema.schema);
export = userSchema;
