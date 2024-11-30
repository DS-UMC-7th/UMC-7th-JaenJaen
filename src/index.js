import express from 'express';
import { handleKakaoAuth } from './auth.controller.js';

const app = express();
const port = 3000;

app.use(express.json()); // JSON 요청 파싱

app.post('/auth/kakao', handleKakaoAuth);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
