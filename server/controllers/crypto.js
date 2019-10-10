const express = require('express');
const router = express.Router();
const myPool = require("../model/pool");
//const Blockchain = require("../model/blockchain");
const Block = require("../model/block");
const Transaction = require("../model/transaction");
const {getKeyPair} = require("../config/key");
const keyPair = getKeyPair();
const { verifySignature, verifyBlockchain } = require("../common/crypto");

module.exports = () => {
    router.post("/transactions", (req, res) => {
        // console.log(req.body);
        let newTran = new Transaction({...req.body}).getTransaction();
        myPool.addTrans(newTran);

        return res.status(200).json({newTran});
    });

    router.post("/sign-transaction", (req, res) => {
        let { maNhanVien, maSach, nguoiMuon, ngayMuon, ngayTra } = req.body;

        // console.log(keyPair.sign(sender + " " + receiver + " " + amount, "base64").toString())
        return res.status(200).json({ signature: keyPair.sign(maNhanVien + " " + maSach + " " + nguoiMuon, "base64").toString() })

    });

    router.get("/transactions", (req, res) => {
        return res.status(200).json({ transPool: myPool.getTrans() });
    });

    router.post("/verify-transaction", (req, res) => {
        return res.status(200).json({ isValid: verifySignature(keyPair, req.body) })
    });

    router.post("/blockchain/add-block", (req, res) => {
        let { transactions, hash, timeStamp, nonce } = req.body;
        myPool.removeTrans(transactions);
        let newBlock = new Block({ ...req.body }).getBlockData();
        Block.addBlock(newBlock);

        return res.status(200).json({ newTran });
        //Blockchain.addBlock({ hash, timeStamp, transactions, nonce });
        //return res.status(200).json({ info: Blockchain.getBlockchainInfo() });
    });
    // router.post("/verify-blockchain", (req, res) => {
    //     let info = verifyBlockchain(Blockchain.getBlockchainInfo());
    //     return res.status(200).json({ ...info })
    // });
    return router;
}