const createError = (statusCode, message) => {
    const err = new Error();
    err.statusCode = statusCode;
    err.message = message;
    return err;
}

// const createResponse = (statusCode, message,)

module.exports = createError;
// return next(createError(404, "User not found"));