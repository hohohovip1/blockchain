const fs = require("fs");
const path = require("path");
const createBlock = require("./block");


class BlockChain { 
    constructor(data){
        let{
            name,
            difficulty
        } = data;
        this.name = name;
        this.difficulty = difficulty;
        let tempArray = fs.readFileSync(path.resolve(__dirname, "../draft/chain.txt"), 'utf8');
        this.chain =  tempArray ? JSON.parse(tempArray) : [new createBlock().getBlockData()];
    }
    getBlockChainInfo(){ return {name: this.name, chain: this.chain, difficulty: this.difficulty}};
    addBlock({hash, transactions, timeStamp, nonce}){
        let chain = this.chain;
        let currBlock = chain[chain.length - 1];
        let newBlock = new createBlock({
            transactions, timeStamp, nonce, preHash: currBlock.hash
        });
        chain.push(newBlock.getBlockData());
        fs.writeFileSync(path.resolve(__dirname,"../draft/chain.txt"), JSON.stringify(this.chain));
    }
} 
const testBlockChain = new BlockChain ({
    name: "Nova",
    difficulty: 10
});

module.exports = testBlockChain;