import express = require("express");
import EventController = require("../controllers/EventController");
const router = express.Router();

class EventRoutes {

    private eventController: EventController;

    constructor() {
        this.eventController = new EventController();
    }

    get routes(): express.Router {
        router.post("/", this.eventController.createEvent);
        router.get("/", this.eventController.getAllEvents);
        router.get("/:id", this.eventController.getEventById);
        router.put("/:id", this.eventController.updateEvent);
        router.delete("/:id", this.eventController.deleteEventById);
        return router;
    }
}

Object.seal(EventRoutes);
export = EventRoutes ;
