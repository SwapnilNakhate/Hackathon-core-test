import * as express from "express";
import OrganizerRoutes = require("./OrganizerRoutes");
import UserRoutes = require("./UserRoutes");
import TeamRoutes = require("./TeamRoutes");
import EventRoutes = require("./EventRoutes");
import PrizeRoutes = require("./PrizeRoutes");

const app = express();

class BaseRoutes {
    get routes() {
        app.use("/api/users/", new UserRoutes().routes);
        app.use("/api/organizers/", new OrganizerRoutes().routes);
        app.use("/api/events/", new EventRoutes().routes);
        app.use("/api/prizes/", new PrizeRoutes().routes);
        app.use("/api/teams/", new TeamRoutes().routes);
        return app;
    }
}
export = BaseRoutes;
