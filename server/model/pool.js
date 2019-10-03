const fs = require("fs");
const path = require("path");

class Pool{
    constructor(data){
        let tempArray = fs.readFileSync(path.resolve(__dirname, "./draft/pool.txt"), 'utf8');
        let transactions = tempArray ? JSON.parse[tempArray] : [];
    }
    addTrans (trains){
        transactions.push(trains);
        fs.writeFileSync(path.resolve(__dirname,"./draft/pool.txt"), JSON.stringify(transactions));
    }
    getTrans(){
        return transactions;
    }
    removeTrans(list){
        transactions = transactions.filter(each => each.find(item => item.hash === each.hash));
        fs.writeFileSync(path.resolve(__dirname,"./draft/pool.txt"));
    }
};
const newPool = new Pool();

module.exports = Pool;