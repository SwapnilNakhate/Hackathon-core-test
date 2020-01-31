const bcrypt = require('bcryptjs');
const config = require('config');
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
        const salt = bcrypt.genSaltSync(config.get('saltRounds'));
        const hash = bcrypt.hashSync(organizer.password, salt);
        organizer.password = hash;
        logger.debug('organizer password : '+organizer.password);
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

    public loginOrganizer(organizerCredentials: any, callback: (error: any, response: any) => void) {
        let findUserQuery = { email : organizerCredentials.email };
        this.organizerRepository.retrieveOne(findUserQuery, (err, res) => {
            if (err) {
                callback(err, null);
            } else if(res) {
                bcrypt.compare(organizerCredentials.password, res.password, (error: any, result: any) => {
                    if(error) {
                        callback(error, null);
                    } else if(result) {
                        callback(null, res);
                    } else {
                        let errorMessage = new Error();
                        errorMessage.message = "Invalid Credentials.";
                        callback(errorMessage, null);
                    }
                });
            } else {
                let errorMessage = new Error();
                errorMessage.message = "Organizer not found";
                callback(errorMessage, null);
            }
        });
    }

}

Object.seal(OrganizerService);
export = OrganizerService;
