import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import remoteInfo from '../../store/remote/reducers/reducer'
import { View as RemoteAppView } from '../../views/quiz/remoteView'

import { storeFactory, createAPIActionCreator, isAuthentified } from '../../utils'

let store = storeFactory([
    remoteInfo
], true, true)

let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ RemoteAppView }>
        </Route> 
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))