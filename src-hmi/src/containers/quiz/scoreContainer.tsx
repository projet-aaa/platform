// SCORE CONTAINER
// A score view where we provide the props

// EXTERNAL IMPORTS
import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/quiz/scoreView"

function mapStateToProps(state: any): StateProps {
    return { 
        // update of all props
        score: state.score.score,
        rank: state.score.rank,
        population: state.score.population,
        highScore: state.score.highScore,
        average: state.score.average,
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {}
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)