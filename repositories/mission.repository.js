// repositories/mission.controller.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MissionRepository {
    async isMissionOngoing(storeId, missionId) {
        const mission = await prisma.mission.findFirst({
            where: {
                storeId: storeId,
                id: missionId,
                status: "ongoing"
            }
        });
        return mission !== null;
    }

    async addMission(storeId, missionId) {
        const mission = await prisma.mission.create({
            data: {
                storeId: storeId,
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
}

export default new MissionRepository();
