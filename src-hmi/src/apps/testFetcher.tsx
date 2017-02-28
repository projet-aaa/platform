import * as React from "react"
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import { auth } from '../store/auth/actions'
import authInfo from '../store/auth/reducer'

import rootWrapper from "../wrappers/rootWrapper"
import { storeFactory } from '../utils'

import { fetchTest, fetchSessionQuiz, fetchDisciplinesSessions } from '../api/fetchs'

// STORE CREATION (DEFINITION OF THE GLOBAL STATE)
let store = storeFactory([
    authInfo
], true, auth)
    
// ROUTE
let MainRouter =
(<Provider store={ store }>
    <Router history={ hashHistory}>
        <Route path="/" component={ rootWrapper(
            (st => {return { }}),
            (dp => {return { }}),
            null,
            props => {
                fetchTest("a9b0e1d3-fac2-11e6-a6bf-0242ac110004", 
                obj => { console.log("test:", obj) },
                obj => { console.log(obj) })
                fetchSessionQuiz("a9b0d44d-fac2-11e6-a6bf-0242ac110004",
                obj => { console.log("session quiz:", obj) }, 
                obj => { console.log(obj) })
                fetchDisciplinesSessions(
                    ["Genie Logiciel et Systeme", "TOB"], 
                    ["a9b0b709-fac2-11e6-a6bf-0242ac110004", "a9b0c69e-fac2-11e6-a6bf-0242ac110004"],
                    obj => console.log("sessions:", obj),
                    obj => console.log(obj)
                )
            },
            (props, ctx) => <div>Un test</div>
        ) }/>
    </Router>
</Provider>)

// RENDER
ReactDOM.render(MainRouter, document.getElementById('main'))