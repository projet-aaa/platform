import { Action } from "../../utils/";
import { ActionTypes, APIActionTypes } from "./actions";
import { handleActions } from "redux-actions";

import { Session, SessionType } from "../../models/session"

export interface SessionState {
    sessions: Session[]
}

let initialState: SessionState = {
    sessions: []
}

const name = "sessions"
const reducer = handleActions({
    [APIActionTypes.FETCH_SESSIONS]: function(state: SessionState, action: any) {
        return state;
    },
    [APIActionTypes.FETCH_SESSIONS_FAILURE]: function(state: SessionState, action: any) {
        return state;
    },
    [APIActionTypes.FETCH_SESSIONS_SUCCESS]: function(state: SessionState, action: any) {

        var sessionList = [];

        for (var i=0; i<action.payload.length; i++) {
            var result = action.payload[i];
            var tempSessionList = result.fetchResult["hydra:member"];
            tempSessionList.map ( (item) => 
                {
                    item["lives"] = [];
                    item.sessionName = item.name;
                    delete item.name;
                    
                    item.sessionType = item.type;
                    delete item.type;

                    item.discipline = result.disciplineId;

                    item.updatedAt = new Date(item.updatedAt);
                }
            )
            sessionList = sessionList.concat(tempSessionList);
        }
        return Object.assign({}, state,{sessions: sessionList})
    }
}, initialState)

export default { [name]: reducer }