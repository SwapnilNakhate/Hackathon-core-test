import * as express from "express";
import { getLogger } from 'log4js';
const mongoose = require('mongoose'); 
const logger = getLogger("Judge Controller");
import JudgeService = require("../service/JudgeService");

class JudgeController {
    private localJudgeService: JudgeService;
    constructor() {
        this.localJudgeService = new JudgeService();
    }

    public createJudge(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const judge = req.body;
            const judgeService = new JudgeService();
            judgeService.createJudgeData(judge, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in creating Judge Data : ", e);
        }
    }

    public getJudgeById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const judgeService = new JudgeService();
            const judgeId = req.params.id;
            judgeService.getJudgeById(judgeId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Judge Data . ", e);
        }
    }

    public getAllJudges(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const judgeService = new JudgeService();
            judgeService.getAllJudgeData((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Judge Data . ", e);
        }
    }

    public updateJudge(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const judgeId = req.params.id;
            const updateBody = req.body;
            const judgeService = new JudgeService();
            judgeService.updateJudgeData(judgeId, updateBody, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in updating Judge Data : ", e);
        }
    }

    public deleteJudgeById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const judgeId = req.params.id;
            const judgeService = new JudgeService();
            judgeService.deleteJudgeById(judgeId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in deleting Judge by Id : ", e);
        }
    }
    
    public loginJudge(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const judgeCredentials = req.body;
            const judgeService = new JudgeService();
            judgeService.loginJudge(judgeCredentials, (error , result) => {
                if (error) {
                    res.status(401).send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        } catch (e) {
            console.log("Exception in creating Judge Data : ", e);
        }
    }
}

export = JudgeController;
