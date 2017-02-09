import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import threadContentInfo from '../../store/faq/reducers/threadContent'

import App from '../../containers/faq/faqContainer'

import { storeFactory } from '../../utils'

let store = storeFactory([
    threadContentInfo
], true, true)


let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ App }>
        </Route> 
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))