import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class StoreRepository {
    // 특정 가게의 미션 목록 가져오기
    async getStoreMissions(storeId) {
        const store = await prisma.store.findUnique({
            where: { id: storeId },
            include: {
                StoreMission: {
                    include: {
                        mission: true, // 미션 정보도 포함
                    },
                },
            },
        });

        if (!store) {
            throw new Error("가게를 찾을 수 없습니다.");
        }

        // StoreMission 테이블의 정보를 DTO 형식으로 반환
        return store.StoreMission.map(storeMission => ({
            missionId: storeMission.mission.id,
            title: storeMission.mission.title,
            description: storeMission.mission.description,
            status: storeMission.status,
        }));
    }
}

export default new StoreRepository();
