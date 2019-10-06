import React from "react";
import  {MainLayout} from "../../layout/main-layout/main-layout";
import { TransApi } from "../../../api/common/trans-api";
import { VerifyApi } from "../../../api/common/verify-api";

export class CreateBlockRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash: "",
            preHash: "",
            rootHash: "",
            nonce: 0,
            transPool: []
        };
        TransApi.getTransaction().then(({transPool}) => {this.setState({transPool})});
    }
    render(){
        const {hash, preHash, rootHash, nonce, transPool} = this.state;
        return(
            <MainLayout>
                <div className="create-block">
                    <div className="trans-pool-part">
                        <h1>Transaction pool</h1>
                        {transPool.map(each => {
                            let jsDate = new Date(each.timeStamp);

                            return (
                            <div className="transaction" key={each.hash}>
                                <p className="label">Hash</p>
                                <p className="value">{each.hash}</p>

                                <p className="label">Sender</p>
                                <p className="value">{each.sender}</p>

                                <p className="label">Amount</p>
                                <p className="value">{each.amount}</p>
                                
                                <p className="label">Receive</p>
                                <p className="value">{each.receive}</p>

                                <p className="label">Signature</p>
                                <p className="value">{each.signature}</p>
                                  
                                <p className="label">Created At</p>
                                <p className="value">{jsDate.getDate()}/{jsDate.getMonth()+1}/{jsDate.getFullYear()} {jsDate.getHours()+1}:{jsDate.getMinutes()+1}:{jsDate.getSeconds()+1}</p>
                            </div>
                            )
                        })}
                    </div>
                    <div className="create-block-part">
                        <h1>Create block</h1>
                    </div>
                </div>
            </MainLayout>            
        );
    }
}