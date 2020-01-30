import * as express from "express";
import { getLogger } from 'log4js';
const logger = getLogger("Prize Controller");
import PrizeService = require("../service/PrizeService");

class PrizeController {
    private localPrizeService: PrizeService;
    constructor() {
        this.localPrizeService = new PrizeService();
    }

    public createPrize(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const prize = req.body;
            const prizeService = new PrizeService();
            prizeService.createPrizeData(prize, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in creating Prize Data : ", e);
        }
    }

    public getPrizeById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const prizeService = new PrizeService();
            const prizeId = req.params.id;
            prizeService.getPrizeById(prizeId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Prize Data . ", e);
        }
    }

    public getAllPrizes(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const prizeService = new PrizeService();
            prizeService.getAllPrizeData((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Prize Data . ", e);
        }
    }

    public updatePrize(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const prizeId = req.params.id;
            const updateBody = req.body;
            const prizeService = new PrizeService();
            prizeService.updatePrizeData(prizeId, updateBody, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in updating Prize Data : ", e);
        }
    }

    public deletePrizeById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const prizeId = req.params.id;
            const prizeService = new PrizeService();
            prizeService.deletePrizeById(prizeId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in deleting Prize by Id : ", e);
        }
    }
}

export = PrizeController;
