// REMOTE VIEW
// Renders the student remote during a live lesson

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as DesktopView } from "../../views/quiz/remoteViewDesktop"
import { View as MobileView } from "../../views/quiz/remoteViewMobile"

import { Quiz, QuizType, QuizInstanceState, AttentionStateType } from "../../models/class/class"

import { getText } from '../../utils'

export interface StateProps { 
    isTeacher: boolean
    
    attentionState: string

    sessionId: string
    quiz: Quiz
    authorId: string

    questionId: string

    quizChoice: any
    choiceId: string
    sent: boolean

    showCorrection: boolean
    forceUnfold: boolean
    question: boolean

    score: number
    rank: number
    population: number
    highscore: number
    average: number

    isConnected: boolean
}

export interface ActionProps { 
    choose(choice),
    nextQuiz(),
    prevQuiz(),
    validateAnswer(),
    sendComment(text),

    signalPanic(),
    signalSlow(),
    signalFast(),
    signalOk()
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        return (
            <div>
                <MediaQuery query='(min-width: 1224px)'>
                    <DesktopView {...this.props}/>
                </MediaQuery>
                <MediaQuery query='(max-width: 1224px)'>
                    <MobileView {...this.props}/>
                </MediaQuery>
            </div>
        )
    }
}