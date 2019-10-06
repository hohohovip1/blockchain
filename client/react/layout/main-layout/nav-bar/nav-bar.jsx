import React from "react";
import classnames from "classnames";
import {customHistory} from "../../../routes/routes";

export class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
        console.log(customHistory);
    };
        navs = [
            {
                label: "Create transaction",
                url:"/create-transaction"
            },
            {
                label: "Create block",
                url:"/create-block"
            },
            {
                label: "View pool",
                url: "/"
            },
            {
                label: "View Chain",
                url: "/view-chain"
            }
        ];
  

    render(){
        return(
            <div className="nav-bar">
                <div className="brand">Blockchain</div>
                <div className="navs">
                    {
                        this.navs.map((each) => {
                            return(
                                <div className={classnames("each-nav", {active: each.url === customHistory.location.pathname})}
                                    onClick={() => customHistory.push(each.url)}
                                    key={each.url}
                                >
                                {each.label}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}