import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import { View as TemplateView } from '../../template/templateTemp'
import { View as ContentView } from '../../template/templateContentView'

import { storeFactory } from '../../utils'

let store = storeFactory([], true, true)

let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ TemplateView }>
            <IndexRoute component={ ContentView }/>
        </Route>   
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))