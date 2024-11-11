// repositories/mission.controller.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MissionRepository {
    // 특정 가게의 미션이 진행 중인지 확인
    async isMissionOngoing(storeId, missionId) {
        const mission = await prisma.storeMission.findFirst({
            where: {
                storeId: storeId,
                missionId: missionId,
                status: "ongoing"
            }
        });
        return mission !== null;
    }

    // 특정 가게의 미션 추가
    async addMission(storeId, missionId) {
        const mission = await prisma.storeMission.create({
            data: {
                storeId: storeId,
                missionId: missionId,
                status: "ongoing",
            }
        });
        
        if (mission) {
            return {
                success: true,
                message: '미션이 성공적으로 추가되었습니다.',
                missionId: mission.id
            };
        } else {
            throw new Error("미션 추가 실패.");
        }
    }

    // 특정 가게의 진행 중인 미션 목록 조회
    async getOngoingMissions(storeId) {
        const ongoingMissions = await prisma.storeMission.findMany({
            where: {
                storeId,
                status: 'ongoing'
            },
            include: {
                mission: true,
            },
        });
        return ongoingMissions;
    }

    // 미션 완료 처리
    async completeMission(storeId, missionId) {
        const updatedMission = await prisma.storeMission.update({
            where: {
                storeId_missionId: { storeId, missionId },
            },
            data: {
                status: 'completed',
            }
        });
        return updatedMission;
    }
}

export default new MissionRepository(); // Default export
