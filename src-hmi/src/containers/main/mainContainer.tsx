import { connect } from "react-redux";
import * as _ from "underscore"

import { fetchOnUpdate, isAuthentified } from "../../utils"

import { StateProps, ActionProps, View } from "../../views/main/mainView"

import { fetchSessions } from "../../store/sessions/actions"

function mapStateToProps(state: any): StateProps {
    return { 
        sessions: _.values(state.sessions.sessions),
        disciplines: state.auth.disciplines
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        fetchSessions: () => dispatch(fetchSessions(null))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(fetchOnUpdate(
    (props) => {
        let i = setInterval(() => {
            console.log("trying!")
            if(isAuthentified()) {
                console.log("authentified! ", (document as any).token)
                props.fetchSessions()
                clearInterval(i)
            }
        }, 100)
    }
) (View))