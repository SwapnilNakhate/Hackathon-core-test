import * as express from "express";
import OrganizerRoutes = require("./OrganizerRoutes");
import UserRoutes = require("./UserRoutes");

const app = express();

class BaseRoutes {
    get routes() {
        app.use("/api/users/", new UserRoutes().routes);
        app.use("/api/organizers/", new OrganizerRoutes().routes);
        return app;
    }
}
export = BaseRoutes;
