import * as mongoose from "mongoose";
import judgeModel = require("./../models/judge");

interface IJudge extends judgeModel, mongoose.Document {
    _id: string;
}
export = IJudge;
