import { connect } from "react-redux";

import { View, StateProps, ActionProps } from "../../views/profile/studentProfileView"

import { updateProfile } from "../../store/auth/actions"
import { toRender, toProfileEdition, onGroupChange } from "../../store/profile/actions"

import { AuthState } from "../../store/auth/reducer"
import { ProfileState } from "../../store/profile/reducer"

function mapStateToProps(state): StateProps {
    let auth: AuthState = state.auth,
        profile: ProfileState = state.profile

    return { 
        lastName: auth.lastName,
        firstName: auth.firstName,
        password: auth.password,
        //email: auth.email,
        group: auth.group,
        disciplines: auth.disciplines.map(d => d.name),

        edition: profile.edition,
        groupCache: profile.groupCache
    }
}
function mapDispatchToProps(dispatch) {
    return {
        toShow: (group) => { 
            dispatch(updateProfile(group))
            dispatch(toRender(group)) 
        },
        toEdition: (group) => dispatch(toProfileEdition(group)),

        onGroupChange: (group) => dispatch(onGroupChange(group))
    }
}

function mergeProps(sp, dp, op) {
    return Object.assign(sp, dp, op, {
        toShow: () => dp.toShow(sp.groupCache),
        toEdition: () => dp.toEdition(sp.group)
    })
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps,
    mergeProps
)(View)