import * as express from "express";
import OrganizerRoutes = require("./OrganizerRoutes");
import UserRoutes = require("./UserRoutes");
import TeamRoutes = require("./TeamRoutes");
import EventRoutes = require("./EventRoutes");

const app = express();

class BaseRoutes {
    get routes() {
        app.use("/api/users/", new UserRoutes().routes);
        app.use("/api/organizers/", new OrganizerRoutes().routes);
        app.use("/api/events/", new EventRoutes().routes);
        return app;
    }
}
export = BaseRoutes;
