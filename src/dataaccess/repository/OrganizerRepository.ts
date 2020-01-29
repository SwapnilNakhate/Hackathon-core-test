import OrganizerSchema = require("../schemas/organizerSchema");
import Organizer = require("./../mongoose/Organizer");

import RepositoryBase = require("./base/repository.base");

class OrganizerRepository extends RepositoryBase<Organizer> {

  constructor() {
    super(OrganizerSchema);
  }

}

Object.seal(OrganizerRepository);
export = OrganizerRepository;
