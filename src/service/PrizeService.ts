import Prize = require("../dataaccess/mongoose/Prize");
import PrizeRepository = require("../dataaccess/repository/PrizeRepository");
import { getLogger } from 'log4js';
const logger = getLogger("Prize Service");

class PrizeService {

    private prizeRepository: PrizeRepository;

    constructor() {
        this.prizeRepository = new PrizeRepository();
    }

    public createPrizeData(prize: Prize, callback: (error: any, response: any) => void) {
        this.prizeRepository.create(prize, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getPrizeById(prizeId: any, callback: (error: any, response: any) => void) {
        this.prizeRepository.retrieveById(prizeId, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllPrizeData(callback: (error: any, response: any) => void) {
        this.prizeRepository.retrieve({}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public updatePrizeData(prizeId: any, updatedPrize: Prize, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : prizeId };
        this.prizeRepository.update(updateQuery, updatedPrize, {new: true}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public deletePrizeById(prizeId: any, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : prizeId };
        this.prizeRepository.deleteById(updateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
}

Object.seal(PrizeService);
export = PrizeService;
