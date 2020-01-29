import * as mongoose from "mongoose";
import teamModel = require("./../models/team");

interface ITeam extends teamModel, mongoose.Document {
    _id: string;
}
export = ITeam;
