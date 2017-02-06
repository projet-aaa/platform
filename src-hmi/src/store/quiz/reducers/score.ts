// Score REDUCER
// Manages the state of a user scores

// EXTERNAL IMPORTS
import { handleActions } from "redux-actions"

// INTERNAL IMPORTS
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
    // we have to put a fake action
    ["never"]: function(state: ScoreInfo, action: Action<any>): ScoreInfo {
        return state
    }
}, initialState);

export default { [name]: reducer }