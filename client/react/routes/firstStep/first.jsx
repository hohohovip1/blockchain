import React from "react";
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 });
var SHA256 = require("crypto-js/sha256");

export class MainRoute extends React.Component {
    constructor(props) {
        super(props);
        this.initData = {
            text: "",
            encryptedText: "",
            otherEnText: "",
            result: "",
            hash: "",
            otherHash: "",
            isValidHash: 0,
            sign: "",
            signText: "",
            isValidSign: 0,
            message: ""
        };
        this.state = {
            ...this.initData
        };
        this.getKeyPair();
    };

    getKeyPair = () => {
        this.keyPair = key.generateKeyPair();
    }

    handleEncrypt = () => {
        let { text } = this.state;
        const encryptedText = this.keyPair.encrypt(text, 'base64');
        this.setState({ encryptedText: encryptedText, otherEnText: encryptedText });
    }
    handleSign = () => {
        let { text } = this.state;
        const sign = this.keyPair.sign(text, 'base64');
        this.setState({ sign, signText: sign, isValidSign: 0, message: text });
    }

    handleValidateSign = () => {
        let { signText, message } = this.state;
        this.setState({ isValidSign: this.keyPair.verify(message, signText, "utf8", "base64") ? 2 : 1 });
    }

    handleDecrypt = () => {
        let { otherEnText } = this.state;
        const decrypted = this.keyPair.decrypt(otherEnText, 'utf8');
        this.setState({ result: decrypted });
    }

    handleIsNull = (val, ft) => {
        if (!val) {
            return;
        }
        return ft();
    }
    handleValidateHash = () => {
        let { otherHash } = this.state;
        let checkHash = new RegExp("^[a-f0-9]{64}$");
        this.setState({ isValidHash: checkHash.test(otherHash) ? 2 : 1 });
    }
    handleHash = () => {
        let { text } = this.state;
        let hash = SHA256(text).toString();
        console.log(SHA256(text));
        this.setState({ hash, otherHash: hash, isValidHash: 0 })
    }
    render() {
        console.log(process.env.STATIC_DIR || "build");
        let { text, encryptedText, otherEnText, result, hash, otherHash, isValidHash, signText, isValidSign, message } = this.state;

        return (
            <div id="main-route">
                <div style={{ marginBottom: "30px" }}>
                    <button onClick={() => { this.getKeyPair() }}>Generate key pair</button>
                    <br />
                    <button onClick={() => this.setState({ ...this.initData })}>Reset</button>

                </div>
                <div className="decrypting">
                    <label htmlFor="text">Nhập text:</label>
                    <input type="text" id="text" name="text" value={text} onChange={e => this.setState({ text: e.target.value, hash: "", encryptedText: "" })} />
                    <button onClick={() => this.handleIsNull(text, this.handleEncrypt)}>Encrypt</button>
                    <button onClick={() => this.handleIsNull(text, this.handleHash)}>Hash</button>
                    <button onClick={() => this.handleIsNull(text, this.handleSign)}>Sign</button>
                    <br />
                    <label htmlFor="encrypted" >Encrypted:</label>
                    <div className="textBox" name="encrypted">{encryptedText}</div>
                    <label htmlFor="hash">Hash:</label>
                    <div className="textBox" name="hash">{hash}</div>
                    <label htmlFor="sign">Sign:</label>
                    <div className="textBox" name="sign">{signText}</div>
                    <label htmlFor="otherHash">Validate Hash:</label>
                    <input type="text" name="otherHash" value={otherHash} onChange={e => this.setState({ otherHash: e.target.value })} />
                    <button onClick={this.handleValidateHash}>Validate Hash</button>
                    {isValidHash === 2 && "valid"}
                    {isValidHash === 1 && "invalid"}
                    <br />
                    <input type="text" name="otherText" value={signText} onChange={e => this.setState({ signText: e.target.value })} />
                    <button onClick={this.handleValidateSign}>Validate Sign</button>
                    {isValidSign === 2 && "valid"}
                    {isValidSign === 1 && "invalid"}
                </div>
                <label htmlFor="decryptText">Encrypted text</label>
                <input type="text" name="decryptText" value={otherEnText} onChange={e => this.setState({ otherEnText: e.target.value })} />
                <button onClick={() => this.handleIsNull(otherEnText, this.handleDecrypt)}>Decrypt</button>
                <div className="result">Kết quả giải mã: {result}</div>
                <br />



            </div>
        );
    }
}