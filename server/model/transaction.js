const sha256 = require ("crypto-js/sha256");
class Transaction {
    constructor(data){
        let {
            sender,
            receiver,
            amount,
            signature
        } = data;
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.signature = signature;
        this.timeStamp = Date.now();
        this.hash = sha256(amount + this.timeStamp + signature).toString();
    }

    getTransaction() {
        return {
            sender: this.sender,
            receive: this.receiver,
            amount: this.amount,
            signature: this.signature,
            timeStamp: this.timeStamp,
            hash: this.hash
        };
    };

    getHash() {
        return{hash};
    }
}
module.exports = Transaction;