export const ActionTypes = {
    CHANGE_APP_TYPE: "CHANGE_APP_TYPE"
}

export function changeApp(type: string) {
    return {
        type: ActionTypes.CHANGE_APP_TYPE,
        payload: { type }
    }
}