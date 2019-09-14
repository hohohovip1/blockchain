import React from "react";
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 });
const keyPair = key.generateKeyPair();

export class MainRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:"",
            encryptedText:"",
            otherEnText:"",
            result:""
        };
    };

handleEncrypt = () => {
    let {text} = this.state;
    const encryptedText = keyPair.encrypt(text, 'base64');
    this.setState({encryptedText,otherEnText: encryptedText});
}

handleDecrypt = () => {
    let {otherEnText} = this.setState;
    const decrypted = keyPair.decrypt(otherEnText, 'utf8');
    this.setState({result: decrypted});
}
    render(){
        console.log(process.env.STATIC_DIR || "build");
        let {text, encryptedText, otherEnText, result} = this.state;

        return(
            <div id="main-route">
                <label htmlFor="text">Nhập text:</label>
                <input type="text" id="text" name="text" value={text} onChange={e => this.setState({text: e.target.value})} />
                <button onClick={this.handleEncrypt}>Encrypt</button>
                <div className="textBox">{encryptedText}</div>
                <label htmlFor="decryptText">Encrypted Text</label>
                <input type="text" name="decryptText" value={otherEnText} onChange={e => this.setState({otherEnText: e.target.value})}/>
                <button onClick={this.handleDecrypt}>Decrypt</button>
                <div>{result}</div>
            </div>
        );
    }
}