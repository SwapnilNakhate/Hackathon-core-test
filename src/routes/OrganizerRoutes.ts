import express = require("express");
import OrganizerController = require("../controllers/OrganizerController");
const router = express.Router();

class OrganizerRoutes {

    private organizerController: OrganizerController;

    constructor() {
        this.organizerController = new OrganizerController();
    }

    get routes(): express.Router {
        router.post("/", this.organizerController.createOrganizer);
        router.get("/", this.organizerController.getAllOrganizers);
        router.get("/:id", this.organizerController.getOrganizerById);
        router.put("/:id", this.organizerController.updateOrganizer);
        router.delete("/:id", this.organizerController.deleteOrganizerById);
        router.post("/login", this.organizerController.loginOrganizer);
        return router;
    }
}

Object.seal(OrganizerRoutes);
export = OrganizerRoutes ;
