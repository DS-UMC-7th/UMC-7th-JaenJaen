import StoreService from '../services/store.service.js';
import { StoreMissionDTO } from '../dtos/store.dto.js';

class StoreController {
    // 특정 가게의 미션 목록 가져오기
    async getStoreMissions(req, res) {
        // storeId는 문자열로 전달되므로, 이를 Int로 변환
        const storeId = parseInt(req.params.storeId);

        if (isNaN(storeId)) {
            return res.status(400).json({
                success: false,
                message: "유효한 가게 ID를 제공해 주세요."
            });
        }

        try {
            const missions = await StoreService.getStoreMissions(storeId);

            if (missions.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "이 가게에는 등록된 미션이 없습니다."
                });
            }

            // 미션 목록을 DTO로 변환하여 응답
            const missionDTOs = missions.map(mission => 
                new StoreMissionDTO(mission.missionId, mission.title, mission.description, mission.status)
            );

            return res.status(200).json({
                success: true,
                missions: missionDTOs
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}


export default new StoreController();
