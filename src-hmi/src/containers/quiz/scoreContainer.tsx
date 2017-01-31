import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/quiz/scoreView"

function mapStateToProps(state: any): StateProps {
    return { 
        score: state.score.score,
        rank: state.score.rank,
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