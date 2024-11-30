import {
    kakaoLogin,
} from "./auth.service.js";
import { response } from "../config/response.js";
import { status } from "../config/response.status.js";
import { authResponseDTO, authErrorResponseDTO } from "./auth.dto.js";
import { extractTokenFromHeader } from '../util/jwt.utils.js';

const handleAuth = async (providerLogin, providerName, req, res) => {
    try {
        const token = extractTokenFromHeader(req);
        const accessToken = await providerLogin(token);

        res.setHeader("Authorization", `Bearer ${accessToken}`);
        return res.json(response(
            { isSuccess: status.SUCCESS.isSuccess, code: 200, message: `${providerName} 로그인 성공` },
            authResponseDTO(accessToken)
        ));
    } catch (error) {
        console.error(`${providerName} login error:`, error);
        return res.json(response(
            { isSuccess: status.BAD_REQUEST.isSuccess, code: 400, message: `${providerName} 로그인 실패` },
            authErrorResponseDTO(error.message)
        ));
    }
};

const handleKakaoAuth = (req, res) => handleAuth(kakaoLogin, "kakao", req, res);

export {
    handleKakaoAuth,
};
