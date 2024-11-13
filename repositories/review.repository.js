// repositories/review.controller.js

import { pool } from '../config/db.js';
import CustomError from '../config/error.js';

class ReviewRepository {
    async isStoreExists(storeId) {
        const [rows] = await pool.query(
            'SELECT * FROM stores WHERE id = ?',
            [storeId]
        );
        return rows.length > 0;
    }

    async addReview(storeId, content, rating) {
        const [result] = await pool.query(
            'INSERT INTO reviews (store_id, content, rating) VALUES (?, ?, ?)',
            [storeId, content, rating]
        );
        
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: '리뷰가 성공적으로 추가되었습니다.',
                reviewId: result.insertId
            };
        } else {
            throw new CustomError(500, '리뷰 추가 실패.', 'REVIEW_CREATION_FAILED');
        }
    }
}

export default new ReviewRepository();
