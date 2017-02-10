import * as React from "react"
import { Link } from "react-router"

import { ClassEvent } from '../../models/class/class'

import { View as CommentsView } from './feedback/commentsView'
import { View as StatAttentionView } from './feedback/statAttentionView'
import { StateProps as CommentState } from './feedback/commentView'

export interface StateProps {
    panic: number[]
    tooSlow: number[]
    tooFast: number[]
    date: number[]

    comments: CommentState[]
}

export interface ActionProps {
    goToQuiz()
    goToSessions()
 }


export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            panic,
            tooSlow,
            tooFast,
            date,
            comments,

            goToQuiz,
            goToSessions
        } = this.props

        return (
            <div className="page-content">
                <button type="button" className="btn btn-primary" onClick={ goToQuiz }>
                    Voir les résultats du quiz
                </button>
                <button type="button" className="btn btn-primary" onClick={ goToSessions }>
                    Retourner aux sessions
                </button>
                <StatAttentionView panic={ panic } tooSlow={ tooSlow } tooFast={ tooFast } date={ date } />
                <CommentsView comments={ comments }/>
            </div>
        );
    }
}