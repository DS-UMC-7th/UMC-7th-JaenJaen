// controllers/review.controller.js
import ReviewService from '../services/review.service.js';
import { ReviewRequestDTO } from '../dtos/review.dto.js';
import CustomError from '../config/error.js';

class ReviewController {
    async addReview(req, res) {
        const { storeId, content, rating } = req.body;
        const reviewRequest = new ReviewRequestDTO(storeId, content, rating);

        try {
            const result = await ReviewService.addReview(reviewRequest.storeId, reviewRequest.content, reviewRequest.rating);
            res.status(200).json({
                isSuccess: true,
                code: 200,
                message: '리뷰가 성공적으로 추가되었습니다.',
                data: result
            });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.getErrorResponse());
            } else {
                res.status(500).json({
                    isSuccess: false,
                    code: 'SERVER_ERROR',
                    message: '서버 오류가 발생했습니다.'
                });
            }
        }
    }
}

export default new ReviewController();
