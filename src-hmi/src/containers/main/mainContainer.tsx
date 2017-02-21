import { connect } from "react-redux";
import * as _ from "underscore"

import { fetchOnUpdate, isAuthentified } from "../../utils"

import { StateProps, ActionProps, View } from "../../views/main/mainView"

import { fetchSessions } from "../../store/sessions/actions"
import { selectFilter, search } from "../../store/main/actions/actions"

import { AuthState } from "../../store/auth/reducer"

function mapStateToProps(state: any): StateProps {
    let auth: AuthState = state.auth
    return { 
        sessions: _.values(state.sessions.sessions)
                    .filter(session => !state.main.areNotChecked[session.discipline])
                    .sort((elt1, elt2) => elt2.date - elt1.date),
        disciplines: auth.disciplines.map(d => d.name),
        areNotChecked: state.main.areNotChecked
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchSessions: () => dispatch(fetchSessions(null)),
        selectFilter: (discipline) => dispatch(selectFilter(discipline)),
        search: () => dispatch(search())
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(fetchOnUpdate(
    (props) => {
        props.fetchSessions()
    }
) (View))