const fs = require("fs");
const path = require("path");

class Pool{
    constructor(data){
        let tempArray = fs.readFileSync(path.resolve(__dirname, "../draft/pool.txt"), 'utf8');
        this.transactions = tempArray ? JSON.parse(tempArray) : [];
        // console.log(this.transactions);
    }
    addTrans (trans){
        this.transactions.push(trans);
        fs.writeFileSync(path.resolve(__dirname, "../draft/pool.txt"), JSON.stringify(this.transactions));
    }
    getTrans(){
        return this.transactions;
    }
    removeTrans(list){
        this.transactions = this.transactions.filter(each => !list.find(item => item.hash === each.hash));
        fs.writeFileSync(path.resolve(__dirname, "../draft/pool.txt"), JSON.stringify(this.transactions));
    }
};
const newPool = new Pool();

module.exports = newPool;