const HTTP_STATUS = require("../../core/value-object");
const UserDao = require("../../dao/user.dao");

async function patchDisplayNameEndpoint(req, res){
    const newName = req.params.displayname;
    await patchDisplayName(req.sub,newName).then(data=>{
        res.status(HTTP_STATUS.NO_CONTENT).send();
    }).catch(e=>{
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            error: e.message
        });
    });
}

async function patchDisplayName(sub,name){
    const res = await UserDao.updateOne(
        {_id:sub},
        {
            $set:{
                displayname:name
            }
        }
    );
    if (!res.acknowledged)
        throw new Error("Failed to update display name.");
    else return res;
}

module.exports = patchDisplayNameEndpoint;
