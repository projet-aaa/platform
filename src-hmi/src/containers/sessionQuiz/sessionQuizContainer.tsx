import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/sessionQuiz/sessionQuizView"

import { getRooms, joinRoom, closeRoom, leaveRoom, openClassRoom, subscribe } from "../../store/wsrooms/actions"
import { authWS } from "../../store/auth/actions"
import { changeApp } from "../../store/sessionQuiz/actions"

function mapStateToProps(state: any, ownProps: any): StateProps {
    
    return {
        rooms: state.wsserver.rooms.map((room) => room.id),
        isTeacher: state.auth.isTeacher,
        room: state.wsserver.currentRoom
    }
}
function mapDispatchToProps(dispatch, ownProps): any {
    let dashboard: boolean = ownProps.location.pathname == "/dashboard",
        presentation: boolean = ownProps.location.pathname == "/presentation",
        remote: boolean = ownProps.location.pathname == "/remote"
        
    dispatch(authWS(0, 'abeyet', !remote))
    dispatch(subscribe(true))
    
    return {
        updateRooms: () => dispatch(getRooms()),
        joinRoom: (roomId) => dispatch(joinRoom(roomId)),
        leaveRoom: () => dispatch(leaveRoom()),
        closeRoom: (roomId) => dispatch(closeRoom(roomId)),
        openRoom: () => dispatch(openClassRoom())
    }
}

function mergeProps(stateProps, dispatchProps, ownProps): any {
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
        closeRoom: () => dispatchProps.closeRoom(stateProps.room)
    })
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps,
    mergeProps
)(View)