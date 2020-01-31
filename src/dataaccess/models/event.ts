import prizeModel = require("./../models/prize");

class Event {

    public name: string;
    public logo: string;
    public organizerId: string;
    public shortDescription: string;
    public maxTeamSize: number;
    public startDateTime: Date;
    public endDateTime: Date;
    public problemStatement: string;
    public rulesAndRegulations: string;
    public winnerTeamId: string;
    public status: string;
    public prizes : [prizeModel];

    constructor() {}

}
export = Event;
