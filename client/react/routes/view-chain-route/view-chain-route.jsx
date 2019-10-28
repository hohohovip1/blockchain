import React from "react";
import { MainLayout } from "../../layout/main-layout/main-layout";
import { BlockchainApi } from "../../../api/common/blockchain-api";
import {VerifyApi} from "../../../api/common/verify-api";
import moment from "moment";
// import { Verify } from "crypto";

export class ViewChainRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           info: null,
           chain: [],
           name:"",
           difficulty:0,
           validatingAll: false,
           isValid: null,
           errType:null,
           extra:null
        };
        BlockchainApi.getBlockchainInfo().then(({info}) => {this.setState({info, chain: info.chain, name:info.name, difficulty:info.difficulty}); console.log(info);})
    }

    handleVerifyBlockchain(){
        let {errType, extra} = this.state;
        this.setState({validatingAll:true});
        VerifyApi.verifyChain().then((data) => {
            // console.log(data);
            this.setState({validatingAll: false, isValid: data.isValid, extra:data.extra, errType:data.errType });
        })
    }
    handleBlockchain(){
        let {chain} = this.state;
        BlockchainApi.signHashChain(chain).then(({hash, signature})=>{console.log(hash,signature,"ok")});
    }

    render() {
        let {info, chain, name, difficulty, validatingAll, isValid, errType, extra} = this.state;
        return (
            <div className="blockchain">
                <MainLayout>
                <div className="view-chain">
                    <div className="header">
                        <h1>Blockchain</h1>
                        <h2>Chain name: {name}</h2>
                        <h2>Difficulty: {difficulty}</h2>
                         {isValid !== true ? (<button className="verify-blockchain" disabled={validatingAll === true} onClick={() => this.handleVerifyBlockchain()}>Verify Blockchain</button>) : (
                             <button className="verify-blockchain" onClick={() => this.handleBlockchain()}>Hash blockchain</button>
                         )}
                        
                        <div className="chain-valid">
                                {isValid === true && <h2>The chain is valid</h2>}
                                {isValid === false && <h2>The chain isn't valid:</h2>}
                                {/* {console.log(isValid)} */}
                        </div>    
                    </div>
                    {chain.length ? (chain.map(each => {
                        let { nonce, transactions, preHash, hash, merkelRootHash, timeStamp} = each;
                        return(
                            <div className="block-node" key={chain.hash}>
                                {!each.transactions.length && (<div className="g-block">Genesis Block</div>)}
                                <p className="info">Nonce: {nonce}</p>
                                <p className="info">Pre-hash: {preHash}</p>
                                <p className="info">Hash: {hash}</p>
                                <p className="info">Merkel hash: {merkelRootHash}</p>
                                <p className="info">Timestamp:{moment(timeStamp).format("HH:mm:ss MMM DD YYYY")}</p>
                                <p className="info">Transactions:</p>
                                <div className="block-value">{transactions.length ? (transactions.map(each => {
                                    return (
                                        <div className="block-transaction" key={each.hash}>
                                            <p className="value">Hash: {each.hash}</p>

                                            <p className="value">Ma nhan vien: {each.maNhanVien}</p>

                                            <p className="value">Ma sach: {each.maSach}</p>

                                            <p className="value">Nguoi muon: {each.nguoiMuon}</p>
                                        </div>
                                    )
                                })) : ("")}</div>
                                {(errType === "invalid-relation" && extra.hash[1] === hash) && (<p className="error-info">Invalid: PreHash error</p>)}
                                {(errType === "invalid-block" && extra.hash === hash) && (<p className="error-info">Invalid: Hash error</p>)}
                                {(errType === "invalid-genesis" && extra.hash === hash) && (<p className="error-info">Invalid: Genesis error</p>)}
                            </div>
                        )
                    })) : ("Don't have block in chain yet")}
                </div>
                </MainLayout>
            </div>
        );
    }
}