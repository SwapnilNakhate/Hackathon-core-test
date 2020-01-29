import * as mongoose from "mongoose";
import organizerModel = require("./../models/organizer");

interface IOrganizer extends organizerModel, mongoose.Document {
    _id: string;
}
export = IOrganizer;
