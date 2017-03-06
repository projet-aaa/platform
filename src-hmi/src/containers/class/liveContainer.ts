import { browserHistory } from 'react-router'

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/class/liveView"

import { subscribe } from "../../store/wsrooms/actions"
import { fetchSessionByName } from "../../api/fetchs"
import { fetchSessionSuccess } from "../../store/navigation/actions"

function mapStateToProps(state, ownProps): StateProps {
    return { 
        rooms: state.navigation.session ? state.wsserver.rooms.filter(room => room.sessionId == state.navigation.session.id)
                                        : state.wsserver.rooms,
        isTeacher: state.auth.isTeacher,
        username: state.auth.username
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchSession: session => dispatch(fetchSessionSuccess(session)),
        subscribe: () => dispatch(subscribe(true)),
        genURL: ownProps.isTeacher ? 
            (teacher: string) => "/session/" + ownProps.params.course + "/" + teacher + "/tb" :
            (teacher: string) => "/session/" + teacher
    }
}

export default rootWrapper(
    mapStateToProps,
    mapDispatchToProps,
    null,
    (props, done) => { 
        fetchSessionByName(props.params.course, session => {
            props.fetchSession(session["hydra:member"][0])

            props.subscribe()
            done()
        })
    },
    null,
    View
)