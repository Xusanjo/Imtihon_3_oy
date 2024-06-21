import controller from "../controllers/reviewsController.js";
import { Router } from "express";

const router = Router();

router.get('/', controller.getAllReview);
router.get('/:id', controller.getOneReview);
router.post('/', controller.createReview);
router.put('/:id', controller.updateReview);
router.delete('/:id', controller.deleteReview);

export default router;