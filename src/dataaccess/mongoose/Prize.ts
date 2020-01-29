import * as mongoose from "mongoose";
import prizeModel = require("./../models/prize");

interface IPrize extends prizeModel, mongoose.Document {
    _id: string;
}
export = IPrize;
