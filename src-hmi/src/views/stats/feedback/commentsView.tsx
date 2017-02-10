import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as CommentView, StateProps as CommentState } from "./commentView"

export interface StateProps {
    comments: CommentState[]
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            comments
        } = this.props

        return (
            <div className="panel">
                <div className="panel-heading">
                   Commentaires:
                </div>
                <div className="panel-body pan white-background"> 
                    { comments.map((comment) => {
                    return <CommentView 
                        comment={ comment.comment } 
                        date={ comment.date } 
                        commenter={ comment.commenter }
                    />
                    })}
                </div>
            </div>
        )
    }
}