const { constants } = require("../constants");

//this will be invoked anytime we thrown an error
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.INTERNAL_SERVER_ERROR:
            res.json({ title: "Internal server error", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
            break;
        case constants.BAD_REQUEST:
            res.json({ title: "Bad Request", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        default:
            res.json({ title: "Unknown error", message: err.message, stackTrace: err.stack });
            break;
    }
}

module.exports = errorHandler;