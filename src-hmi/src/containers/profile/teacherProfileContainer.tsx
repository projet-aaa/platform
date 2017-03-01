import { connect } from "react-redux";

import { View, StateProps, ActionProps } from "../../views/profile/teacherProfileView"

import { AuthState } from "../../store/auth/reducer"

function mapStateToProps(state: any): StateProps {
    let auth: AuthState = state.auth
    return { 
        lastName: auth.lastName,
        firstName: auth.firstName,
        password: auth.password,
        //email: auth.email,
        groups: auth.groups,
        disciplines: auth.disciplines.map(d => d.name)
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