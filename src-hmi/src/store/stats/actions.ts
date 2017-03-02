export const ActionTypes = {

}

export const APIActionTypes = {
    FETCH_STATS_SUCCESS: "STATS/FETCH_STATS_SUCCESS"
}

export function fetchStatsSuccess(res) {
    return {
        type: APIActionTypes.FETCH_STATS_SUCCESS,
        payload: res
    }
}