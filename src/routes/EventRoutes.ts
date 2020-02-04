import express = require("express");
import EventController = require("../controllers/EventController");
const router = express.Router();

class EventRoutes {

    private eventController: EventController;

    constructor() {
        this.eventController = new EventController();
    }

    get routes(): express.Router {
        router.post("", this.eventController.createEvent);
        router.get("/", this.eventController.getAllEvents);
        router.get("/:id", this.eventController.getEventById);
        router.get("/team/:teamId", this.eventController.getAllEnrolledEventsByTeamId);
        router.get("/:id/team", this.eventController.getAllTeamsByEventId);
        router.get("/organizer/:organizerId", this.eventController.getAllEventByOrganizerId);
        router.get("/:id/evaluate", this.eventController.evaluateEventById);
        router.get("/:id/publish", this.eventController.evaluateEventById);
        router.put("/enroll", this.eventController.enrollForEvent);
        router.put("/:id", this.eventController.updateEvent);
        router.delete("/:id", this.eventController.deleteEventById);
        return router;
    }
}

Object.seal(EventRoutes);
export = EventRoutes ;
