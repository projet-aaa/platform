import { connect } from "react-redux";
import * as _ from "underscore"

import { fetchOnUpdate, isAuthentified } from "../../utils"

import { StateProps, ActionProps, View } from "../../views/main/mainView"

import { fetchSessions } from "../../store/sessions/actions"
import { selectFilter, search } from "../../store/main/actions/actions"

function mapStateToProps(state: any): StateProps {
    return { 
        sessions: _.values(state.sessions.sessions)
                    .filter(session => !state.main.areNotChecked[session.discipline])//goodDisciplines(session, getCheckedDisciplines(state.main.areChecked)))
                    .sort((elt1, elt2) => elt2.date - elt1.date),
        disciplines: state.auth.disciplines,
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
        // let i = setInterval(() => {
        //     console.log("trying!")
        //     if(isAuthentified()) {
                // console.log("authentified! ", (document as any).token)
        props.fetchSessions()
        //         clearInterval(i)
        //     }
        // }, 100)
    }
) (View))