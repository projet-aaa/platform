import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import questionnaireInfo from '../../store/questionnaire/reducers/reducer'
import QuestionnaireContainer from '../../containers/questionnaire/questionnaireContainer'

import { storeFactory } from '../../utils'

let store = storeFactory([
    questionnaireInfo
], true, true)

let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ QuestionnaireContainer }>
        </Route> 
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))