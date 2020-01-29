import EventSchema = require("../schemas/eventSchema");
import Event = require("./../mongoose/Event");

import RepositoryBase = require("./base/repository.base");

class EventRepository extends RepositoryBase<Event> {

  constructor() {
    super(EventSchema);
  }

}

Object.seal(EventRepository);
export = EventRepository;
