import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import todoInfo from '../../store/todo/reducers/todo'
import stuffInfo from '../../store/todo/reducers/stuff'
import App from '../../containers/todo/todoApp'
import Stuff from '../../views/todo/stuff'

import { storeFactory } from '../../utils'

let store = storeFactory([todoInfo, stuffInfo], "localhost:8000", true)

let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ App }>
        </Route> 
        <Route path="/stuff" component={Stuff} />
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))