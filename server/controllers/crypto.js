const express = require('express');
const router = express.Router();
const myPool = require("../model/pool");
const Blockchain = require("../model/blockchain");
const Block = require("../model/block");
const Transaction = require("../model/transaction");
const {getKeyPair} = require("../config/key");
const keyPair = getKeyPair();
const { verifySignature, verifyBlockchain, verifySignatureChain, hashImg, verifySignImg } = require("../common/crypto");
const sha256 = require("crypto-js/sha256");

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
        let { transactions, timeStamp, nonce, hash} = req.body;
        myPool.removeTrans(transactions);
        Blockchain.addBlock({hash, transactions, timeStamp,  nonce });
        return res.status(200).json({ info: Blockchain.getBlockChainInfo() });
    });

    router.get("/blockchain/info", (req, res) => {
        return res.status(200).json({ info: Blockchain.getBlockchainInfo() });
    });
    
    router.post("/verify-blockchain", (req, res) => {
        let info = verifyBlockchain(Blockchain.getBlockchainInfo());
        return res.status(200).json({ ...info })
    });

    router.post("/sign-hash-chain", (req, res) => {
        let chain = JSON.stringify(req.body);
        let hash = sha256(chain).toString();
        let signature = keyPair.sign(hash, "base64").toString();
        console.log(chain);
        return res.status(200).json({hash, signature});
    });

    router.post("/sign-hash-img", async (req, res) => {
        let hash = await hashImg();
        // console.log(hash);
        return res.status(200).json({ hash, signature: keyPair.sign(hash,"base64").toString() });
    });

    router.post("/verify-sign-img", (req, res) => {
        return res.status(200).json({ isValid: verifySignImg(keyPair, req.body) });
    });

    router.post("/verify-signature-chain", (req, res) => {
        return res.status(200).json({ isValid: verifySignatureChain(keyPair, req.body) });
    });
    return router;
}