import { connect } from "react-redux";
import * as _ from "underscore"

import { StateProps, ActionProps, View } from "../../views/main/mainView"

function mapStateToProps(state: any): StateProps {
    return { 
        sessions: _.values(state.sessions.sessions),
        disciplines: state.auth.disciplines
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)