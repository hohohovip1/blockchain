import React from "react";
import  {MainLayout} from "../../layout/main-layout/main-layout";
import { TransApi } from "../../../api/common/trans-api";
import { VerifyApi } from "../../../api/common/verify-api";
import { BlockchainApi } from "../../../api/common/blockchain-api";
import classnames from "classnames";
import hexToBinary from "hex-to-binary"
import { wait } from "../../../common/utils";
import moment from "moment";
import { calculateHash } from "../../../common/crypto";

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
            validateAll: false,
            mining: false,
            difficulty: 10,
            block: [],
            timeStamp: null

        };
        TransApi.getTransaction().then(({transPool}) => {this.setState({transPool})});
        // BlockchainApi.getBlockchainInfo().then(({info}) => this.setState({difficulty: info.difficulty}));
    }
    handleCheckAll = () => {
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
    
    handleAddTransaction = (trans) => {
        let {block} = this.state;
        block.push(trans);
        this.setState({block});
        console.log(block); 
    }

    handleVerifySignature = (transaction) => {
        let {validateMap} = this.state;
     
        VerifyApi.verifySignature(transaction).then(({isValid}) => {
            validateMap[transaction.hash] = isValid ? 1 : 0;
            //console.log(Object.keys(validateMap));
            this.setState({ validateMap });
        });
    }


    handleMineBlock = async () => {
        let { transPool, validateMap, difficulty, block } = this.state;
        // let blockData = [];
        // blockData = transPool.filter(each =>  validateMap[each.hash] === 1);
        // console.log(blockData, "asd");
        this.setState({mining: false});
        let nonce = 0;
        let hash, timeStamp;
        do{
            nonce++;
            timeStamp = Date.now();
            hash = calculateHash({data: [...block], nonce, difficulty});
            await wait(0);
            this.setState({hash, timeStamp, nonce});
        } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));
        this.setState({mining: true});
         console.log(this.state.mining);
    };

    handleAddToChain = () => {
        let {hash, timeStamp, nonce, block} = this.state;
        console.log("ok");
        BlockchainApi.addBlock({hash, timeStamp, transactions: [...block], nonce}).then(()=>{
            console.log("done");
        })
    }
    
    render(){
        const {hash, preHash, rootHash, nonce, transPool, block, mining, timeStamp, difficulty} = this.state;
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

                                <p className="label">Ma nhan vien</p>
                                <p className="value">{each.maNhanVien}</p>

                                <p className="label">Ma sach</p>
                                <p className="value">{each.maSach}</p>
                                
                                <p className="label">Nguoi muon</p>
                                <p className="value">{each.nguoiMuon}</p>

                                <p className="label">Ngay muon</p>
                                <p className="value">{each.ngayMuon}</p>

                                <p className="label">Ngay tra</p>
                                <p className="value">{each.ngayTra}</p>

                                <p className="label">Signature</p>
                                <p className="value">{each.signature}</p>
                                  
                                <p className="label">Created At</p>
                                <p className="value">{jsDate.getDate()}/{jsDate.getMonth()+1}/{jsDate.getFullYear()} {jsDate.getHours()+1}:{jsDate.getMinutes()+1}:{jsDate.getSeconds()+1}</p>
                                {isValid === 2 ? (
                                <button onClick={() => this.handleVerifySignature(each)}>
                                    Check
                                </button>
                                ) : (<button onClick = {() => this.handleAddTransaction(each)}>Add</button>)}
                               
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
                        <h1 className="block-label">Create block</h1>
                        <p className="label">Difficulty:</p>
                        <p className="value">{difficulty || "Loading"}</p>

                        <p className="label">Hash:</p> 
                        <p className="value">{hash || "Not mined yet"}</p>

                        <p className="label">Timestamp:</p>
                        <p className="value">{timeStamp ? (<>  {timeStamp}
                            (<span className="text-danger"> {moment(new Date(timeStamp)).format("DD/MM/YYYY HH:mm:ss")}</span>)
                        </>) : ("Not mined yet")}</p>  
                        
                        <p className="label">Nonce:</p>
                        <p className="value">{nonce || "Not mined yet"}</p>

                        <p className="label">Block transaction</p>
                        <div className="block-value">{block.length ? (block.map(each => {
                            return(
                                <div className="block-transaction" key={each.hash}>
                                    <p className="value">Hash: {each.hash}</p>

                                    <p className="value">Ma nhan vien: {each.maNhanVien}</p>

                                    <p className="value">Ma sach: {each.maSach}</p>

                                    <p className="value">Nguoi muon: {each.nguoiMuon}</p>
                                </div>
                            )})) : ("Don't have transaction pending")}</div> 
                    </div>
                    <button className="checkAll" onClick={() => this.handleCheckAll()}>
                        Check All
                    </button>
                    <div>
                            {
                            // (Object.keys(this.state.validateMap).length === this.state.transPool.length)
                            (Object.keys(this.state.validateMap).length >= 1) && (
                                <>
                                    {mining === false ? (<button  className="end-button" onClick={() => this.handleMineBlock()}>Mine Block</button>) : (
                                        <button className="end-button" onClick={() => this.handleAddToChain()}>Add to chain</button>
                                    )}
                                </>
                            )
                                // <button className="create-block-button" disabled={this.state.transPool.filter(each => mapKeys.includes(each.hash)).length < 2} onClick={() => this.handleMineBlock()}>Create Block</button>
                            // <button onClick={()=> this.handleAddToChain()}>Add</button>

                        //      this.state.transPool.filter(each => mapKeys.includes(each.hash)).length === this.state.transPool.length  && (
                        //         <button className="create-block-button" onClick={() => this.handleMineBlock}>Create Block</button>
                        // )
                        }  
                        
                     
                    </div>
                </div>
            </MainLayout>            
        );
    }
}