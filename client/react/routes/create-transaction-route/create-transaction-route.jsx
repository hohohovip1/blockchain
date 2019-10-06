import React from "react";
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

    handleTransCreation(){
        
    }
    render() {
        let {sender, receive, amount, signature} = this.state;
        console.log(this.state.sender);
        return (
            <div className="create-transaction">
                <div className="form-part">
                    <label htmlFor="sender">Sender</label>
                    <input name="sender" type="text" value={sender} onChange={e => { this.setState({ sender: e.target.value }); }} />
                </div>
                <div className="form-part">
                    <label htmlFor="receive">Receive</label>
                    <input name="receive" type="text" value={receive} onChange={e => { this.setState({ receive: e.target.value }); }} />
                </div>
                <div className="form-part">
                    <label htmlFor="amount">Amount</label>
                    <input name="amount" type="text" value={amount} onChange={e => { this.setState({ amount: e.target.value }); }} />
                </div>
                <div className="form-part">
                    <label htmlFor="signature">Signature</label>
                    <input name="signature" type="text" value={signature} onChange={e => { this.setState({ signature: e.target.value }); }} />
                </div>
                <div className="submit-part">
                    <button onClick={()=>handleTransCreation}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default CreateTransactionRoute;