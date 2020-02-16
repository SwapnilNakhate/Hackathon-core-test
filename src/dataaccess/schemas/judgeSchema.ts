import {Schema} from "mongoose";
import Judge = require("../mongoose/Judge");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class JudgeSchema {
    static get schema() {

        const judge = new Schema({
                email: {
                    type: String,
                    unique: true,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                createdBy: {
                    type: Schema.Types.ObjectId,
                    ref: 'Organizer' 
                },
                specialization: {
                    type: String,
                    required: true
                },
                contactNo : {
                    type: Number
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return judge;
    }
}
const judgeSchema = mongooseConnection.model<Judge>("Judge", JudgeSchema.schema);
export = judgeSchema;
