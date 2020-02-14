import Event = require("../dataaccess/mongoose/Event");
import EventRepository = require("../dataaccess/repository/EventRepository");
import TeamRepository = require("../dataaccess/repository/TeamRepository");
import { getLogger } from 'log4js';
const request = require('request');
import config = require("config");
const logger = getLogger("Event Service");

class EventService {

    private eventRepository: EventRepository;
    private teamRepository: TeamRepository;

    constructor() {
        this.eventRepository = new EventRepository();
        this.teamRepository = new TeamRepository();
    }

    public createEventData(event: Event, callback: (error: any, response: any) => void) {
        event.status = "scheduled";
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
                for(let event of result) {
                    if(event) {
                        let currentDate = new Date();
                        let endDate = new Date(event.endDateTime);
                        if(endDate.getTime() < currentDate.getTime()) {
                            event.status = "completed";
                        }
                    }
                }
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

    public getAllActiveEvents(callback: (error: any, response: any) => void) {
        const query =  { $or: [ { status: 'scheduled' }, { status: 'ongoing' } ] };
        this.eventRepository.retrieveWithPopulate(query, 'prizes', (error, result) => {
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
    public getAllEnrolledEventsByTeamId(temId: any, callback: (error: any, response: any) => void) {
        const findQuery = { "teams._id" : temId };
        this.eventRepository.retrieve(findQuery, (err, result) => {
            if (err) {
                callback(err, null);
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
                    this.getTeamDetails(temId, (errorStack: any, data: any) => {
                        if(err) {
                            callback(err, null);
                        } else if(data) {
                            const eventFindQuery = { _id: eventId};
                            let team = {
                                _id: temId,
                                repoLink : data.html_url ? data.html_url : '',
                                coding_standards: 0,
                                creativity: 0,
                                usablity: 0,
                                ui_ux: 0,
                                functionalCompleteness: 0,
                            };
                            const updatedEvent = { $push : { teams : team }};
                            this.eventRepository.update(eventFindQuery, updatedEvent, {new: true}, (errStack, dataResponse) => {
                                if (errStack) {
                                    callback(errStack, null);
                                } else {
                                    callback(null, dataResponse);
                                }
                            });
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

    public createRepoForATeam(teamName: any, membersGitIds: any, callback: (error: any, response: any) => void) {
        let requestBody = {
            "name": teamName,
            "description": "This is your Hackthon repo.",
            "private": false,
            "reponame": "ashish9308/"+teamName,
            "userlist" : membersGitIds
        };
        let gitHubAPIURL = config.get("githubAPI");
        request({
            url: gitHubAPIURL + "createrepo",
            method: "POST",
            json: true,
            body: requestBody
        }, (error: any, response: any, body: any) => {
            if(error) {
                callback(error, null);
            } else if(body) {
                callback(null, body);
            }
        });

    }

    public getTeamDetails(teamId: any, callback: (error: any, response: any) => void) {
        let findQuery = { _id: teamId };
        this.teamRepository.retrieveWithPopulate(findQuery, 'members', (errStack, data) => {
            if (errStack) {
                callback(errStack, null);
            } else {
                let currentDate = new Date();
                let teamName = data[0].name + currentDate.getTime();
                let membersList = data[0].members;
                let memberGitIds = membersList.map((a: any) => a.gitId);
                console.log('memberGitIds : '+ memberGitIds);
                this.createRepoForATeam(teamName, memberGitIds, (err, response) => {
                    if(err) {
                        callback(err, null);
                    } else if(response) {
                        callback(null, response);
                    }
                });
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

    public evaluateEventById(eventId: any, callback: (error: any, response: any) => void) {
        const query = { _id: eventId };
        const populateQuery = { path: 'teams._id', model: 'Team'};
        this.eventRepository.retrieveWithPopulate(query, populateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let eventDetails = result[0];
                let allParticipatedTeams = eventDetails.teams;
                for(let team of allParticipatedTeams) {
                    let score1 = ( team.functionalCompleteness / 10) * 0.4;
                    let score2 = ( team.usablity / 10) * 0.2;
                    let score3 = ( team.ui_ux / 10) * 0.2;
                    let score4 = ( team.coding_standards / 10) * 0.2;
                    team.finalScore = score1 + score2 + score3 + score4;
                }
                let teamList = { teams : allParticipatedTeams };
                callback(null, teamList);
            }
        });
    }

    public startOrCancelEvent(callback: (error: any, response: any) => void) {
        let currentDateTime = new Date();
        console.log('currentDateTime : '+currentDateTime);
        this.startEvent(currentDateTime);
        this.completeEvent(currentDateTime);
    }

    public startEvent(currentDateTime: any) {
        const query = {
            startDateTime : {
                $lte : currentDateTime
            },
            status :"scheduled"
        };
        const updatedBody = { status: 'ongoing' };
        this.eventRepository.updateMany(query, updatedBody, { multi: true }, (error, result) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Events started');
            }
        });
    }

    public completeEvent(currentDateTime: any) {
        const query = {
            endDateTime : {
                $lte : currentDateTime
            },
            status : "ongoing"
        };
        const updatedBody = { status : "completed" };
        this.eventRepository.updateMany(query, updatedBody, {multi : true}, (error, result) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Events completed');
                // console.log(result);
            }
        });
    }

}

Object.seal(EventService);
export = EventService;
