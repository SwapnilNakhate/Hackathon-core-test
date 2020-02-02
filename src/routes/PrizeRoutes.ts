import express = require("express");
import PrizeController = require("../controllers/PrizeController");
const router = express.Router();

class PrizeRoutes {

    private prizeController: PrizeController;

    constructor() {
        this.prizeController = new PrizeController();
    }

    get routes(): express.Router {
        router.post("/", this.prizeController.createPrize);
        router.get("/", this.prizeController.getAllPrizes);
        router.get("/event/:eventId", this.prizeController.getAllPrizesByEventId);
        router.get("/:id", this.prizeController.getPrizeById);
        router.put("/:id", this.prizeController.updatePrize);
        router.delete("/:id", this.prizeController.deletePrizeById);
        return router;
    }
}

Object.seal(PrizeRoutes);
export = PrizeRoutes ;
