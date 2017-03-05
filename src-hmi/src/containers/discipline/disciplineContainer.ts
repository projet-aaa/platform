import { connect } from "react-redux"
import * as _ from "underscore"

import rootWrapper from "../../wrappers/rootWrapper"
import { fetcher } from "../../utils"

import { StateProps, ActionProps, View } from "../../views/discipline/disciplineView"
import { Session } from "../../models/session"
import { Discipline } from "../../models/discipline"
import { fetchSessions } from "../../store/sessions/actions"

function mapStateToProps(state, ownProps): StateProps {
    return {
        sessions: state.sessions.sessions,
        currDisciplineName: ownProps.params.UE
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        fetchSessions: (discipline) => dispatch(fetchSessions([discipline]))
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    (props, d) => { 
        fetcher('/disciplines?name=' + props.currDisciplineName)
        .then(res => {
            var discipline = { 
                id: res["hydra:member"][0].id,
                name: res["hydra:member"][0].name,
                sessions: res["hydra:member"][0].sessions
             }
            props.fetchSessions(discipline)
            d()
        })  
        .catch(error => {
            d() 
            console.log(error)})
        
    },
    null,
    View
)