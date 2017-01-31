import { handleActions } from "redux-actions"

import { Action } from "../../../utils"

interface ScoreInfo {
   score: number
   rank: number
   highScore: number
   average: number
}

let initialState: ScoreInfo = {
   score: -1,
   rank: 1,
   highScore: -1,
   average: -1,
}

const name = "score"
const reducer = handleActions({
    ["jamais"]: function(state: ScoreInfo, action: Action<any>): ScoreInfo {
        return state
    }
}, initialState);

export default { [name]: reducer }