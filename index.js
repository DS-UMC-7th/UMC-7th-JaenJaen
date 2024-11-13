// index.js
import express from 'express';
import routes from './routes.js';
import CustomError from './config/error.js';

const app = express();
app.use(express.json());
app.use('/api', routes);

app.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.getErrorResponse());
    }
    res.status(500).json({
        isSuccess: false,
        code: 'SERVER_ERROR',
        message: '서버 오류가 발생했습니다.'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
