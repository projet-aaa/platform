export const ActionTypes = {
    LAUNCH: "DASHBOARD/LAUNCH",
    UPDATEFEEDBACK: "DASHBOARD/UPDATEFEEDBACK"
}

export interface LaunchAction {
    id: number
}


// 0: panic
// 1: slow
// 2: fast
export interface UpdateFeedbackAction {
    type: number
    alertOn: boolean
}