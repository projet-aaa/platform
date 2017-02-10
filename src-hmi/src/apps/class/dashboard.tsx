import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import dashboardInfo from '../../store/dashboard/reducers/reducer'

import dashboardApp from '../../containers/dashboard/dashboardContainer'

import { storeFactory } from '../../utils'

let store = storeFactory([
    dashboardInfo
], true, true)


let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ dashboardApp }>
        </Route> 
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))