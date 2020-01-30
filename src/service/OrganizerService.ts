import Organizer = require("../dataaccess/mongoose/Organizer");
import OrganizerRepository = require("../dataaccess/repository/OrganizerRepository");
import { getLogger } from 'log4js';
const logger = getLogger("Organizer Service");

class OrganizerService {

    private organizerRepository: OrganizerRepository;

    constructor() {
        this.organizerRepository = new OrganizerRepository();
    }

    public createOrganizerData(organizer: Organizer, callback: (error: any, response: any) => void) {
        this.organizerRepository.create(organizer, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getOrganizerById(organizerId: any, callback: (error: any, response: any) => void) {
        this.organizerRepository.retrieveById(organizerId, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllOrganizerData(callback: (error: any, response: any) => void) {
        this.organizerRepository.retrieve({}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public updateOrganizerData(organizerId: any, updatedOrganizer: Organizer,
        callback: (error: any, response: any) => void) {
            const updateQuery = { _id : organizerId };
            this.organizerRepository.update(updateQuery, updatedOrganizer, {new: true}, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, result);
                }
            });
    }

    public deleteOrganizerById(organizerId: any, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : organizerId };
        this.organizerRepository.deleteById(updateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
}

Object.seal(OrganizerService);
export = OrganizerService;
