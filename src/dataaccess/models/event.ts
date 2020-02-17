import evaluationConfigurationModel = require("./evaluationConfiguration");

class Event {

    public name: string;
    public logo: string;
    public organizerId: string;
    public organizerGroupId: string;
    public shortDescription: string;
    public maxTeamSize: number;
    public startDateTime: Date;
    public endDateTime: Date;
    public problemStatement: string;
    public rulesAndRegulations: string;
    public winnerTeamId: string;
    public status: string;
    public difficulty: string;
    public technologies: [any];
    public evaluationConfiguration: [evaluationConfigurationModel];
    public nameSpaceId: string;

    constructor() {}

}
export = Event;
