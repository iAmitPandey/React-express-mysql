import express from "express";
import {
  create,
  findAll,
  findOne,
  findAllPublished,
  update,
  deleteTutorial,
  deleteAll,
} from "../controllers/tutorial.controller.js";

const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/published", findAllPublished);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", deleteTutorial);
router.delete("/", deleteAll);

export default (app) => {
  app.use("/api/tutorials", router);
};
