export const ActionTypes = {
    // STUDENT
    CHOOSE: "QUIZ/CHOOSE",

    // TEACHER
    SHOW_FEEDBACK: "QUIZ/SHOW_FEEDBACK"
}

export const APIActionTypes = {
    // STUDENT
    ANSWER: "QUIZ/ANSWER",
    ANSWER_SUCCESS: "QUIZ/ANSWER_SUCCESS",
    ANSWER_FAILURE: "QUIZ/ANSWER_FAILURE",

    SIGNAL_STATE: "QUIZ/SIGNAL_STATE",
    SIGNAL_STATE_SUCCESS: "QUIZ/SIGNAL_STATE_SUCCESS",
    SIGNAL_STATE_FAILURE: "QUIZ/SIGNAL_STATE_FAILURE",

    COMMENT: "QUIZ/COMMENT",
    COMMENT_SUCCESS: "QUIZ/COMMENT_SUCCESS",
    COMMENT_FAILURE: "QUIZ/COMMENT_FAILURE",

    // TEACHER
    START_QUIZ: "QUIZ/START_QUIZ",
    START_QUIZ_SUCCESS: "QUIZ/START_QUIZ_SUCESS",
    START_QUIZ_FAILURE: "QUIZ/START_QUIZ_FAILURE",

    END_QUIZ: "QUIZ/END_QUIZ",
    END_QUIZ_SUCCESS: "QUIZ/END_QUIZ_SUCCESS",
    END_QUIZ_FAILURE: "QUIZ/END_QUIZ_FAILURE"
}

export interface ChooseAction {
    id: number
    choice: any
}

export interface AnswerAction {
    id: number
    choice: any
}

// 0: panic
// 1: slow
// 2: fast
export interface SignalAction {
    type: number
}