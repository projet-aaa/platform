import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { AuthState } from "../../store/auth/reducer"

import { View } from "../../views/profile/profileView"

function mapStateToProps(state: any): any {
    let authState: AuthState = state.auth
    return { 
        isTeacher: authState.isTeacher
    }
}
function mapDispatchToProps(dispatch): any {
    return { }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    null,
    View
)