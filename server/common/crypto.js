
const sha256 = require("crypto-js/sha256");
const { getKeyPair } = require("../config/key");
const keyPair = getKeyPair();

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
    let { maNhanVien, maSach, nguoiMuon, ngayMuon, ngayTra, signature } = transaction;
    return keyPair.verify(maNhanVien + " " + maSach + " " + nguoiMuon, signature, "utf8", "base64");
};

const verifySignatureChain = (keyPair, data) => {
    let { chain, signature } = data;
    let newChain = JSON.stringify(chain);
    return keyPair.verify(newChain, signature, "utf8", "base64");
};

let createMerkelRoot = (hashArr) => {
    if (hashArr.length === 0) {
        return null;
    }
    if (hashArr.length === 1) {
        return hashArr[0];
    }
    return this.createMerkelRoot(splitArray(hashArr).map((arr) => hashPair(arr[0], arr[1])));
};

const isGenesisBlock = ({nonce, transactions, preHash, hash, merkelRootHash, timeStamp}) => {
    return nonce === 0 && transactions.length === 0 && preHash === "" && sha256(nonce + merkelRootHash + timeStamp).toString() === hash;
};

const isValidBlock = ({nonce, transactions, preHash, hash, merkelRootHash, timeStamp}) => {
    let isValid = sha256(nonce + merkelRootHash + timeStamp).toString() === hash && createMerkelRoot(transactions.map(each => each.hash)) === merkelRootHash && transactions.reduce((result, cur) => {
        return result && verifySignature(keyPair, cur);
    },true);
    return{
        isValid,
        extra: hash
    }
}

const verifyBlockchain = (blockchain) => {
    let { chain } = blockchain;
    if (!isGenesisBlock(chain[0])) {
        return {
            isValid: false,
            errType: "invalid-genesis",
            extra: {
                hash: chain[0].hash
            }
        };
    }
    for (let i = 1; i < chain.length; i++) {
        const block = chain[i];
        const previousBlock = chain[i - 1];
        let checkBlock = isValidBlock(block);
        if (!checkBlock.isValid)
            return {
                isValid: false,
                errType: "invalid-block",
                extra: {
                    hash: checkBlock.extra
                }
            };
        if (block.preHash !== previousBlock.hash)
            return {
                isValid: false,
                errType: "invalid-relation",
                extra: {
                    hash: [previousBlock.hash, block.hash]
                }
            };

    }
    return {
        isValid: true
    };

}


module.exports = {
    verifySignature,
    verifyBlockchain,
    hashPair,
    splitArray,
    createMerkelRoot,
    verifySignatureChain
};