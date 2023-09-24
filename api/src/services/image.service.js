// const bcrypt = require('bcrypt');
const path = require('path');
const fs = require("fs");
const { hash } = require('./hashing.service');

const IMAGE_STORAGE = process.env.IMAGE_STORAGE || path.join(__dirname, "..", "..", 'images');
const ORIGIN = new URL(process.env.ORIGIN || 'http://localhost:3000');

async function saveImage(data) {
    const imgurl = new URL(data);
    console.assert(imgurl instanceof URL, "Image must be a URL");

    if (imgurl.protocol != 'data:')
        return imgurl;

    var [metaData, rawData] = imgurl.pathname.split(",");
    var [fileType, format] = metaData.split('/');
    var [fileExtension, rawDataFormat] = format.split(";");

    if (fileType != 'image')
        return imgurl;

    const imgName = `${(await hash(rawData)).replace(salt, "").replace(/[\\\/\.]/g, "-")}.${fileExtension}`;
    const imgpath = path.join(IMAGE_STORAGE, imgName)
    ORIGIN.pathname = `/imgs/${imgName}`

    fs.writeFile(imgpath, rawData, rawDataFormat, function (err) {
        console.log(err);
        if (err)
            throw err
    });

    return ORIGIN.toString();
}

module.exports = saveImage;
