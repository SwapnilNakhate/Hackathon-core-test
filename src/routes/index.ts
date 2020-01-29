import * as express from "express";
import OrganizerRoutes = require("./OrganizerRoutes");
import UserRoutes = require("./UserRoutes");
import TeamRoutes = require("./TeamRoutes");

const app = express();

class BaseRoutes {
    get routes() {
        app.use("/api/users/", new UserRoutes().routes);
        app.use("/api/organizers/", new OrganizerRoutes().routes);
        app.use("/api/teams/", new TeamRoutes().routes);
        return app;
    }
}
export = BaseRoutes;
