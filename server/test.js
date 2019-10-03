const Block = require("./model/block");
const Transaction = require("./model/transaction");
const BlockChain = require("./model/blockchain");

let t = new Transaction({
    sender:"nv",receiver: "ta",amount: 2,signature: "ok"
});

let t2 = new Transaction({
    sender: "nv",
    receiver: "t",
    amount: 3,
    signature: "ok3"
});

let b = new Block({
                transactions: [t.getTransaction(),t2.getTransaction()], preHash: "ok"
            })

//console.log(b.getBlockData());
let a = new BlockChain({
    name: "Nova",
    difficulty: 10
});
console.log(a.getBlockChainInfo());