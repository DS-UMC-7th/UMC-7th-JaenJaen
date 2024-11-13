// config/customError.js
class CustomError extends Error {
    constructor(statusCode, message, code = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code || 'GENERAL_ERROR';  
        Error.captureStackTrace(this, this.constructor);
    }

    getErrorResponse() {
        return {
            isSuccess: false,
            code: this.code,
            message: this.message
        };
    }
}

export default CustomError;
