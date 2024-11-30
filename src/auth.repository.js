// srcs/auth.model.js

import { pool } from "../config/db.js";

const getUserBySocialId = async (socialId, provider) => {
    const [rows] = await pool.query(
        `SELECT user_id, nickname, status, name, email, social_provider, social_id
         FROM user
         WHERE social_id = ? AND social_provider = ?`, 
        [socialId, provider]
    );
    return rows[0];
};

const signUp = async (name, email, birthdate, gender, socialId, provider) => {
    const existingUser = await getUserBySocialId(socialId, provider);
    if (existingUser) {
        return existingUser.user_id;
    }

    const [result] = await pool.query(
        `INSERT INTO user (
            name, email, birthdate, gender, social_provider, social_id, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())`,
        [name, email, birthdate, gender, provider, socialId]
    );
    return result.insertId;
};

export { getUserBySocialId, signUp };
