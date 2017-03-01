import { connect } from "react-redux"
import * as React from "react"

import { getText } from "../../utils"

import { StateProps, ActionProps, View } from "../../views/navigation/leftMenuView"

import { AuthState } from "../../store/auth/reducer"
import { auth } from "../../store/auth/actions"

function mapStateToProps(state: any, ownProps: any): any {
    let auth: AuthState = state.auth
    return { 
        state: auth.infoFetched ? "logged in, user info fetched" :
               auth.authentified ? "logged in" :
               auth.authentifying ? "logging in..." :
               "logged off",
        firstname: auth.firstName,
        lastname: auth.lastName,
        isAdmin: auth.admin,
        title: auth.isTeacher ? "teacher" : "student",
        group: auth.group
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return { 
        auth: (username, password, id) => dispatch(auth(id, username, password))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)((props, ctx) => {
    return <div>
        username: <input type="text" id="username"></input><br/>
        password: <input type="text" id="password"></input><br/>
        id: <input type="text" id="id"></input><br/>
        <button onClick={ () => {
            props.auth(getText("username"), getText("password"), parseInt(getText("id"))) 
        }}>
            log in!
        </button>
        <button onClick={ () => { props.auth("prof", "prof", 2)}}>log in as teacher(prof, prof, 2)</button>
        <button onClick={ () => { props.auth("eleve", "eleve", 3)}}>log in as student(eleve, eleve, 3)</button>
        state: { props.state } <br/>
        firstname: { props.firstname } <br/>
        lastname: { props.lastname } <br/>
        is admin: { props.isAdmin ? "yes" : "no" } <br/>
        title: { props.title } <br/>
        group: { props.group }
    </div>

})