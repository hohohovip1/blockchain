import React from "react";
import  {MainLayout} from "../../layout/main-layout/main-layout";
import { TransApi } from "../../../api/common/trans-api";
import { VerifyApi } from "../../../api/common/verify-api";
import classnames from "classnames";

export class CreateBlockRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash: "",
            preHash: "",
            rootHash: "",
            nonce: 0,
            transPool: [],
            validateMap: {},
            validateAll: false

        };
        TransApi.getTransaction().then(({transPool}) => {this.setState({transPool})});
    }
    handleCheckAll = () =>{
        let {transPool} = this.state;
        let result = [];
        this.setState({ validateAll: true });
        for (let transaction of transPool) {
            result.push(this.handleVerifySignature(transaction));
        }
        Promise.all(result).then(() => this.setState({ validateAll: false }))
    }

    handleCheckTransaction = (transaction) => {
        let {validateMap} = this.state;

        if (validateMap.hasOwnProperty(transaction.hash))  
            return validateMap[transaction.hash];

        return 2;
    }

    handleVerifySignature = (transaction) => {
        let {validateMap} = this.state;
     
        VerifyApi.verifySignature(transaction).then(({isValid}) => {
            validateMap[transaction.hash] = isValid ? 1 : 0;
            console.log(Object.keys(validateMap));
            
            this.setState({ validateMap });
        });
    }
    render(){
        const {hash, preHash, rootHash, nonce, transPool} = this.state;
        let mapKeys = Object.keys(this.state.validateMap);
        return(
            <MainLayout>
                <div className="create-block">
                    <div className="trans-pool-part">
                        <h1>Transaction pool</h1>
                        {transPool.length ?
                            transPool.map(each => {
                            let jsDate = new Date(each.timeStamp);
                            let isValid = this.handleCheckTransaction(each);
                            return (
                                <div className={classnames("transaction", {
                                    "invalid": isValid === 0,
                                    "valid": isValid === 1,
                                })} key={each.hash}>

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

                                <button onClick={() => this.handleVerifySignature(each)}>
                                    Check
                                </button>
                                <div className="is-valid">
                                    {isValid === 1 && "Valid!"}
                                    {isValid === 0 && "Invalid!"}
                                    {isValid === 2 && "Verify signature"}
                                </div>
                            </div>
                            )
                        }) : <p className="empty-pool">Transaction Pool empty!</p>
                        }
                    </div>
                    <div className="create-block-part"> 
                        <h1>Create block</h1>
                        
                    </div>
                    <button className="checkAll" onClick={() => this.handleCheckAll()}>
                        checkAll
                    </button>
                    <div>
                        {/* {this.state.transPool.filter(each => this.state.validateMap[each.hash] === 1)} */}
                        
                        {this.state.transPool.filter(each => mapKeys.includes(each.hash)).length === this.state.transPool.length  && (
                            <button></button>
                        )

                        }
                        {/* {
                            Object.keys(this.state.validateMap).length === this.state.transPool.length && (
                                <button></button>
                            )
                        } */}
                    </div>
                </div>
            </MainLayout>            
        );
    }
}