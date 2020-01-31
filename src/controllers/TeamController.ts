import * as express from "express";
import { getLogger } from 'log4js';
const mongoose = require('mongoose'); 
const logger = getLogger("Team Controller");
import TeamService = require("../service/TeamService");

class TeamController {
    private localTeamService: TeamService;
    constructor() {
        this.localTeamService = new TeamService();
    }

    public createTeam(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const team = req.body;
            const teamService = new TeamService();
            teamService.createTeamData(team, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in creating Team Data : ", e);
        }
    }

    public getTeamById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const teamService = new TeamService();
            const teamId = req.params.id;
            teamService.getTeamById(teamId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Team Data . ", e);
        }
    }

    public getTeamByUserId(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const teamService = new TeamService();
            const userId = mongoose.Types.ObjectId(req.params.userId);
            teamService.getTeamByUserId(userId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Team Data . ", e);
        }
    }
    public getAllTeams(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const teamService = new TeamService();
            teamService.getAllTeamData((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Team Data . ", e);
        }
    }

    public updateTeam(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const teamId = req.params.id;
            const updateBody = req.body;
            const teamService = new TeamService();
            teamService.updateTeamData(teamId, updateBody, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in updating Team Data : ", e);
        }
    }

    public deleteTeamById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const teamId = req.params.id;
            const teamService = new TeamService();
            teamService.deleteTeamById(teamId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in deleting Team by Id : ", e);
        }
    }
}

export = TeamController;
