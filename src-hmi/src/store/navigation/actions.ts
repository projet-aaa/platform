export const ActionTypes = {
    START_MAIN_LOAD: "NAVIGATION/START_MAIN_LOAD",
    END_MAIN_LOAD: "NAVIGATION/END_MAIN_LOAD",
    END_FIX_LOAD: "NAVIGATION/END_FIX_LOAD"
}

export function startMainLoad() {
    return {
        type: ActionTypes.START_MAIN_LOAD,
        payload: {}
    }
}

export function endMainLoad() {
    return {
        type: ActionTypes.END_MAIN_LOAD,
        payload: {}
    }
}

export function endFixLoad() {
    return {
        type: ActionTypes.END_FIX_LOAD,
        payload: {}
    }
}