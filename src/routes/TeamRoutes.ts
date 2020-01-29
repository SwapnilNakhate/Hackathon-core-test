import express = require("express");
import TeamController = require("../controllers/TeamController");
const router = express.Router();

class TeamRoutes {

    private teamController: TeamController;

    constructor() {
        this.teamController = new TeamController();
    }

    get routes(): express.Router {
        router.post("/", this.teamController.createTeam);
        router.get("/", this.teamController.getAllTeams);
        router.get("/:id", this.teamController.getTeamById);
        router.put("/:id", this.teamController.updateTeam);
        router.delete("/:id", this.teamController.deleteTeamById);
        return router;
    }
}

Object.seal(TeamRoutes);
export = TeamRoutes ;
