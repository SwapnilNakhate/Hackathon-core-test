import Event = require("../dataaccess/mongoose/Event");
import EventRepository = require("../dataaccess/repository/EventRepository");
import { getLogger } from 'log4js';
const logger = getLogger("Event Service");

class EventService {

    private eventRepository: EventRepository;

    constructor() {
        this.eventRepository = new EventRepository();
    }

    public createEventData(event: Event, callback: (error: any, response: any) => void) {
        this.eventRepository.create(event, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getEventById(eventId: any, callback: (error: any, response: any) => void) {
        this.eventRepository.retrieveById(eventId, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllEventByOrganizerId(organizer: any, callback: (error: any, response: any) => void) {
        let query = { organizerId : organizer };
        this.eventRepository.retrieve(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllEventData(callback: (error: any, response: any) => void) {
        this.eventRepository.retrieveWithPopulate({}, 'prizes', (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllTeamsByEventId(eventId: any, callback: (error: any, response: any) => void) {
        const query = { _id: eventId };
        const populateQuery = { path: 'teams._id', model: 'Team'};
        this.eventRepository.retrieveWithPopulate(query, populateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public updateEventData(eventId: any, updatedEvent: Event, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : eventId };
        this.eventRepository.update(updateQuery, updatedEvent, {new: true}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public enrollForEvent(eventId: any, temId: any, callback: (error: any, response: any) => void) {
        const findQuery = { _id: eventId, "teams._id" : temId };
        this.eventRepository.retrieve(findQuery, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                if(result.length === 0) {
                    const eventFindQuery = { _id: eventId};
                    let team = {
                        _id: temId,
                        repoLink : "",
                        coding_standards: 0,
                        creativity: 0,
                        usablity: 0,
                        ui_ux: 0,
                        functionalCompleteness: 0,
                    };
                    const updatedEvent = { $push : { teams : team }};
                    this.eventRepository.update(eventFindQuery, updatedEvent, {new: true}, (errStack, data) => {
                        if (errStack) {
                            callback(errStack, null);
                        } else {
                            callback(null, data);
                        }
                    });
                } else {
                    let errorMessage = new Error();
                    errorMessage.message = "You have already applied for his event.";
                    callback(errorMessage, null);
                }
            }
        });
    }
    public deleteEventById(eventId: any, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : eventId };
        this.eventRepository.deleteById(updateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
}

Object.seal(EventService);
export = EventService;
