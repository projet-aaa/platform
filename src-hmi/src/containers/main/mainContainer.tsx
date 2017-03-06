import { connect } from "react-redux"
import * as _ from "underscore"

import rootWrapper from "../../wrappers/rootWrapper"
import { isAuthentified } from "../../utils"

import { StateProps, ActionProps, View } from "../../views/main/mainView"

import { fetchSessions } from "../../store/sessions/actions"
import { selectFilter, search } from "../../store/main/actions/actions"

import { AuthState } from "../../store/auth/reducer"

function mapStateToProps(state): StateProps {
    let auth: AuthState = state.auth
    return { 
        sessions: _.values(state.sessions.sessions)
                    .filter(session => !state.main.areNotChecked[session.discipline])
                    .filter(session => (session.sessionName.toLowerCase().indexOf(state.main.searchedString.toLowerCase())!=-1))
                    .sort((elt1, elt2) => elt2.date - elt1.date),
        disciplines: auth.disciplines,
        areNotChecked: state.main.areNotChecked,
        searchedString: state.main.searchedString,
        showList: (!auth.isTeacher && auth.group != null) 
               || (auth.isTeacher && auth.disciplines != null && auth.disciplines.length > 0),
        isTeacher: auth.isTeacher
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSessions: (disciplines) => dispatch(fetchSessions(disciplines)),
        selectFilter: (discipline) => dispatch(selectFilter(discipline)),
        search: (searchedString) => dispatch(search(searchedString))
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    (props, d) => { 
        props.fetchSessions(props.disciplines)
        d()
    },
    null,
    View
)