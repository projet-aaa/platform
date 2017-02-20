import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/sessionQuiz/sessionQuizView"

import { 
    getRooms, joinRoom, closeRoom, leaveRoom, openClassRoom, subscribe 
} from "../../store/wsrooms/actions"
import { authWS } from "../../store/auth/actions"

function mapStateToProps(state: any, ownProps: any): any {
    let room = state.wsserver.currentRoom != -1 ? 
                state.wsserver.rooms.find(r => r.id == state.wsserver.currentRoom) : null
    return {
        rooms: state.wsserver.rooms.map((room) => {
            return { id: room.id, teacher: room.teacher }
        }),
        isTeacher: state.auth.isTeacher,
        roomOwner: room != null ? room.teacher : null,
        roomId: room != null ? room.id : null
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
        closeRoom: () => dispatchProps.closeRoom(stateProps.roomId)
    })
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps,
    mergeProps
)(View)