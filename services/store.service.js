import StoreRepository from '../repositories/store.repository.js';

class StoreService {
    // 특정 가게의 미션 목록 가져오기
    async getStoreMissions(storeId) {
        return await StoreRepository.getStoreMissions(storeId);
    }
}

export default new StoreService();
