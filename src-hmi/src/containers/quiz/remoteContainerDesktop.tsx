import { connect } from "react-redux"

import { StateProps, ActionProps, Props, View } from "../../views/quiz/remoteViewDesktop"

import { RemoteState } from "../../store/remote/reducers/reducer"
import { AuthState } from "../../store/auth/reducer"

import { 
    answerAction, commentAction, signalStateAction, 
    nextQuizAction, prevQuizAction, chooseAction 
} from "../../store/remote/actions/actions"

import { Quiz, QuizType, QuizInstanceState, AttentionStateType } from "../../models/class/class"

function mapStateToProps(state: any): any {
    let remote: RemoteState = state.remote,
        auth: AuthState = state.auth,
        quiz = remote.quiz[state.remote.currentQuiz]

    return {
        sessionId: remote.sessionId,
        quiz: quiz,
        authorId: auth.id,

        questionId: remote.currQuizId,

        quizChoice: remote.choice,
        choiceId: quiz && quiz.type == QuizType.MCQ ? quiz.choiceIds[remote.choice] : null,

        showCorrection: remote.currQuizState != QuizInstanceState.HEADING,
        forceUnfold: false,
        question: remote.currQuizState != QuizInstanceState.OFF,

        score: remote.score,
        rank: remote.rank,
        population: remote.studentPop,
        highscore: remote.highscore,
        average: remote.average
    }
}

function mapDispatchToProps(dispatch, state): any {
    return {
        choose: (choice) => dispatch(chooseAction(choice)),
        nextQuiz: () => dispatch(nextQuizAction()),
        prevQuiz: () => dispatch(prevQuizAction()),

        validateAnswer: (type, choice, choiceId, questionId) => dispatch(answerAction({ type, choice, choiceId, questionId })),
        sendComment: (text, sessionId, authorId) => dispatch(commentAction({ text, sessionId, authorId })),

        signalPanic: (sessionId, authorId) => dispatch(signalStateAction({ 
            state: AttentionStateType.PANIC,
            sessionId, authorId
        })),
        signalSlow: (sessionId, authorId) => dispatch(signalStateAction({ 
            state: AttentionStateType.TOO_SLOW,
            sessionId, authorId
        })),
        signalFast: (sessionId, authorId) => dispatch(signalStateAction({ 
            state: AttentionStateType.TOO_FAST,
            sessionId, authorId
        }))
    }
}

function mergeProps(stateProps, dispatchProps, ownProps): Props {
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
        validateAnswer: () => dispatchProps.validateAnswer(
            stateProps.quiz.type, 
            stateProps.quizChoice, 
            stateProps.choiceId,
            stateProps.questionId
        ),
        sendComment: (text) => dispatchProps.sendComment(
            text, stateProps.sessionId, stateProps.authorId
        ),

        signalPanic: () => dispatchProps.signalPanic(stateProps.sessionId, stateProps.actionId),
        signalSlow: () => dispatchProps.signalSlow(stateProps.sessionId, stateProps.actionId),
        signalFast: () => dispatchProps.signalFast(stateProps.sessionId, stateProps.actionId),
    })
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)