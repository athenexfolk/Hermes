const HTTP_STATUS = require("../../core/value-object");
const UserDao = require("../../dao/user.dao");

async function patchAvatarEndpoint(req, res){
    await patchAvatar(req.sub,req.body).then(data=>{
        res.status(HTTP_STATUS.NO_CONTENT).send();
    }).catch(e=>{
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            error: e.message
        });
    });
}

async function patchAvatar(sub,body){
    const avatar = await validateAvatar(body);
    const res = await UserDao.updateOne(
        {_id:sub},
        {
            $set:{
                avatar:avatar
            }
        }
    );
    if (!res.acknowledged)
        throw new Error("Failed to update avatar.");
    else return res;
}

async function validateAvatar(data){
    if (!data)
        throw new Error("Avatar Not Found.");

    else if (!!data["b64-img"])
        return data["b64-img"];

    else throw new Error("Unknown Error.");
}

module.exports = patchAvatarEndpoint;
