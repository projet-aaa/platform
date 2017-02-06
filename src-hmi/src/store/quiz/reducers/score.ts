import { handleActions } from "redux-actions"

import { Action } from "../../../utils"

interface ClassInfo {
   score: number
   rank: number
   population: number
   highScore: number
   maxScore: number
   average: number
}

let initialState: ClassInfo = {
   score: 230,
   rank: 22,
   population: 24,
   highScore: 400,
   maxScore: 500,
   average: 200,
}

const name = "score"
const reducer = handleActions({
    ["jamais"]: function(state: ClassInfo, action: Action<any>): ClassInfo {
        return state
    }
}, initialState);

export default { [name]: reducer }