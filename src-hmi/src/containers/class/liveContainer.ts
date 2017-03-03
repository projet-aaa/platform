import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/class/liveView"

import { subscribe } from "../../store/wsrooms/actions"

import { browserHistory } from 'react-router';

function mapStateToProps(state, ownProps): StateProps {
    return { 
        rooms: state.wsserver.rooms,
        isTeacher: state.auth.isTeacher,
        username: state.auth.username
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
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
        props.subscribe()
        done()
    },
    null,
    View
)