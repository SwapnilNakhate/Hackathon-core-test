import {Schema} from "mongoose";
import Prize = require("../mongoose/Prize");
import DataAccess = require("./../dataaccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class PrizeSchema {
    static get schema() {

        const prize = new Schema({
                rank: {
                    type: Number
                },
                title: {
                    type: String
                },
                description: {
                    type: String
                },
                amount: {
                    type: Number
                }
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
