import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"
import connectionWrapper from "../../wrappers/connectionWrapper"

import { RemoteState } from "../../store/remote/reducers/reducer"
import { AuthState } from "../../store/auth/reducer"

import { 
    answerAction, commentAction, signalStateAction, 
    nextQuizAction, prevQuizAction, chooseAction 
} from "../../store/remote/actions/actions"

import { Quiz, QuizType, QuizInstanceState, AttentionStateType } from "../../models/class/class"

import { View } from "../../views/quiz/remoteView"

function mapStateToProps(state, ownProps) {
    let remote: RemoteState = state.remote,
        auth: AuthState = state.auth,
        quiz: Quiz = remote.quiz[remote.currQuizId] //&& remote.quiz.find(quiz => quiz.id == remote.currQuizId)

    return { 
        attentionState: remote.attentionState,

        sessionId: remote.sessionId,
        quiz,
        authorId: auth.id,

        questionId: remote.currQuizId,

        quizChoice: remote.choice,
        choiceId: quiz && quiz.type == QuizType.MCQ ? quiz.choiceIds[remote.choice] : null,
        sent: remote.sent,

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

function mapDispatchToProps(dispatch, ownProps) {
    return { 
        choose: (choice) => dispatch(chooseAction(choice)),
        nextQuiz: () => dispatch(nextQuizAction()),
        prevQuiz: () => dispatch(prevQuizAction()),

        validateAnswer: (type, choice, choiceId, questionId) => {
            dispatch(answerAction({ type, choice, choiceId, questionId }))
        },
        sendComment: (text, sessionId, authorId) => dispatch(commentAction({ text, sessionId, authorId })),

        signalPanic: (oldState, sessionId, authorId) => dispatch(signalStateAction({ 
            oldState,
            state: AttentionStateType.PANIC,
            sessionId, authorId
        })),
        signalSlow: (oldState, sessionId, authorId) => dispatch(signalStateAction({ 
            oldState,
            state: AttentionStateType.TOO_SLOW,
            sessionId, authorId
        })),
        signalFast: (oldState, sessionId, authorId) => dispatch(signalStateAction({ 
            oldState,
            state: AttentionStateType.TOO_FAST,
            sessionId, authorId
        })),
        signalOk: (oldState, sessionId, authorId) => dispatch(signalStateAction({
            oldState,
            state: AttentionStateType.OK,
            sessionId, authorId
        }))
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
        nextQuiz: stateProps.question ? null : dispatchProps.nextQuiz,
        prevQuiz: stateProps.question ? null : dispatchProps.prevQuiz,
        choose: stateProps.sent || stateProps.showCorrection
            ? null 
            : dispatchProps.choose,
        validateAnswer: () => {
            dispatchProps.validateAnswer(
                stateProps.quiz.type, 
                stateProps.quizChoice, 
                stateProps.choiceId,
                stateProps.questionId
            )
        },
        sendComment: (text) => dispatchProps.sendComment(
            text, stateProps.sessionId, stateProps.authorId
        ),

        signalPanic: () => {
            if(stateProps.attentionState != AttentionStateType.PANIC) {
                dispatchProps.signalPanic(stateProps.attentionState, stateProps.sessionId, stateProps.actionId)
            }
        },
        signalSlow: () => {
            if(stateProps.attentionState != AttentionStateType.TOO_SLOW) {
                dispatchProps.signalSlow(stateProps.attentionState, stateProps.sessionId, stateProps.actionId)
            }
        },
        signalFast: () => {
            if(stateProps.attentionState != AttentionStateType.TOO_FAST) {
                dispatchProps.signalFast(stateProps.attentionState, stateProps.sessionId, stateProps.actionId)
            }
        },
        signalOk: () => {
            if(stateProps.attentionState != AttentionStateType.OK) {
                dispatchProps.signalOk(stateProps.attentionState, stateProps.sessionId, stateProps.actionId)
            }
        }
    })
}

export default connectionWrapper(
    connect<StateProps, ActionProps, any>(
        mapStateToProps, 
        mapDispatchToProps,
        mergeProps
    )(View), 
    false
)