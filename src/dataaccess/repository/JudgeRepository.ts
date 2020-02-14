import JudgeSchema = require("../schemas/judgeSchema");
import Judge = require("./../mongoose/Judge");

import RepositoryBase = require("./base/repository.base");

class JudgeRepository extends RepositoryBase<Judge> {

  constructor() {
    super(JudgeSchema);
  }

}

Object.seal(JudgeRepository);
export = JudgeRepository;
