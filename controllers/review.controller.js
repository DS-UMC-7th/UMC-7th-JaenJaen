// controllers/review.controller.js
import ReviewService from '../services/review.service.js';
import { ReviewRequestDTO } from '../dtos/review.dto.js';

class ReviewController {
    async addReview(req, res) {
        const { storeId, content, rating } = req.body;
        const reviewRequest = new ReviewRequestDTO(storeId, content, rating);

        try {
            const result = await ReviewService.addReview(reviewRequest.storeId, reviewRequest.content, reviewRequest.rating);
            // 성공 메시지와 함께 클라이언트로 결과 반환
            res.status(200).json(result);
        } catch (error) {
            // 실패 메시지
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new ReviewController(); // Use default export

