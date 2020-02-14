const bcrypt = require('bcryptjs');
const config = require('config');
import Judge = require("../dataaccess/mongoose/Judge");
import JudgeRepository = require("../dataaccess/repository/JudgeRepository");
import { getLogger } from 'log4js';
const logger = getLogger("Judge Service");

class JudgeService {

    private judgeRepository: JudgeRepository;

    constructor() {
        this.judgeRepository = new JudgeRepository();
    }

    public createJudgeData(judge: Judge, callback: (error: any, response: any) => void) {
        const salt = bcrypt.genSaltSync(config.get('saltRounds'));
        const hash = bcrypt.hashSync(judge.password, salt);
        judge.password = hash;
        logger.debug('Judge password : '+judge.password);
        this.judgeRepository.create(judge, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getJudgeById(judgeId: any, callback: (error: any, response: any) => void) {
        this.judgeRepository.retrieveById(judgeId, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllJudgeData(callback: (error: any, response: any) => void) {
        this.judgeRepository.retrieve({}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public updateJudgeData(judgeId: any, updatedJudge: Judge,
        callback: (error: any, response: any) => void) {
            const updateQuery = { _id : judgeId };
            this.judgeRepository.update(updateQuery, updatedJudge, {new: true}, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, result);
                }
            });
    }

    public deleteJudgeById(judgeId: any, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : judgeId };
        this.judgeRepository.deleteById(updateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public loginJudge(judgeCredentials: any, callback: (error: any, response: any) => void) {
        let findUserQuery = { email : judgeCredentials.email };
        this.judgeRepository.retrieveOne(findUserQuery, (err, res) => {
            if (err) {
                callback(err, null);
            } else if(res) {
                bcrypt.compare(judgeCredentials.password, res.password, (error: any, result: any) => {
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
                errorMessage.message = "Judge not found";
                callback(errorMessage, null);
            }
        });
    }

}

Object.seal(JudgeService);
export = JudgeService;
