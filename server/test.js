const Block = require("./model/block");
const Transaction = require("./model/transaction");

let t = new Transaction({
    sender:"nv",receiver: "ta",amount: 2,signature: "ok"
});

let t2 = new Transaction({
    sender: "nv",
    receiver: "t",
    amount: 3,
    signature: "ok3"
});

console.log(new Block({
    transactions: [t.getTransaction(),t2.getTransaction()], preHash: "ok"
}));