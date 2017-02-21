import { connect } from "react-redux"

import { fetchOnUpdate } from "../../utils"

import { StateProps, ActionProps, View } from "../../views/class/liveView"

import { subscribe } from "../../store/wsrooms/actions"

import { browserHistory } from 'react-router';

function mapStateToProps(state, ownProps): StateProps {
    return { 
        rooms: state.wsserver.rooms
    }
}
function mapDispatchToProps(dispatch, ownProps): any {
    console.log(ownProps)
    return {
        subscribe: () => dispatch(subscribe(true)),
        genURL: ownProps.isTeacher ? 
            (teacher: string) => "/" + ownProps.UE + "/" + ownProps.course + "/" + teacher + "/tb" :
            (teacher: string) => "/" + ownProps.UE + "/" + ownProps.course + "/" + teacher + "/tele" 
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(fetchOnUpdate(
    (props) => {
        props.subscribe()
    }
)(View))