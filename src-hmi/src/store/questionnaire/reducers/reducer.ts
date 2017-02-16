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
    // the list of choice for each quiz
    quizChoice: QuizLocalChoice[]
    // the mode of quiz consultation (answer or correction)
    quizMode: string
    // the user score
    score: number
}

function fillTabChoice(quizs: Quiz[]): QuizLocalChoice[] {
    let res = []
    for(var i=0; i<quizs.length ; i++) {
        res[i] = { quizId: quizs[i].id, choice: -1}
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
    quizChoice: [
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
    score: 0
}

const name = "questionnaire"
const reducer = handleActions({
    [ActionTypes.CHOOSE]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        console.log("reducer choose")
        return Object.assign({}, state, {
            quizChoice: modifyArrayElement(state.quizChoice,state.quizIndex, action.payload.choice)
        })
    },
    [ActionTypes.VALIDATE]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        console.log("reducer validate")
        let newIndex = state.quizIndex + 1
        // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.length]
        // doesn't exist so we don't change currentQuiz in that case
        let newCurrentQuizz = state.actualQuizs[state.quizIndex]
        if (state.quizIndex!=state.actualQuizs.length-1) {
            newCurrentQuizz = state.actualQuizs[newIndex]
        }
        return Object.assign({}, state, {
            score: (state.quizChoice[state.currentQuiz.id].choice==state.currentQuiz.answer) ? state.score+1 : state.score,
            quizIndex: newIndex,
            currentQuiz: newCurrentQuizz
        })
    },
    [ActionTypes.NEXT_CONSUL_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        console.log("reducer next")
        let len = state.actualQuizs.length
        if(len > 0 && state.quizIndex < len) {
            let newIndex = state.quizIndex + 1
            // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.length]
            // doesn't exist so we don't change currentQuiz in that case
            let newCurrentQuizz = state.actualQuizs[state.quizIndex]
            if (state.quizIndex!=state.actualQuizs.length-1) {
                newCurrentQuizz = state.actualQuizs[newIndex]
            }
            return Object.assign({}, state, {
                quizIndex: newIndex,
                currentQuiz: newCurrentQuizz
            })
        } else {
            return state
        }
    },
    [ActionTypes.PREV_CONSUL_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        console.log("reducer prev")
        if(state.actualQuizs.length > 0 && state.quizIndex > 0) {
            let newIndex = state.quizIndex - 1
            // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.length]
            // doesn't exist so we don't change currentQuiz in that case
            let newCurrentQuizz = state.actualQuizs[state.quizIndex]
            if (state.quizIndex!=state.actualQuizs.length) {
                newCurrentQuizz = state.actualQuizs[newIndex]
            }
            return Object.assign({}, state, {
                quizIndex: newIndex,
                currentQuiz: newCurrentQuizz
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
            quizChoice: fillTabChoice([newQuiz])
        })
    },
    [ActionTypes.CHOOSE_COMBOQUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newActualQuizs = shuffle(state.quizs)
        return Object.assign({}, state, {
            actualQuizs: newActualQuizs,
            quizIndex: 0,
            currentQuiz: newActualQuizs[0],
            quizMode: "answer",
            score: 0,
            quizChoice: fillTabChoice(newActualQuizs)
        })
    }
}, initialstate);

export default { [name]: reducer }