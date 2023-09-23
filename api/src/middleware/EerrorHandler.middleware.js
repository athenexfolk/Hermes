const HTTP_STATUS = require("../core/value-object");

function ErrrorHandler(err, req, res, next) {
    console.error("\x1b[41m%s\n\x1b[0m", "!ERROR!", err);
    return !(err instanceof Error)
        ? res.status(HTTP_STATUS.BAD_REQUEST).json(err)
        : res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            msg: err.message ?? null,
            stack: req.app.get('env') === 'development' ? err.stack?.split("\n") : null
        })
}

module.exports = ErrrorHandler;
