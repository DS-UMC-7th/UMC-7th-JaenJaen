// controllers/mission.controller.js
import MissionService from '../services/mission.service.js';
import { MissionRequestDTO } from '../dtos/mission.dto.js';
import CustomError from '../config/error.js';

class MissionController {
    async startMission(req, res) {
        const { storeId, missionId } = req.body;
        const missionRequest = new MissionRequestDTO(storeId, missionId);

        try {
            const result = await MissionService.startMission(missionRequest.storeId, missionRequest.missionId);
            res.status(200).json({
                isSuccess: true,
                code: 200,
                message: '미션이 성공적으로 시작되었습니다.',
                data: result
            });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.getErrorResponse());
            } else {
                // 일반적인 오류 처리
                res.status(500).json({
                    isSuccess: false,
                    code: 'SERVER_ERROR',
                    message: '서버 오류가 발생했습니다.'
                });
            }
        }
    }
}

export default new MissionController();

