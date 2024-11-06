// services/review.service.js

import ReviewRepository from '../repositories/review.repository.js';

class ReviewService {
    async addReview(storeId, content, rating) {
        const storeExists = await ReviewRepository.isStoreExists(storeId);
        if (!storeExists) {
            throw new Error("존재하지 않는 가게입니다.");
        }
        return await ReviewRepository.addReview(storeId, content, rating);
    }
}

export default new ReviewService(); // Export instance of ReviewService

