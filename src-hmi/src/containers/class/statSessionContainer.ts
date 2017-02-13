import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/stats/statSessionView"

function mapStateToProps(state: any, ownProps: any): StateProps {
    return { 
        sessions: state.stat.sessions
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        choose: (id) => console.log("Choose : " + id)
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)