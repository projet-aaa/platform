export const ActionTypes = {
    TO_PROFILE_EDITION: "PROFILE/TO_PROFILE_EDITION",
    TO_RENDER: "PROFILE/TO_RENDER",

    ON_GROUP_CHANGE: "PROFILE/ON_GROUP_CHANGE"
}

export function toProfileEdition(group: string) {
    return {
        type: ActionTypes.TO_PROFILE_EDITION,
        payload: { group }
    }
}

export function toRender(group: string) {
    return {
        type: ActionTypes.TO_RENDER,
        payload: { group }
    }
}

export function onGroupChange(group: string) {
    return {
        type: ActionTypes.ON_GROUP_CHANGE,
        payload: { group }
    }
}