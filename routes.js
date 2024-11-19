// route.js
import express from 'express';
import MissionController from './controllers/mission.controller.js';
import ReviewController from './controllers/review.controller.js';
import StoreController from './controllers/store.controller.js';

const router = express.Router();

/**
 * @swagger
 * /missions/start:
 *   post:
 *     summary: 미션 시작
 *     description: 특정 가게에서 미션을 시작합니다.
 *     tags:
 *       - Missions  // tags 추가
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeId:
 *                 type: integer
 *                 example: 1
 *               missionId:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: 미션이 성공적으로 시작되었습니다.
 *       400:
 *         description: 잘못된 요청
 */
router.post('/missions/start', MissionController.startMission);

/**
 * @swagger
 * /missions/ongoing/{storeId}:
 *   get:
 *     summary: 진행 중인 미션 목록 조회
 *     description: 특정 가게의 진행 중인 미션 목록을 조회합니다.
 *     tags:
 *       - Stores  // tags 추가
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 가게 ID
 *     responses:
 *       200:
 *         description: 진행 중인 미션 목록
 *       404:
 *         description: 가게를 찾을 수 없습니다.
 */
router.get('/missions/ongoing/:storeId', MissionController.getOngoingMissions);

/**
 * @swagger
 * /missions/complete/{storeId}/{missionId}:
 *   patch:
 *     summary: 미션 완료 상태로 변경
 *     description: 특정 가게에서 지정된 미션을 완료 상태로 변경합니다.
 *     tags:
 *       - Missions  // tags 추가
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 가게 ID
 *       - in: path
 *         name: missionId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 101
 *         description: 미션 ID
 *     responses:
 *       200:
 *         description: 미션이 완료되었습니다.
 *       404:
 *         description: 미션 또는 가게를 찾을 수 없습니다.
 */
router.patch('/missions/complete/:storeId/:missionId', MissionController.completeMission);

/**
 * @swagger
 * /reviews/add:
 *   post:
 *     summary: 리뷰 추가
 *     description: 특정 미션에 리뷰를 추가합니다.
 *     tags:
 *       - Reviews  // tags 추가
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               missionId:
 *                 type: integer
 *                 example: 101
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: "좋았어요!"
 *     responses:
 *       200:
 *         description: 리뷰가 성공적으로 추가되었습니다.
 *       400:
 *         description: 잘못된 요청
 */
router.post('/reviews/add', ReviewController.addReview);

/**
 * @swagger
 * /stores/{storeId}/missions:
 *   get:
 *     summary: 특정 가게의 미션 목록 조회
 *     description: 특정 가게에 대한 미션 목록을 조회합니다.
 *     tags:
 *       - Stores  // tags 추가
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 가게 ID
 *     responses:
 *       200:
 *         description: 가게의 미션 목록
 *       404:
 *         description: 가게를 찾을 수 없습니다.
 */
router.get('/stores/:storeId/missions', StoreController.getStoreMissions);

export default router;
