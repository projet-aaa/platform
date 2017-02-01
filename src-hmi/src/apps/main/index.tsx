import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import quizInfo from '../../store/quiz/reducers/quiz'
import remoteInfo from '../../store/quiz/reducers/remote'
import scoreInfo from '../../store/quiz/reducers/score'
import feedbackInfo from '../../store/quiz/reducers/feedback'
import App from '../../containers/quiz/remoteContainer'

import { storeFactory } from '../../utils'

let store = storeFactory([quizInfo, remoteInfo, scoreInfo, feedbackInfo], "localhost:8000", true)

let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ App }>
        </Route> 
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))