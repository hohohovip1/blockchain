import React from "react";
import { MainLayout } from "../../layout/main-layout/main-layout";
import { BlockchainApi } from "../../../api/common/blockchain-api";

export class ViewChainRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           info: null,
           chain: []
        };
        BlockchainApi.getBlockchainInfo().then((info) => {this.setState({info:info.info, chain: info.info.chain}); console.log(info, 'ok');})
    }
    render() {
        let {info, chain} = this.state;
        // console.log(chain);
        return (
            <div className="view-chain">
                <MainLayout>
                <div className="view-chain">
                    {chain.length ? (chain.map(each => {
                        let { nonce, transactions, preHash, hash, merkelRootHash} = each;
                        return(
                            <div className="block-node" key="chain.hash">
                                <p className="label">nonce:</p>
                                <p className="value">{nonce}</p>
                            </div>
                        )
                    })) : ("Don't have a chain yet")}
                </div>
                </MainLayout>
            </div>
        );
    }
}