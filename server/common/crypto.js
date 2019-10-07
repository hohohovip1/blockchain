
const sha256 = require("crypto-js/sha256");

let splitArray = (arr) => {
    let arrClone = [...arr];
    if (arr.length % 2 !== 0) {
        arrClone = [...arrClone, arrClone[arrClone.length - 1]];
    };
    let returned = [];
    for (let i = 0; i < arrClone.length - 1; i += 2) {
        returned.push([arrClone[i], arrClone[i + 1]]);
    }
    return returned;
};
let hashPair = (h1, h2) => {
    return sha256(h1 + h2).toString();
};

const verifySignature = (keyPair, transaction) => {
    let { sender, receiver, amount, signature } = transaction;
    return keyPair.verify(sender + " " + receiver + " " + amount, signature, "utf8", "base64");
};

let createMerkelRoot = (hashArr) => {
    if (hashArr.length === 0) {
        return null;
    }
    if (hashArr.length === 1) {
        return hashArr[0];
    }
    return this.createMerkelRoot(splitArray(hashArr).map((arr) => hashPair(arr[0], arr[1])));
}
module.exports = {
    verifySignature,
    //verifyBlockchain,
    hashPair,
    splitArray,
    createMerkelRoot
};