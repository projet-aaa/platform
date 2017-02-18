import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import remoteInfo from '../../store/remote/reducers/reducer'
import dashboardInfo from '../../store/dashboard/reducers/reducer'
import WSRoomInfo from '../../store/wsrooms/reducer'
import sessionQuizInfo from '../../store/sessionQuiz/reducer'

import SessionQuizContainer from '../../containers/sessionQuiz/sessionQuizContainer'

import { storeFactory } from '../../utils'

let store = storeFactory([
    remoteInfo, dashboardInfo, WSRoomInfo, sessionQuizInfo
], true, true)

let MainRouter =
(<Provider store={ store }>
    <Router history={ hashHistory }>
        <Route path="/presentation" component={ SessionQuizContainer }/>
        <Route path="/dashboard" component={ SessionQuizContainer }/>
        <Route path="/remote" component={ SessionQuizContainer }/>
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))