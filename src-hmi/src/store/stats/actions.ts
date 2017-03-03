export const ActionTypes = {
    CHOOSE_QUIZ: "STATS/CHOOSE_QUIZ"
}

export const APIActionTypes = {
    FETCH_STATS_SUCCESS: "STATS/FETCH_STATS_SUCCESS"
}

export function chooseQuiz(quizId: string) {
    return {
        type: ActionTypes.CHOOSE_QUIZ,
        payload: { quizId }
    }
}

export function fetchStatsSuccess(res) {
    return {
        type: APIActionTypes.FETCH_STATS_SUCCESS,
        payload: res
    }
}