import { connect } from "react-redux";

import { View, StateProps, ActionProps } from "../../views/profile/studentProfileView"

import { AuthState } from "../../store/auth/reducer"

function mapStateToProps(state: any): StateProps {
    let auth: AuthState = state.auth
    return { 
        lastName: auth.lastName,
        firstName: auth.firstName,
        email: auth.email,
        group: auth.group,
        disciplines: auth.disciplines
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)