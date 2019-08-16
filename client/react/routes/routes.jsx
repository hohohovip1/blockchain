import React from "react";


export class MainRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        console.log(process.env.STATIC_DIR)
        return(
            <div id="main-route">
            </div>
        );
    }
}