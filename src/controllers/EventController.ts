import * as express from "express";
import EventService = require("../service/EventService");

class EventController {
    private localEventService: EventService;
    constructor() {
        this.localEventService = new EventService();
    }

    public createEvent(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const event = req.body;
            const eventService = new EventService();
            eventService.createEventData(event, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in creating Event Data : ", e);
        }
    }

    public getEventById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const eventService = new EventService();
            const eventId = req.params.id;
            eventService.getEventById(eventId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Event Data . ", e);
        }
    }

    public getAllEvents(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const eventService = new EventService();
            eventService.getAllEventData((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Event Data . ", e);
        }
    }

    public updateEvent(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const eventId = req.params.id;
            const updateBody = req.body;
            const eventService = new EventService();
            eventService.updateEventData(eventId, updateBody, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in updating Event Data : ", e);
        }
    }

    public deleteEventById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const eventId = req.params.id;
            const eventService = new EventService();
            eventService.deleteEventById(eventId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in deleting Event by Id : ", e);
        }
    }
}

export = EventController;
