import express = require("express");
import JudgeController = require("../controllers/JudgeController");
const router = express.Router();

class JudgeRoutes {

    private judgeController: JudgeController;

    constructor() {
        this.judgeController = new JudgeController();
    }

    get routes(): express.Router {
        router.post("/", this.judgeController.createJudge);
        router.get("/", this.judgeController.getAllJudges);
        router.get("/:id", this.judgeController.getJudgeById);
        router.put("/:id", this.judgeController.updateJudge);
        router.delete("/:id", this.judgeController.deleteJudgeById);
        router.post("/login", this.judgeController.loginJudge);
        return router;
    }
}

Object.seal(JudgeRoutes);
export = JudgeRoutes ;
