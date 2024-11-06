// routes.js

import express from 'express';
import MissionController from './controllers/mission.controller.js';
import ReviewController from './controllers/review.controller.js';

const router = express.Router();


router.post('/missions/start', MissionController.startMission);
router.post('/reviews/add', ReviewController.addReview);

export default router;
