import { connect } from "react-redux"

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

        sessionId: remote.iriSessionId,
        quiz,
        authorId: auth.iriId,

        questionId: remote.currQuizId,
        questionIriId: quiz && quiz.iriId,

        quizChoice: remote.choice,
        choiceId: quiz && (quiz.type == QuizType.MCQ ? quiz.choiceIds[remote.choice] :
                           quiz.type == QuizType.MMCQ ? remote.choice.map(c => quiz.choiceIds[c]): null),
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

        validateAnswer: (type, choice, choiceId, questionId, questionIriId) => {
            if(type != QuizType.TEXT) {
                dispatch(answerAction({ type, choice, choiceId, questionId, questionIriId, text: null }))
            } else {
                dispatch(answerAction({ type, choice, choiceId: null, questionId, questionIriId, text: choice }))
            }
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

function mergeProps(sp, dp, ownProps) {
    return Object.assign({}, sp, dp, ownProps, {
        nextQuiz: sp.question ? null : dp.nextQuiz,
        prevQuiz: sp.question ? null : dp.prevQuiz,
        choose: sp.sent || sp.showCorrection
            ? null 
            : dp.choose,
        validateAnswer: () => {
            dp.validateAnswer(
                sp.quiz.type, 
                sp.quizChoice, 
                sp.choiceId,
                sp.questionId,
                sp.questionIriId
            )
        },
        sendComment: (text) => dp.sendComment(
            text, sp.sessionId, sp.authorId
        ),

        signalPanic: () => {
            if(sp.attentionState != AttentionStateType.PANIC) {
                dp.signalPanic(sp.attentionState, sp.sessionId, sp.authorId)
            }
        },
        signalSlow: () => {
            if(sp.attentionState != AttentionStateType.TOO_SLOW) {
                dp.signalSlow(sp.attentionState, sp.sessionId, sp.authorId)
            }
        },
        signalFast: () => {
            if(sp.attentionState != AttentionStateType.TOO_FAST) {
                dp.signalFast(sp.attentionState, sp.sessionId, sp.authorId)
            }
        },
        signalOk: () => {
            if(sp.attentionState != AttentionStateType.OK) {
                dp.signalOk(sp.attentionState, sp.sessionId, sp.authorId)
            }
        }
    })
}

export default connectionWrapper(
    connect<StateProps, ActionProps, any>(
        mapStateToProps, 
        mapDispatchToProps,
        mergeProps
    )(View)
)