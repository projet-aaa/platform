import { connect } from "react-redux"
import * as _ from "underscore"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/discipline/disciplineView"
import { Session } from "../../models/session"

function compareDates(elt1, elt2) {
    var difference = elt1.date - elt2.date
    return difference
}

function mapStateToProps(state, ownProps): StateProps {
    return {
        sessions: _.values(state.sessions.sessions)
                   .filter((element) => element.discipline == ownProps.params.UE)
                   .sort(compareDates)
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    null,
    View
)