// EXTERNAL IMPORTS
import { handleActions } from "redux-actions"

// INTERNAL IMPORTS
import { ActionTypes } from '../actions/actionTypes'
import { Quiz, QuizType, QuizLocalChoice } from '../../../models/class/class'
import { modifyArrayElement, getQuizFromList, shuffle } from '../../../utils/index'

export interface QuestionnaireState {
    // all the quiz available for this session
    quizs: Quiz[]
    // the collection of quiz launched
    actualQuizs: Quiz[]
    // the id of the current quiz in the quiz collection "actualQuizs"
    quizIndex: number
    // actual quiz
    currentQuiz: Quiz
    // the list of choices for each quiz
    quizChoices: QuizLocalChoice[]
    // the mode of quiz consultation (answer or correction)
    quizMode: string
    // the user score
    score: number
    // for each quiz, true if the quiz has been validated
    areValidated: boolean[]
}

// Initialize the array quizChoices
function fillTabChoice(actualQuizs: Quiz[]): QuizLocalChoice[] {
    let res = []
    for(var i=0 ; i<actualQuizs.length ; i++) {
        res[actualQuizs[i].id] = { quizId: actualQuizs[i].id, choice: -1}
    }
    return res
}

// Initialize the array areValidated
function fillTabValidated(actualQuizs: Quiz[]): QuizLocalChoice[] {
    let res = []
    for(var i=0 ; i<actualQuizs.length ; i++) {
        res[actualQuizs[i].id] = false
    }
    return res
}

// compute the score after each validate action
function computeScore(actualQuizs: Quiz[], quizChoices: QuizLocalChoice[]): number {
    let res = 0
    for(var i=0 ; i<actualQuizs.length ; i++) {
        if (quizChoices[actualQuizs[i].id].choice==actualQuizs[i].answer) {
            res = res + 1
        }
    }
    return res
}

let initialstate: QuestionnaireState = {
    quizs: [
        {
            id: 0,
            type: QuizType.MCQ,
            title: "Question compilation",
            question: "Parmi les langages suivants, lequel est compilé ?",
            choices: ["javascript", "C++", "python"],
            explanations: ["langage transformé en bytecode", "en effet", "interprété"],
            answer: 1 // index of the right answer (begins at 0)
        },
        {
            id: 1,
            type: QuizType.MCQ,
            title: "Question compilation2",
            question: "Parmi les langages suivants, lequel est compilé 2?",
            choices: ["javascript", "C++", "python"],
            explanations: ["langage transformé en bytecode", "en effet", "interprété"],
            answer: 1 // index of the right answer (begins at 0)
        },
        {
            id: 2,
            type: QuizType.MCQ,
            title: "Question compilation3",
            question: "Parmi les langages suivants, lequel est compilé 3?",
            choices: ["javascript", "C++", "python"],
            explanations: ["langage transformé en bytecode", "en effet", "interprété"],
            answer: 1 // index of the right answer (begins at 0)
        }
    ],
    actualQuizs: [],
    quizIndex: -1,
    currentQuiz: null,
    quizChoices: [
        {
            quizId: 0,
            choice: -1
        },
        {
            quizId: 1,
            choice: -1
        },
        {
            quizId: 2,
            choice: -1
        }
    ],
    quizMode: null,
    score: 0,
    areValidated: [false, false, false]
}

const name = "questionnaire"
const reducer = handleActions({
    [ActionTypes.CHOOSE]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        return Object.assign({}, state, {
            quizChoices: modifyArrayElement(state.quizChoices,state.currentQuiz.id, { quizId: state.currentQuiz.id, choice: action.payload.choice}),
            areValidated: modifyArrayElement(state.areValidated,state.currentQuiz.id, false)
        })
    },
    [ActionTypes.VALIDATE]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newIndex = state.quizIndex + 1
        // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.length]
        // doesn't exist so we don't change currentQuiz in that case
        let newCurrentQuizz
        if (state.quizIndex!=state.actualQuizs.length-1) {
            newCurrentQuizz = state.actualQuizs[newIndex]
        } else {
            newCurrentQuizz = state.actualQuizs[state.quizIndex]
        }
        return Object.assign({}, state, {
            score: computeScore(state.actualQuizs,state.quizChoices),
            quizIndex: newIndex,
            currentQuiz: newCurrentQuizz,
            areValidated: modifyArrayElement(state.areValidated,state.currentQuiz.id, true)
        })
    },
    [ActionTypes.NEXT_CONSUL_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newIndex = state.quizIndex + 1
        // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.length]
        // doesn't exist so we don't change currentQuiz in that case
        let newCurrentQuizz
        if (state.quizIndex!=state.actualQuizs.length-1) {
            newCurrentQuizz = state.actualQuizs[newIndex]
        } else {
            newCurrentQuizz = state.actualQuizs[state.quizIndex]
        }
        // if the quiz hasn't been validate, we reset the choice
        let newQuizChoice = state.quizChoices
        if (!state.areValidated[state.currentQuiz.id]) {
            newQuizChoice = modifyArrayElement(state.quizChoices,state.currentQuiz.id, { quizId: state.currentQuiz.id, choice: -1})
        }
        return Object.assign({}, state, {
            quizIndex: newIndex,
            currentQuiz: newCurrentQuizz,
            quizChoices: newQuizChoice
        })
    },
    [ActionTypes.PREV_CONSUL_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        if(state.actualQuizs.length > 1 && state.quizIndex > 0) {
            let newIndex = state.quizIndex - 1
            let newCurrentQuizz = state.actualQuizs[newIndex]
            // if the quiz hasn't been validate, we reset the choice
            let newQuizChoice = state.quizChoices
            if (!state.areValidated[state.currentQuiz.id]) {
                newQuizChoice = modifyArrayElement(state.quizChoices,state.currentQuiz.id, { quizId: state.currentQuiz.id, choice: -1})
            }
            // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.length]
            // doesn't exist so we don't change currentQuiz in that case
            return Object.assign({}, state, {
                quizIndex: newIndex,
                currentQuiz: newCurrentQuizz,
                quizChoices: newQuizChoice
            })
        } else {
            return state
        }
    },
    [ActionTypes.SEE_CORRECTION]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newIndex = 0
        return Object.assign({}, state, {
            quizIndex: newIndex,
            currentQuiz: state.actualQuizs[newIndex],
            quizMode: "correction"
        })
    },
    [ActionTypes.CHOOSE_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newQuiz = getQuizFromList(state.quizs,action.payload.quizId)
        return Object.assign({}, state, {
            actualQuizs: [newQuiz],
            quizIndex: 0,
            currentQuiz: newQuiz,
            quizMode: action.payload.mode,
            score: 0,
            quizChoices: fillTabChoice([newQuiz]),
            areValidated: fillTabValidated([newQuiz])
        })
    },
    [ActionTypes.CHOOSE_COMBOQUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let aux = state.quizs.slice()
        let newActualQuizs = shuffle(aux)
        return Object.assign({}, state, {
            actualQuizs: newActualQuizs,
            quizIndex: 0,
            currentQuiz: newActualQuizs[0],
            quizMode: "answer",
            score: 0,
            quizChoices: fillTabChoice(newActualQuizs),
            areValidated: fillTabValidated(newActualQuizs)
        })
    }
}, initialstate);

export default { [name]: reducer }