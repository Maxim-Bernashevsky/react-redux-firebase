import React from 'react'
import {
    HashRouter as Router,
    Route,
    Link,
    browserHistory,
    Redirect,
    withRouter,
} from 'react-router-dom'
                                        // HASH HISTORY ??

// import Second from './Second'
import Main from './Main/Main'
import Room from '../containers/Room'



const Routing = () => (
    <Router history={browserHistory}>
            <div>
            <Route exact path="/" component={Main} />
            <Route path="/room" component={Room} />

            {/*<Route path="/calculate" component={Calculate} />*/}
            {/*<Route path="/first" component={First} />*/}
            {/*/!*<Redirect from="/first" to="/" />*!/*/}
            {/*/!*<Redirect from="/second" to="/" />*!/*/}
            {/*<Route path="/organisation" component={Organisation} />*/}
            {/*<Route path="/orderComplete" component={OrderComplete} />*/}

            {/*<Route path="/list_orders" component={ListOrders} />*/}
            {/*<Route path="/orders_templates" component={OrdersTemplates} />*/}
            {/*<Route path="/order_info" component={OrderInfo} />*/}
            {/*<Route path="/show_object" component={ShowObject} />*/}

            {/*<Route path="/*" component={MainPage} />*/}

        </div>
    </Router>
)

export default Routing
