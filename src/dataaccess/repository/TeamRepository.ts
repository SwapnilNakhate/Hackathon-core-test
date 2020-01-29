import TeamSchema = require("../schemas/teamSchema");
import Team = require("./../mongoose/Team");

import RepositoryBase = require("./base/repository.base");

class TeamRepository extends RepositoryBase<Team> {

  constructor() {
    super(TeamSchema);
  }

}

Object.seal(TeamRepository);
export = TeamRepository;
