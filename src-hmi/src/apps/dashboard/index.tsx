import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import quizStatsArrayInfo from '../../store/dashboard/reducers/quizStatsArray'
import feedbackStateInfo from '../../store/dashboard/reducers/feedbackState'

import App from '../../containers/dashboard/dashboardContainer'

import { storeFactory } from '../../utils'

let store = storeFactory([quizStatsArrayInfo, feedbackStateInfo], "localhost:8000", true)


let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ App }>
        </Route> 
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))