import { connect } from "react-redux"

import { StateProps, ActionProps, View } from "../../views/navigation/leftMenuView"

import { AuthState } from "../../store/auth/reducer"

function mapStateToProps(state: any, ownProps: any): any {
    let auth: AuthState = state.auth
    return { 
        disciplines: auth.disciplines
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return { }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)