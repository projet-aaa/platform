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
                    .sort((elt1, elt2) => elt2.updatedAt - elt1.updatedAt),
        disciplines: auth.disciplines,
        areNotChecked: state.main.areNotChecked
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSessions: (disciplines) => dispatch(fetchSessions(disciplines)),
        selectFilter: (discipline) => dispatch(selectFilter(discipline)),
        search: () => dispatch(search())
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    props => { props.fetchSessions(props.disciplines)},
    View
)