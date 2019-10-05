const sha256 = require ("crypto-js/sha256");

function splitArray(arr) {
    let arrClone = [...arr];
    if (arr.length%2 !== 0){
        arrClone = [...arrClone, arrClone[arrClone.length-1]];
    };
    let returned = [];
    for (let i = 0 ; i < arrClone.length - 1; i+=2) {
        returned.push([arrClone[i], arrClone[i+1]]);
    }
    return returned;
};
function hashPair(h1, h2){
    return sha256(h1 + h2).toString();
};

class Block {
    constructor(data = {}){
        let{
            nonce = 0,
            transactions = [],
            preHash = "",
            timeStamp = Date.now()
        } = data;
        //console.log(transactions);
        this.nonce = nonce;
        this.transactions = transactions;
        this.preHash = preHash;
        this.timeStamp = timeStamp;
        this.merkelRootHash = this.generateRootHash(transactions);
        this.hash = sha256(nonce + this.merkelRootHash + timeStamp).toString();
    }

    generateRootHash(transactions){
        
        return transactions.length === 1 ? transactions[0].hash : this.createMerkelRoot(transactions.map(each => each.hash));
    }

    createMerkelRoot(hashArr){
        if (hashArr.length === 0) {
            return null;
        }
        if (hashArr.length === 1) {
            return hashArr[0];
        }
        return this.createMerkelRoot(splitArray(hashArr).map((arr) => hashPair(arr[0], arr[1])));
    }
    getBlockData(){
        return{
            nonce: this.nonce,
            transactions: this.transactions,
            preHash:this.preHash,
            merkelRootHash:this.merkelRootHash,
            hash:this.hash,
            timeStamp:this.timeStamp
        }
    }
};

module.exports = Block;