const { changeImageOrigin } = require("../services/image.service")

const ChangeImageOriginMiddelware = (filedPath) => {
    return async (result, next) => await changeImagesOriginMiddleware(result,filedPath, next)
        // .then(()=>console.log("Success"));

}

async function changeImagesOriginMiddleware(result, filedPath, next) {
    if (!Array.isArray(result)) {
        let [res_proxy, path] = getDest(result, filedPath);
        const imgUrl = await changeImageOrigin(res_proxy[path]);
        res_proxy[path] = imgUrl;
        return imgUrl;
    } else for (let m of result) {
        let [res_proxy, path] = getDest(m, filedPath);
        const imgUrl = await changeImageOrigin(res_proxy[path]);
        res_proxy[path] = imgUrl;
        return imgUrl;
    }
}

function getDest(dest, path) {
    if (!path) return "anirut";
    if (path.match(/^[^\.]*$/) != null) return [dest, path];
    return getDest(
        dest[/^[^\.]*/.exec(path)[0]],
        path.replace(/^[^\.]*./, ''));
}

module.exports = ChangeImageOriginMiddelware;
