import Team = require("../dataaccess/mongoose/Team");
import TeamRepository = require("../dataaccess/repository/TeamRepository");
import { getLogger } from 'log4js';
const logger = getLogger("Team Service");

class TeamService {

    private teamRepository: TeamRepository;

    constructor() {
        this.teamRepository = new TeamRepository();
    }

    public createTeamData(team: Team, callback: (error: any, response: any) => void) {
        this.teamRepository.create(team, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getTeamById(teamId: any, callback: (error: any, response: any) => void) {
        this.teamRepository.retrieveById(teamId, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllTeamData(callback: (error: any, response: any) => void) {
        this.teamRepository.retrieveWithPopulate({}, 'members', (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public updateTeamData(teamId: any, updatedTeam: Team, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : teamId };
        this.teamRepository.update(updateQuery, updatedTeam, {new: true}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public deleteTeamById(teamId: any, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : teamId };
        this.teamRepository.deleteById(updateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
}

Object.seal(TeamService);
export = TeamService;
