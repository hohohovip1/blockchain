import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
export const customHistory = createBrowserHistory();
import {CreateTransactionRoute} from "./create-transaction-route/create-transaction-route";

export class MainRoute extends React.Component {
    constructor(props) {
        super(props);



    };



    render() {


        return (
            <div id="main-route">

                <Router
                    history={customHistory}
                >
                    <Switch>
                        {/* <Route exact path={"/"} component={ViewPoolRoute} /> */}
                        <Route exact path={"/"} component={CreateTransactionRoute} />
                        {/* <Route exact path={"/create-block"} component={CreateBlockRoute} /> */}
                        {/* <Route exact path={"/view-chain"} component={ViewChainRoute} /> */}
                    </Switch>
                </Router>

            </div>
        );
    }
}




