
async function tryImportBcrypt() {
    const bcrypt = require("bcrypt")
    return bcrypt;
}

async function comparePassword(password, passwordHash) {
    return await tryImportBcrypt().then(bcrypt => {
        return bcrypt.compare(password, passwordHash)
    }).catch(() => bunComparePassword(password, passwordHash))
}

async function hashPassword(password) {
    return await tryImportBcrypt().then(bcrypt => {
        return bcrypt.hash(password, bcrypt.genSaltSync(10))
    }).catch(() => bunHashPassword(password))
}

async function hash(data) {
    return await tryImportBcrypt().then(async bcrypt => {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(data, salt)//.replace(salt, "");
        return hash.replace(salt, "");
    }).catch((e) => bunHash(e,data))
}


async function bunComparePassword(password, passwordHash) {
    console.log("#bunComparePassword#");
    return await Bun.password.verify(password, passwordHash);
}

async function bunHashPassword(password) {
    console.log("#bunHashPassword#");
    return await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 4, // number between 4-31
    });
}

async function bunHash(e,data) {
    console.log("#bunHash#", e);
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(data, "base64");
    return hasher.digest("base64");
}

module.exports.comparePassword = comparePassword;
module.exports.hashPassword = hashPassword;
module.exports.hash = hash;
