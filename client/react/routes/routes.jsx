import React from "react";
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 });
var SHA256 = require("crypto-js/sha256");

export class MainRoute extends React.Component{
    constructor(props){
        super(props);
        this.initData = {
            text:"",
            encryptedText:"",
            otherEnText:"",
            result:"",
            hash:"",
            otherHash:""
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
    let {text} = this.state;
    const encryptedText = this.keyPair.encrypt(text, 'base64');
    this.setState({encryptedText: encryptedText, otherEnText: encryptedText});
}

handleDecrypt = () => {
    let {otherEnText} = this.state;
    const decrypted = this.keyPair.decrypt(otherEnText, 'utf8');
    this.setState({result: decrypted});
}

handleIsNull = (val, ft) =>{
    if (!val){
        return;
    }
    return ft();
}

handleHash = () => {
    let { text } = this.state;
    let hash = SHA256(text).toString();
    this.setState({ hash, otherHash: hash })
}
    render(){
        console.log(process.env.STATIC_DIR || "build");
        let {text, encryptedText, otherEnText, result, hash} = this.state;

        return(
            <div id="main-route">
                <div style={{ marginBottom: "30px" }}>
                    <button onClick={() => { this.getKeyPair() }}>Generate key pair</button>
                    <br/>
                    <button onClick={() => this.setState({ ...this.initData })}>Reset</button>
                    
                </div>
                <div className="decrypting">
                    <label htmlFor="text">Nhập text:</label>
                    <input type="text" id="text" name="text" value={text} onChange={e => this.setState({text: e.target.value, hash:"", encryptedText:""})} />
                    <button onClick={() => this.handleIsNull(text,this.handleEncrypt)}>Encrypt</button>
                    <button onClick={() => this.handleIsNull(text,this.handleHash)}>Hash</button>
                    <div className="textBox">{encryptedText}</div>
                    <div className="textBox">{hash}</div>
                </div>
                <label htmlFor="decryptText">Encrypted text</label>
                <input type="text" name="decryptText" value={otherEnText} onChange={e => this.setState({otherEnText: e.target.value})}/>
                <button onClick={() => this.handleIsNull(otherEnText,this.handleDecrypt)}>Decrypt</button>
                <div className="result">Kết quả giải mã: {result}</div>
                <br/>
                <label htmlFor="hash"></label>
                
            </div>
        );
    }
}