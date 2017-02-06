// QUIZ CONTAINER
// A quiz view where we provide the chosen action

// EXTERNAL IMPORTS
import { connect } from "react-redux";

// INTERNAL IMPORTS
import { chooseAction } from "../../store/quiz/actions/actions"
import { Quiz } from "../../models/quiz"
import { StateProps, ActionProps, View } from "../../views/quiz/quizView"

function mapStateToProps(state: any): any {
    return { }
}
function mapDispatchToProps(dispatch): any {
    return {
        // signals the store what question has been chosen
        choose: (quizId, i) => dispatch(chooseAction(quizId, i))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)