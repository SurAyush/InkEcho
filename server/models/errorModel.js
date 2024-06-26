class HttpError extends Error {
    constructor(message,errorCode) {
        super();
        this.message = message;
        this.errorCode = errorCode;
    }
}

module.exports = HttpError;