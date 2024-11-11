// repositories/mission.controller.js

import MissionRepository from '../repositories/mission.repository.js';

class MissionService {
    // 미션 시작
    async startMission(storeId, missionId) {
        const isOngoing = await MissionRepository.isMissionOngoing(storeId, missionId);
        if (isOngoing) {
            throw new Error("이미 도전 중인 미션입니다.");
        }
        return await MissionRepository.addMission(storeId, missionId);
    }

    // 진행 중인 미션 목록 가져오기
    async getOngoingMissions(storeId) {
        return await MissionRepository.getOngoingMissions(storeId);
    }

    // 미션 완료 처리
    async completeMission(storeId, missionId) {
        return await MissionRepository.completeMission(storeId, missionId);
    }
}

export default new MissionService(); // Export instance of MissionService
