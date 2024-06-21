import controller from "../controllers/applicationsController.js";
import {Router} from "express";

const router = Router();

router.get('/', controller.getAllApplication);
router.get('/:id', controller.getOneApplication);
router.post("/", controller.createApplication);
router.put('/:id', controller.updateApplication);
router.delete("/:id", controller.deleteApplication);

export default router;
