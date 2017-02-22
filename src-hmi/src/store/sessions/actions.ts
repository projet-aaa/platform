import { createAPIActionCreator } from "../../utils"

export const ActionTypes = {
    
}

export const APIActionTypes = {
    FETCH_SESSIONS: "SESSION/FETCH_SESSIONS",
    FETCH_SESSIONS_SUCCESS: "SESSION/FETCH_SESSIONS_SUCCESS",
    FETCH_SESSIONS_FAILURE: "SESSION/FETCH_SESSIONS_FAILURE"
}

export const fetchSessions: (info: { }) => any
= createAPIActionCreator( 
    info => "/sessions", 
    null,
    'GET',
    APIActionTypes.FETCH_SESSIONS,
    APIActionTypes.FETCH_SESSIONS_SUCCESS,
    APIActionTypes.FETCH_SESSIONS_FAILURE
)

// export const fetchSessionsWithDiscipline: (info: {
//     disciplineIds: string[]
// }) => any
// = createAPIActionCreator(
//     info => "/sessions",
//     null,
//     'GET",
//     '
// )