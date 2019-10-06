import React from "react";
import  {MainLayout} from "../../layout/main-layout/main-layout";

export class CreateBlockRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash: "",
            preHash: "",
            rootHash: "",
            nonce: 0,
            transactions: []
        };
    }
    render(){
        return(
            <div className="create-block">
                <MainLayout>

                </MainLayout>
            </div>
        );
    }
}