// services/mission.service.js

import MissionRepository from '../repositories/mission.repository.js';
import CustomError from '../config/error.js';

class MissionService {
    async startMission(storeId, missionId) {
        const isOngoing = await MissionRepository.isMissionOngoing(storeId, missionId);
        if (isOngoing) {
            throw new CustomError(400, '이미 도전 중인 미션입니다.', 'MISSION_ALREADY_ONGOING');
        }
        return await MissionRepository.addMission(storeId, missionId);
    }
}

export default new MissionService();
