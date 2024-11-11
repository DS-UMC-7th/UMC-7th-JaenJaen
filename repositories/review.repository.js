// repositories/review.controller.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ReviewRepository {
    async isStoreExists(storeId) {
        const store = await prisma.store.findUnique({
            where: {
                id: storeId
            }
        });
        return store !== null;
    }

    async addReview(storeId, content, rating) {
        const review = await prisma.review.create({
            data: {
                storeId: storeId,
                content: content,
                rating: rating
            }
        });
        
        if (review) {
            return {
                success: true,
                message: '리뷰가 성공적으로 추가되었습니다.',
                reviewId: review.id
            };
        } else {
            throw new Error("리뷰 추가 실패.");
        }
    }
}

export default new ReviewRepository();
