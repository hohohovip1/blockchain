const express = require('express');
const router = express.Router();
const Pool = require("../model/pool");
const Blockchain = require("../model/blockchain");
const createTransaction = require("../model/transaction");
const {getKeyPair} = require("../config/key");
const keyPair = getKeyPair();
//const { verifySignature, verifyBlockchain } = require("../common/crypto");

module.exports = () => {
    router.post("/transactions", (req, res) => {
        let newTran = createTransaction({...req.body}).getTransactionData();
        Pool.addTrans(newTran);
        return res.status(200).json({newTran});
    });
    router.post("/sign-transaction", (req, res) => {
        let { sender, receiver, amount } = req.body;

        console.log(keyPair.sign(sender + " " + receiver + " " + amount, "base64").toString())
        return res.status(200).json({ signature: keyPair.sign(sender + " " + receiver + " " + amount, "base64").toString() })

    });
    return router;
}