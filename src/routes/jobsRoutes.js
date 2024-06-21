import controller from "../controllers/jobsController.js";
import { Router } from "express";

const router = Router();

router.get("/", controller.getAllJobListing);
router.get("/:id", controller.getOneJobListing);
router.post("/", controller.createJobListing);
router.put("/:id", controller.updateJobListing);
router.delete("/:id", controller.deleteJobListing);

export default router;