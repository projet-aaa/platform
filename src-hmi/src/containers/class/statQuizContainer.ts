import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/stats/statQuizView"

function mapStateToProps(state: any, ownProps: any): StateProps {
    return { 
        quiz: state.stat.quiz,
        quizChoices: state.stat.quizChoices,
        currentQuizId: state.stat.currentQuizId
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        chooseQuiz: (quizId: string) => console.log("Choose : " + quizId),
        gotoFeedback: () => console.log("go to feedback"),
        gotoSession: () => console.log("go to sessions")
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)