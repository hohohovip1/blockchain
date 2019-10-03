import React from "react";
export class CreateTransactionRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sender: "",
            receive: "",
            amount: 0,
            signature: ""
        }
    };

    createTransaction(data){
    }



    render() {


        return (
            <div id="create-transaction">
                <label htmlFor="sender">Sender</label>
                <input name="sender" type="text" value={onChange()}/>

            </div>
        );
    }
}