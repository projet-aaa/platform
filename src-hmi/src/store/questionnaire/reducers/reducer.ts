// EXTERNAL IMPORTS
import { handleActions } from "redux-actions"

// INTERNAL IMPORTS
import { ActionTypes, APIActionTypes } from '../actions/actionTypes'
import { Quiz, QuizType, QuizLocalChoice, Test } from '../../../models/class/class'
import { modifyArrayElement, shuffle } from '../../../utils/index'

export interface QuestionnaireState {
    // all the quiz available for this session
    quizGroups: Test[]
    // the collection of quiz launched
    actualQuizs: Test
    // the index of the current quiz in the quiz collection "actualQuizs"
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
function fillTabChoice(actualQuizs: Test): QuizLocalChoice[] {
    let res = []
    for(var i=0 ; i<actualQuizs.quizs.length ; i++) {
        if (actualQuizs.quizs[i].type==QuizType.MCQ) {
            res[actualQuizs.quizs[i].id] = { quizId: actualQuizs.quizs[i].id, choice: -1}
        } else {
            res[actualQuizs.quizs[i].id] = ""
        }
    }
    return res
}

// Initialize the array areValidated
function fillTabValidated(actualQuizs: Test): QuizLocalChoice[] {
    let res = []
    for(var i = 0; i<actualQuizs.quizs.length ; i++) {
        res[actualQuizs.quizs[i].id] = false
    }
    return res
}

// compute the score after each validate action
function computeScore(actualQuizs: Test, quizChoices: QuizLocalChoice[]): number {
    let res = 0
    for(var i=0 ; i<actualQuizs.quizs.length ; i++) {
        if (quizChoices[actualQuizs.quizs[i].id].choice==actualQuizs.quizs[i].answer) {
            res = res + 1
        }
    }
    return res
}

let initialstate: QuestionnaireState = {
    quizGroups: [
        {
            id: "0",
            title: "group 0",
            quizs: [
                {
                    id: "0",
                    type: QuizType.MCQ,
                    title: "Question compilation",
                    question: "Parmi les langages suivants, lequel est compilé ?",
                    choices: ["javascript", "C++", "python"],
                    choiceIds: ["0", "1", "2"],
                    explanations: ["langage transformé en bytecode", "en effet", "interprété"],
                    justification: "ouaip",
                    answer: 1 // index of the right answer (begins at 0)
                },
                {
                    id: "1",
                    type: QuizType.MCQ,
                    title: "Question compilation2",
                    question: "Parmi les langages suivants, lequel est compilé 2?",
                    choices: ["javascript", "C++", "python"],
                    choiceIds: ["0", "1", "2"],
                    explanations: ["langage transformé en bytecode", "en effet", "interprété"],
                    justification: "ouaip",
                    answer: 1 // index of the right answer (begins at 0)
                },
                {
                    id: "2",
                    type: QuizType.MCQ,
                    title: "Question compilation3",
                    question: "Parmi les langages suivants, lequel est compilé 3?",
                    choices: ["javascript", "C++", "python"],
                    choiceIds: ["0", "1", "2"],
                    explanations: ["langage transformé en bytecode", "en effet", "interprété"],
                    justification: "ouaip",
                    answer: 1 // index of the right answer (begins at 0)
                }
            ]
        },
        {
            id: "1",
            title: "group 1",
            quizs: [
                {
                    id: "0",
                    type: QuizType.MCQ,
                    title: "Question compilation",
                    question: "Parmi les langages suivants, lequel est compilé ?",
                    choices: ["javascript", "C++", "python"],
                    choiceIds: ["0", "1", "2"],
                    explanations: ["langage transformé en bytecode", "en effet", "interprété"],
                    justification: "ouaip",
                    answer: 1 // index of the right answer (begins at 0)
                }
            ]
        },
        {
            id: "2",
            title: "group 2",
            quizs: [
                {
                    id: "0",
                    type: QuizType.MCQ,
                    title: "Question compilation",
                    question: "Parmi les langages suivants, lequel est compilé ?",
                    choices: ["javascript", "C++", "python"],
                    choiceIds: ["0", "1", "2"],
                    explanations: ["langage transformé en bytecode", "en effet", "interprété"],
                    justification: "ouaip",
                    answer: 1 // index of the right answer (begins at 0)
                },
                {
                    id: "1",
                    type: QuizType.TEXT,
                    title: "Question compilation2",
                    question: "Quelle est la meilleure ville du monde ?",
                    choices: [],
                    choiceIds: [],
                    explanations: [],
                    justification: "Chocolatines en force !!!",
                    answer: "Toulouse"
                }
            ]
        },
    ],
    actualQuizs: null,
    quizIndex: null,
    currentQuiz: null,
    quizChoices: [],
    quizMode: null,
    score: 0,
    areValidated: []
}

const name = "questionnaire"
const reducer = handleActions({
    [ActionTypes.CHOOSE]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        return Object.assign({}, state, {
            quizChoices: modifyArrayElement(state.quizChoices, state.currentQuiz.id, { quizId: state.currentQuiz.id, choice: action.payload.choice}),
            areValidated: modifyArrayElement(state.areValidated, state.currentQuiz.id, false)
        })
    },
    [ActionTypes.VALIDATE]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newIndex = state.quizIndex + 1
        // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.quizs.length]
        // doesn't exist so we don't change currentQuiz in that case
        let newCurrentQuizz
        if (state.quizIndex != state.actualQuizs.quizs.length-1) {
            newCurrentQuizz = state.actualQuizs.quizs[newIndex]
        } else {
            newCurrentQuizz = state.actualQuizs.quizs[state.quizIndex]
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
        // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.quizs.length]
        // doesn't exist so we don't change currentQuiz in that case
        let newCurrentQuizz
        if (state.quizIndex!=state.actualQuizs.quizs.length-1) {
            newCurrentQuizz = state.actualQuizs.quizs[newIndex]
        } else {
            newCurrentQuizz = state.actualQuizs.quizs[state.quizIndex]
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
        if(state.actualQuizs.quizs.length > 1 && state.quizIndex > 0) {
            let newIndex = state.quizIndex - 1
            let newCurrentQuizz = state.actualQuizs.quizs[newIndex]
            // if the quiz hasn't been validate, we reset the choice
            let newQuizChoice = state.quizChoices
            if (!state.areValidated[state.currentQuiz.id]) {
                newQuizChoice = modifyArrayElement(state.quizChoices,state.currentQuiz.id, { quizId: state.currentQuiz.id, choice: -1})
            }
            // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.quizs.length]
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
            currentQuiz: state.actualQuizs.quizs[newIndex],
            quizMode: "correction"
        })
    },
    [ActionTypes.CHOOSE_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newQuizs = state.quizGroups.find(q => q.id == action.payload.quizGroupId)
        return Object.assign({}, state, {
            actualQuizs: newQuizs,
            quizIndex: 0,
            currentQuiz: newQuizs.quizs[0],
            quizMode: action.payload.mode,
            score: 0,
            quizChoices: fillTabChoice(newQuizs),
            areValidated: fillTabValidated(newQuizs)
        })
    },
    [ActionTypes.RETURN_TO_CHOICES]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        return Object.assign({}, state, {
            currentQuiz: null
        })
    },
    [APIActionTypes.FETCH_TESTS_SUCCESS]: function(state: QuestionnaireState, action): QuestionnaireState {
        return Object.assign({}, state, {
            quizGroups: action.payload
        })
    }
}, initialstate);

export default { [name]: reducer }