import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/navigation/topBandView"

import { AuthState } from "../../store/auth/reducer"

import { appName } from "../../models/consts"

function mapStateToProps(state: any): StateProps {
    let authInfo: AuthState = state.auth
    return {
        isAdmin: authInfo.admin,
        userFullName: authInfo.firstName != null ? authInfo.firstName + " " + authInfo.lastName : null,
        appName
    }
 }

function mapDispatchToProps(dispatch): ActionProps {
    return { }
 }

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)