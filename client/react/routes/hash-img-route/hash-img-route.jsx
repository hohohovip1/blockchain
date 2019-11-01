import React from "react";
import { MainLayout } from "../../layout/main-layout/main-layout";
import logo from "../../../../server/img/1.jpg";
import { BlockchainApi } from "../../../api/common/blockchain-api";

export class HashImgRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:null,
            signature:null
        }
    }
    handleHashImg(){
        BlockchainApi.signHashImg().then(({hash,signature}) => {console.log(hash,signature); this.setState({hash, signature})});
    }
    render(){
        let {hash,signature} = this.state;
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
                    </div>
                </MainLayout>
            </div>
        )
    }
}