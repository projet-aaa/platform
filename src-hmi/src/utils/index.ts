import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import * as createLogger from 'redux-logger';

import createSocketIoMiddleware from 'redux-socket.io'
import * as io from 'socket.io-client'

// -- ACTION CREATOR HELPERS
export interface Action<T>{
	type: string
	payload: T
    error?: boolean
}

// -- STORE CREATOR HELPER
export const storeFactory = (reducers: any[], url: string, log: boolean) => {
    let socket = io.connect(url),
        reducers2 = {}, len = reducers.length,
        reducer = null

    for(let i = 0; i < len; i++) {
        Object.assign(reducers2, reducers[i])
    }
	reducer = combineReducers(reducers2)

    let middlewares = [thunk]

    if(url) { middlewares.push(createSocketIoMiddleware(socket, 'SERVER/')) }
    if(log) { middlewares.push(createLogger()) }
    return createStore(
        reducer,
        applyMiddleware(...middlewares)
    )
}

// -- TEST HELPER
export function viewTestFactory<T>(View: any, props: T) {
    ReactDOM.render(React.createElement(View, props), document.getElementById('main'))
}