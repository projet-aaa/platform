import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import * as createLogger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware'
import { CALL_API } from 'redux-api-middleware';
import createSocketIoMiddleware from 'redux-socket.io'
import * as io from 'socket.io-client'
import * as fetch from 'isomorphic-fetch'

import { urlWS, chartColors, apiRootURL } from '../models/consts'

import { Quiz } from '../models/class/class'

declare var username_global
declare var password_global
declare var id_global

// -- ACTION CREATOR HELPERS
export interface Action<T>{
	type: string
	payload: T
    error?: boolean
}

// -- STORE CREATOR HELPER
export const storeFactory = (reducers: any[], connectWS: boolean, log: boolean, auth) => {
    let socket = connectWS ? io.connect(urlWS) : null,
        reducers2 = {}, len = reducers.length,
        reducer

    // CREATING MAIN REDUCER
    for(let i = 0; i < len; i++) {
        Object.assign(reducers2, reducers[i])
    }
	reducer = combineReducers(reducers2)

    // GENERATING
    let middlewares: any = [thunk]

    middlewares.push(apiMiddleware)
    middlewares.push(authAPIMiddleware(auth))
    if(socket) { middlewares.push(createSocketIoMiddleware(socket, 'SERVER/')) }
    if(log) { middlewares.push(createLogger()) }

    let store = createStore(
        reducer,
        applyMiddleware(...middlewares)
    )

    return store
}

// -- TEST HELPERS
export function viewTestFactory<T>(View: any, props: T) {
    ReactDOM.render(React.createElement(View, props), document.getElementById('main'))
}

// WARNING OBSOLETE, DO NOT USE 
//export function apiTestFactory<T>(actionCreator, endpointInfo, body) {
//     let store = storeFactory([ 
//         authInfo
//     ], true, true, null)

//     let i = setInterval(() => {
//         if(isAuthentified()) {
//             store.dispatch(actionCreator(endpointInfo, body))
//             clearInterval(i)
//         }
//     }, 100)
// }

// -- HTML JS HELPERS
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
const apiCallText = "API_CALL",
    apiCallSuccessText = "API_CALL_SUCCESS",
    apiCallFailureText = "API_CALL_FAILURE"

let apiCallID = 0,
    apiCalls = {},
    waitingAuthAPICalls = [],
    waitingAuth = false

export function createAPIActionCreator(
    endpointFactory:(obj: any) => string, 
    bodyFactory: (obj: any) => any, 
    method: string, 
    action: string, success: string, failure: string
): (obj: any, successPromise?) => any {
    return (info, successPromise) => {
        let id = apiCallID++

        let actionObj: any = {
            [CALL_API]: {
                endpoint: apiRootURL + endpointFactory(info),
                method: method,
                types: [
                    action, 
                    apiCallSuccessText + id, 
                    apiCallFailureText + id
                ]
            }
        }

        if(bodyFactory) { 
            actionObj[CALL_API].body = JSON.stringify(bodyFactory(info)) 
        }

        actionObj[CALL_API].headers = {
            'Authorization': 'Bearer ' + (document as any).token
        }

        apiCalls[id] = {
            msg: actionObj,
            successType: success,
            failureType: failure,
            successPromise
        }

        return actionObj
    }
}

export function fetcher(url, method?, obj?) {
    let res: any = {
        headers: {
            Authorization: 'Bearer ' + (document as any).token
        }
    }
    if(method) {
        res.method = method
    }
    if(obj) {
        res.body = JSON.stringify(obj)
    }
    return fetch(apiRootURL + url, res).then(res => res.json())
}

export const authAPIMiddleware = auth => store => next => action => {
    if(action.type && action.type.substring(0, apiCallText.length) == apiCallText) {
        if(action.type.substring(0, apiCallSuccessText.length) == apiCallSuccessText) {
            let index = parseInt(action.type.substring(apiCallSuccessText.length)),
                apiCall = apiCalls[index]

            store.dispatch({
                type: apiCall.successType,
                payload: action.payload
            })

            if(apiCall.successPromise) {
                apiCall.successPromise(action)
            }
        } else if(action.type.substring(0, apiCallFailureText.length) == apiCallFailureText) {
            let index = parseInt(action.type.substring(apiCallFailureText.length))

            if(action.payload.status == 401) {
                waitingAuthAPICalls.push(apiCalls[index].msg)
                let authState = store.getState().auth,
                    interval = Date.now() - authState.lastAuthDate

                if(authState.authentified && interval > 10000 && !authState.authentifying) {
                    store.dispatch(auth(id_global, username_global, password_global))
                }
                if(!waitingAuth) {
                    waitingAuth = true

                    let i = setInterval(() => {
                        if(isAuthentified()) {
                            waitingAuth = false
                            clearInterval(i)
                            for(let apiMsg of waitingAuthAPICalls) {
                                apiMsg[CALL_API].headers = {
                                    'Authorization': 'Bearer ' + (document as any).token
                                }
                                store.dispatch(apiMsg)
                            }
                            waitingAuthAPICalls = []
                        }
                    }, 100)
                }
            }
            
            store.dispatch({
                type: apiCalls[index].failureType,
                payload: action.payload
            })
        }
    } else {
        next(action)
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