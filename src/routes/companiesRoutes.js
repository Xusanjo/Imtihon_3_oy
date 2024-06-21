import controller from "../controllers/companiesController.js";
import { Router } from "express";

const router = Router();

router.get("/", controller.getAllCompanies);
router.get('/:id', controller.getOneCompany);
router.post("/", controller.createCompany);
router.put("/:id", controller.updateCompany);
router.delete("/:id", controller.deleteCompany);

export default router;