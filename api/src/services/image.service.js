const path = require('path');
const readable = require('stream').Readable;
const fs = require("fs");
const { hash } = require('./hashing.service');

const IMAGE_STORAGE = process.env.IMAGE_STORAGE || path.join(__dirname, "..", "..", 'images');
const IMAGE_URL = new URL('http://image@hermes/images.name');

async function saveImage(data) {
    const imgurl = new URL(data);

    if (imgurl.protocol != 'data:')
        return imgurl;

    var [metaData, EncodedData] = imgurl.pathname.split(",");
    var [fileType, format] = metaData.split('/');
    var [fileExtension, encodedType] = format.split(";");

    if (fileType != 'image' || encodedType != 'base64')
        return imgurl;

    // get name and location
    const imgName = `${(await hash(EncodedData)).replace(/[\\\/\.]/g, "-").replace("=", "")}.${fileExtension}`;
    const imgpath = path.join(IMAGE_STORAGE, imgName)

    IMAGE_URL.pathname = imgName

    console.log("Save Image To : " + imgpath);

    const fileBuffer = Buffer.from(EncodedData, encodedType);
    const stream = new readable();
    stream.push(fileBuffer);
    stream.push(null);
    stream.pipe(fs.createWriteStream(imgpath));

    return IMAGE_URL.toString();
}

function changeImageOrigin(data) {
    return new Promise((resolve, reject) => {
        if (!data) resolve(data);
        try {
            const img_url = new URL(process.env.ORIGIN || "http://localhost:3000");
            const img = new URL(data)
            if (img.username == "image" && img.hostname == "hermes") {
                img_url.pathname = `api/imgs/${img.pathname}`
                resolve(img_url);
            }else resolve(data);
        } catch (e) {
            resolve(data);
        }
    });
}

function changeImageOriginSync(data) {
    if (!data) return data;
    try {
        const img_url = new URL(process.env.ORIGIN || "http://localhost:3000");
        const img = new URL(data)
        if (img.username == "image" && img.hostname == "hermes") {
            img_url.pathname = `api/imgs/${img.pathname}`
            return img_url;
        }else return data;
    } catch (e) {
        return data;
    }
}

module.exports = { changeImageOrigin, saveImage, changeImageOriginSync };
