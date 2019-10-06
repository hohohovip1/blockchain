import React from "react";
import {TransApi} from "../../../api/common/trans-api";
import { customHistory } from "../routes";
import { MainLayout } from "../../layout/main-layout/main-layout";

export class CreateTransactionRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sender: "Nova",
            receive: "",
            amount: 0,
            signature: ""
        };
    }

    handleTransCreation = () => {
        let {sender,receive, amount, signature} = this.state;
        TransApi.createTransaction({ sender, receive, amount, signature }).then(({ newTran }) => customHistory.push("/")).catch(err => console.log(err));
    }

    handleSign = () => {
        let { sender, receive, amount, signature } = this.state;
        TransApi.signTransaction({ sender, receive, amount, signature }).then(({ signature }) => {
            this.setState({ signature})
        })
    }

    render() {
        let {sender, receive, amount, signature} = this.state;
        // console.log(this.state.sender);
        return (
            <MainLayout>
                <div className="create-transaction">
                    <label htmlFor="sender">Sender</label>
                    <input name="sender" type="text" value={sender} onChange={e => { this.setState({ sender: e.target.value }); }}/> 

                    <label htmlFor="receive">Receive</label>
                    <input name="receive" type="text" value={receive} onChange={e => { this.setState({ receive: e.target.value }); }} />

                    <label htmlFor="amount">Amount</label>
                    <input name="amount" type="number" value={amount} onChange={e => { this.setState({ amount: e.target.value }); }} />

                    <label htmlFor="signature">Signature</label>
                    <p className="signature">{signature}</p>

                    <button className="sign-part" onClick={this.handleSign}>
                        Sign
                    </button>
                    <button className="create-part" onClick={this.handleTransCreation}>
                        Create
                    </button>
                    
                </div>
            </MainLayout>
        );
    }
}

export default CreateTransactionRoute;