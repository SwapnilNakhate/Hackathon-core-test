import * as express from "express";
import EventService = require("../service/EventService");
import { getLogger } from 'log4js';
const mongoose = require('mongoose'); 
const logger = getLogger("Event Controller");

class EventController {
    private localEventService: EventService;
    constructor() {
        logger.debug("Initiated Event Controller");
        this.localEventService = new EventService();
    }

    public createEvent(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Creating Event in a Controller");
            const event = req.body;
            const eventService = new EventService();
            eventService.createGitLabSubGroup(event, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    let nameSpaceId = result.id;
                    eventService.createEventData(event, nameSpaceId, (error1 , result1) => {
                        if (error1) {
                            res.send(error1);
                        } else {
                            res.send(result1);
                        }
                    });
                }
            });
           
        } catch (e) {
            logger.error("Exception in creating Event Data : ", e);
        }
    }

    public getEventById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Get Event by Id");
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
            logger.error("Exception in getting all Event Data . ", e);
        }
    }

    public getAllEventByOrganizerId(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Get Event by oragnizer Id");
            const eventService = new EventService();
            const organizerId = mongoose.Types.ObjectId(req.params.organizerId);
            eventService.getAllEventByOrganizerId(organizerId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            logger.error("Exception in getting all Event Data . ", e);
        }
    }

    public getAllEvents(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Get all Events");
            const eventService = new EventService();
            eventService.getAllEventData((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            logger.error("Exception in getting all Event Data . ", e);
        }
    }

    public getAllActiveEvents(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Get all active Events");
            const eventService = new EventService();
            eventService.getAllActiveEvents((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            logger.error("Exception in getting all Event Data . ", e);
        }
    }

    public updateEvent(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Update Event by Id");
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
            logger.error("Exception in updating Event Data : ", e);
        }
    }

    public deleteEventById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Delete Event by Id");
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
            logger.error("Exception in deleting Event by Id : ", e);
        }
    }
    
    public enrollForEvent(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Enroll for an Event");
            const eventId = req.body.eventId;
            const teamId = req.body.teamId;
            const nameSpaceIdmId = req.body.nameSpaceId;
            const eventService = new EventService();
            eventService.createGitLabProject(nameSpaceIdmId, teamId, (error , result) => {
                if (error) {
                    res.status(403).send(error);
                } else {
                    let repoLink = result.http_url_to_repo;
                    eventService.enrollForEvent(eventId, teamId, repoLink, (error1 , result1) => {
                        if (error1) {
                            res.status(403).send(error1);
                        } else {
                            res.status(200).send(result1);
                        }
                    });
                }
            });

            
        } catch (e) {
            logger.error("Exception in updating Event Data : ", e);
        }
    }

    public getAllTeamsByEventId(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Get all Events");
            const eventId = req.params.id;
            const eventService = new EventService();
            eventService.getAllTeamsByEventId(eventId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            logger.error("Exception in getting all Event Data . ", e);
        }
    }

    public getAllEventsByJudgeId(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Get all Events by judgeId");
            const judgeId = req.params.judgeId;
            const eventService = new EventService();
            eventService.getAllEventsByJudgeId(judgeId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            logger.error("Exception in getting all Event by jdueg id . ", e);
        }
    }

    public getAllEnrolledEventsByTeamId(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Get all Events for a team");
            const teamId = req.params.teamId;
            const eventService = new EventService();
            eventService.getAllEnrolledEventsByTeamId(teamId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            logger.error("Exception in getting all Event Data . ", e);
        }
    }
    public evaluateEventById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            logger.debug("Get all Events");
            const eventId = req.params.id;
            const eventService = new EventService();
            eventService.evaluateEventById(eventId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            logger.error("Exception in getting all Event Data . ", e);
        }
    }

    public startOrCancelEvents() {
        try {
            logger.debug("Checking all Events date time");
            const eventService = new EventService();
            eventService.startOrCancelEvent((error , result) => {
                if (error) {
                    logger.error("Error in start Or Cancel Event.");
                } else {
                    logger.debug("Start Or Cancel Event success.");
                }
            });
        } catch (e) {
            logger.error("Exception in getting all Event Data . ", e);
        }
    }
}

export = EventController;
