import * as mongoose from "mongoose";
import eventModel = require("./../models/event");

interface IEvent extends eventModel, mongoose.Document {
    _id: string;
}
export = IEvent;
