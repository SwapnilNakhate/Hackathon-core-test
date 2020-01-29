import {Schema} from "mongoose";
import Prize = require("../mongoose/Prize");
import DataAccess = require("./../dataaccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class PrizeSchema {
    static get schema() {

        const prize = new Schema({
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
        return prize;
    }
}
const prizeSchema = mongooseConnection.model<Prize>("Prize", PrizeSchema.schema);
export = prizeSchema;
