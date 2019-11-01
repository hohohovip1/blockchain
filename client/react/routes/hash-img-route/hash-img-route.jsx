import React from "react";
import { MainLayout } from "../../layout/main-layout/main-layout";
import logo from "../../../../server/img/1.jpg";
import { BlockchainApi } from "../../../api/common/blockchain-api";
import { VerifyApi } from "../../../api/common/verify-api";

export class HashImgRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:null,
            signature:null,
            isValid:null
        }
    };
    
    handleHashImg(){
        BlockchainApi.signHashImg().then(({hash,signature}) => {console.log(hash,signature); this.setState({hash, signature})});
    };
    handleCheckSign(signature) {
        VerifyApi.verifySignImg({signature}).then(({isValid}) => {console.log(isValid); this.setState({isValid})});
    };
    render(){
        let {hash,signature,isValid} = this.state;
        return(
            <div className="hash-img">
                <MainLayout>
                    <div className="hash-img-main">
                        <img src={logo} alt="nothing" />
                        <button onClick={() => this.handleHashImg()} className="hash-button">
                            Hash Image
                        </button>
                        <h2 className="info">Hash: {hash}</h2>
                        <h5 className="info">Sign: {signature}</h5>
                        <input type="text" onChange={e => this.setState({ signature: e.target.value })} value={signature}/>
                        <button className="checkSignature" onClick={() => this.handleCheckSign(signature)}>Check</button>
                        {isValid === true && <p>valid</p>}
                        {isValid === false && <p>invalid</p>}
                    </div>
                </MainLayout>
            </div>
        )
    }
}