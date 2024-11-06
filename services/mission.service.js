// repositories/mission.controller.js

import MissionRepository from '../repositories/mission.repository.js';

class MissionService {
    async startMission(storeId, missionId) {
        const isOngoing = await MissionRepository.isMissionOngoing(storeId, missionId);
        if (isOngoing) {
            throw new Error("이미 도전 중인 미션입니다.");
        }
        return await MissionRepository.addMission(storeId, missionId);
    }
}

export default new MissionService(); // Export instance of MissionService
