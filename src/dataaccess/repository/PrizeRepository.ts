import PrizeSchema = require("../schemas/prizeSchema");
import Prize = require("./../mongoose/Prize");

import RepositoryBase = require("./base/repository.base");

class PrizeRepository extends RepositoryBase<Prize> {

  constructor() {
    super(PrizeSchema);
  }

}

Object.seal(PrizeRepository);
export = PrizeRepository;
