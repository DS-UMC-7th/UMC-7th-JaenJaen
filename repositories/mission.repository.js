// repositories/mission.repository.js
import { pool } from '../config/db.js';
import CustomError from '../config/error.js';

class MissionRepository {
    async isMissionOngoing(storeId, missionId) {
        const [rows] = await pool.query(
            'SELECT * FROM store_missions WHERE store_id = ? AND mission_id = ?',
            [storeId, missionId]
        );
        return rows.length > 0;
    }

    async addMission(storeId, missionId) {
        const [result] = await pool.query(
            'INSERT INTO store_missions (store_id, mission_id, status) VALUES (?, ?, "ongoing")',
            [storeId, missionId]
        );
        
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: '미션이 성공적으로 추가되었습니다.',
                missionId: result.insertId
            };
        } else {
            throw new CustomError(500, '미션 추가 실패.', 'MISSION_CREATION_FAILED');
        }
    }
}

export default new MissionRepository();
