import { handleActions } from "redux-actions"

import { Action } from "../../../utils"

interface ScoreInfo {
   score: number
   rank: number
   population: number
   highScore: number
   average: number
}

let initialState: ScoreInfo = {
   score: 230,
   rank: 22,
   population: 24,
   highScore: 400,
   average: 200,
}

const name = "score"
const reducer = handleActions({
    ["jamais"]: function(state: ScoreInfo, action: Action<any>): ScoreInfo {
        return state
    }
}, initialState);

export default { [name]: reducer }