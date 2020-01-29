import * as express from "express";
import OrganizerService = require("../service/OrganizerService");

class OrganizerController {
    private localOrganizerService: OrganizerService;
    constructor() {
        this.localOrganizerService = new OrganizerService();
    }

    public createOrganizer(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const organizer = req.body;
            const organizerService = new OrganizerService();
            organizerService.createOrganizerData(organizer, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in creating Organizer Data : ", e);
        }
    }

    public getOrganizerById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const organizerService = new OrganizerService();
            const organizerId = req.params.id;
            organizerService.getOrganizerById(organizerId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Organizer Data . ", e);
        }
    }

    public getAllOrganizers(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const organizerService = new OrganizerService();
            organizerService.getAllOrganizerData((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Organizer Data . ", e);
        }
    }

    public updateOrganizer(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const organizerId = req.params.id;
            const updateBody = req.body;
            const organizerService = new OrganizerService();
            organizerService.updateOrganizerData(organizerId, updateBody, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in updating Organizer Data : ", e);
        }
    }

    public deleteOrganizerById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const organizerId = req.params.id;
            const organizerService = new OrganizerService();
            organizerService.deleteOrganizerById(organizerId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in deleting Organizer by Id : ", e);
        }
    }
}

export = OrganizerController;
