import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import * as createLogger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware'
import { CALL_API } from 'redux-api-middleware';

import createSocketIoMiddleware from 'redux-socket.io'
import * as io from 'socket.io-client'
    
import authInfo from '../store/auth/reducer'
import { auth, authWS } from '../store/auth/actions'

import { urlWS, chartColors, apiRootURL } from '../models/consts'

import { Quiz } from '../models/class/class'

// -- ACTION CREATOR HELPERS
export interface Action<T>{
	type: string
	payload: T
    error?: boolean
}

// -- STORE CREATOR HELPER
export const storeFactory = (reducers: any[], connectWS: boolean, log: boolean) => {
    let socket = connectWS ? io.connect(urlWS) : null,
        reducers2 = Object.assign({}, authInfo), len = reducers.length,
        reducer

    // CREATING MAIN REDUCER
    for(let i = 0; i < len; i++) {
        Object.assign(reducers2, reducers[i])
    }
	reducer = combineReducers(reducers2)

    // GENERATING
    let middlewares = [thunk]

    middlewares.push(apiMiddleware)
    if(socket) { middlewares.push(createSocketIoMiddleware(socket, 'SERVER/')) }
    if(log) { middlewares.push(createLogger()) }

    let store = createStore(
        reducer,
        applyMiddleware(...middlewares)
    );

    // MANUAL AUTHENTIFICATION
    // (store as any).dispatch(auth('abeyet', 'abeyet'))

    // let i = setInterval(() => {
    //     if(isAuthentified()) {
    //         (store as any).dispatch(authWS(0, 'abeyet', false))
    //         clearInterval(i)
    //     }
    // }, 500)

    return store
}

// -- TEST HELPER
export function viewTestFactory<T>(View: any, props: T) {
    ReactDOM.render(React.createElement(View, props), document.getElementById('main'))
}

export function apiTestFactory<T>(actionCreator, endpointInfo, body) {
    let store = storeFactory([ 
        authInfo
    ], true, true)

    let i = setInterval(() => {
        if(isAuthentified()) {
            store.dispatch(actionCreator(endpointInfo, body))
            clearInterval(i)
        }
    }, 100)
}

// Get text from an element with a certain id
export function getText(id: string): string {
    return (document.getElementById(id) as any).value
}

// Get value from a combobox with a certain id
export function getCbValue(id: string): string {
    var elt = (document.getElementById(id) as any)
    return elt.options[elt.selectedIndex].value
}

// -- API ACTION CREATOR FACTORY
export function createAPIActionCreator(
    endpointFactory:(obj: any) => string, 
    bodyFactory: (obj: any) => any, 
    method: string, 
    action: string, success: string, failure: string): (obj: any) => any {
    return (info) => {
        let actionObj = {
            [CALL_API]: {
                endpoint: apiRootURL + endpointFactory(info),
                method: method,
                types: [
                    action, 
                    success, 
                    failure
                ]
            }
        }

        if(bodyFactory) { 
            (actionObj as any)[CALL_API].body = JSON.stringify(bodyFactory(info)) 
        }

        if((document as any).token) { 
            (actionObj as any)[CALL_API].headers = {
                'Authorization': 'Bearer ' + (document as any).token
            }
        }

        return actionObj
    }
}

export function isAuthentified(): boolean { 
    return (document as any).token != null
}

// -- CALCUL DE DONNEES DE GRAPHE (POUR CHART.JS)
export function calculateQuizData(stats: any) {
    let choices = [],
        percentages = []
    for(var k in stats) {
        choices.push(k)
        percentages.push(stats[k])
    }

    let len = choices.length

    return {
        labels: choices,
        datasets: [
            {
                data: percentages,
                backgroundColor: chartColors.slice(0, len),
                hoverBackgroundColor: chartColors.slice(0, len)
            }
        ]
    }
}

// display a date with the format dd/mm/yyyy
export function ddmmyyyy(date: Date): string {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return (dd>9 ? '' : '0') + dd + '/' + 
            (mm>9 ? '' : '0') + mm + '/' +
            date.getFullYear()
}

// modify the value of the ith element of an array
export function modifyArrayElement(array: any[], id: string, value: any): any[] {
    let res = array.slice()
    res[id] = value
    return res
}

// randomize an array
export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}