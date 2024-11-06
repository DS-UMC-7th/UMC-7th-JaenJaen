// dtos/review.dto.js

export class ReviewRequestDTO {
    constructor(storeId, content, rating) {
        this.storeId = storeId;
        this.content = content;
        this.rating = rating;
    }
}

