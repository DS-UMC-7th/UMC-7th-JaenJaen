// routes.js

import express from 'express';
import MissionController from './controllers/mission.controller.js';
import ReviewController from './controllers/review.controller.js';
import StoreController from './controllers/store.controller.js';

const router = express.Router();

// 미션 시작
router.post('/missions/start', MissionController.startMission);

// 진행 중인 미션 목록
router.get('/missions/ongoing/:storeId', MissionController.getOngoingMissions);

// 미션 완료 상태로 변경
router.patch('/missions/complete/:storeId/:missionId', MissionController.completeMission);

// 리뷰 추가
router.post('/reviews/add', ReviewController.addReview);

// 특정 가게의 미션 목록 조회
router.get('/stores/:storeId/missions', StoreController.getStoreMissions);

export default router;
