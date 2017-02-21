import { connect } from "react-redux"
import * as _ from "underscore"

import { StateProps, ActionProps, View } from "../../views/discipline/disciplineView"
import { Session } from "../../models/session"

function goodDiscipline(element, discipline) {
  return element.discipline==discipline;
}

function compareDates(elt1, elt2) {
    var difference = elt1.date - elt2.date
    return difference
}

function mapStateToProps(state, ownProps): StateProps {
    return {
        sessions: _.values(state.sessions.sessions)
                   .filter((element) => goodDiscipline(element,ownProps.params.UE))
                   .sort(compareDates)
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)