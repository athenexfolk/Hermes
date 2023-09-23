const HTTP_STATUS = require("../core/value-object");

const ErrrorHandler = async (req, res, next) =>{

    try{
        await next();
    }
    catch (e){
        console.error("\x1b[41m%s\n\x1b[0m","!ERROR!", e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error : "Internal Server Error"
        });
    }

}

module.exports = ErrrorHandler;
