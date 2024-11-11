// controllers/mission.controller.js
import MissionService from '../services/mission.service.js';
import { MissionRequestDTO } from '../dtos/mission.dto.js';

class MissionController {
    // 미션 시작
    async startMission(req, res) {
        const { storeId, missionId } = req.body;
        const missionRequest = new MissionRequestDTO(storeId, missionId);

        try {
            const result = await MissionService.startMission(missionRequest.storeId, missionRequest.missionId);
            // 성공 메시지와 함께 클라이언트로 결과 반환
            res.status(200).json(result);
        } catch (error) {
            // 실패 메시지
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // 진행 중인 미션 목록 가져오기
    async getOngoingMissions(req, res) {
        const { storeId } = req.params;
        
        try {
            const result = await MissionService.getOngoingMissions(storeId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // 미션 완료 처리
    async completeMission(req, res) {
        const { storeId, missionId } = req.params;
        
        try {
            const result = await MissionService.completeMission(storeId, missionId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new MissionController(); 
