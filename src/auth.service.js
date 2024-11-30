import axios from 'axios';
import qs from 'qs';
import { getUserBySocialId, signUp } from './auth.repository.js';
import { generateTokens } from '../util/jwt.utils.js';

const authenticateWithProvider = async (token, url, provider) => {
    try {
        const response = await axios.post(url, qs.stringify({ access_token: token }), {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('API Response:', response.data);

        const data = response.data;
        let providerId, name, email, birthdate, gender;
        if (provider === 'kakao') {
            providerId = data.id;
            name = data.properties.nickname;
            email = data.kakao_account.email;
            birthdate = data.kakao_account.birthday; // 생년월일 (MMDD 형식)
            gender = data.kakao_account.gender;     // 성별 ('male', 'female' 등)
        }

        // if (!providerId || !name || !email || !birthdate || !gender) {
        //     throw new Error("KEY_ERROR"); // 필수 정보가 부족할 경우 에러
        // }

        // // Kakao에서 제공하는 생년월일을 'YYYY-MM-DD' 형식으로 변환
        // birthdate = `2000-${birthdate.substring(0, 2)}-${birthdate.substring(2, 4)}`; // 예: 2000-01-15

        // 소셜 ID로 사용자가 이미 존재하는지 확인 후, 없으면 새로 생성
        let user = await getUserBySocialId(providerId, provider);
        const userId = user
            ? user.user_id
            : await signUp(name, email, birthdate, gender, providerId, provider);

        // JWT 토큰 생성
        const accessToken = generateTokens(userId, providerId, email);
        return accessToken;
    } catch (error) {
        console.error(`${provider} login error:`, error);
        throw new Error(`${provider} login failed`);
    }
};


const kakaoLogin = (token) => authenticateWithProvider(token, "https://kapi.kakao.com/v2/user/me", "kakao");

export { kakaoLogin };
