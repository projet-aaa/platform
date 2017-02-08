import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import remoteInfo from '../../store/remote/reducers/reducer'
import remoteApp from '../../containers/remote/remoteContainer'

import { storeFactory } from '../../utils'

let store = storeFactory([
    remoteInfo
], true, true)

let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ remoteApp }>
        </Route> 
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))