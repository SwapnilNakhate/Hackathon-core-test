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

    public getAllEventData(callback: (error: any, response: any) => void) {
        this.eventRepository.retrieveWithPopulate({}, 'prizes', (error, result) => {
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
