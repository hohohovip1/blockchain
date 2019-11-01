import React from "react";
import { MainLayout } from "../../layout/main-layout/main-layout";
import logo from "../../../../server/img/1.jpeg";
import { BlockchainApi } from "../../../api/common/blockchain-api";

export class HashImgRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    handleHashImg(){
        BlockchainApi.signHashImg().then(({hash,signature}) => {console.log(hash,signature)});
    }
    render(){
        return(
            <div className="hash-img">
                <MainLayout>
                    <div className="hash-img-main">
                        <img src={logo} alt="nothing" />
                        <button onClick={() => this.handleHashImg()}>
                            Hash Img
                        </button>
                    </div>
                </MainLayout>
            </div>
        )
    }
}