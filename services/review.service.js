// services/review.service.js
import ReviewRepository from '../repositories/review.repository.js';
import CustomError from '../config/error.js';

class ReviewService {
    async addReview(storeId, content, rating) {
        const storeExists = await ReviewRepository.isStoreExists(storeId);
        if (!storeExists) {
            throw new CustomError(404, '존재하지 않는 가게입니다.', 'STORE_NOT_FOUND');
        }
        return await ReviewRepository.addReview(storeId, content, rating);
    }
}

export default new ReviewService();
