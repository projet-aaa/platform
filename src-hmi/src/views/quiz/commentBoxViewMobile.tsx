// COMMENT BOX VIEW
// Renders a comment box for the student remote

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { getText, setText } from '../../utils'

export interface StateProps {

}

export interface ActionProps {
    // Fires an action signaling that the user has sent a comment
    send(comment: string)
}

// Style for the text
var sizeText = {
    fontSize: 15
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            send
        } = this.props;

        // a comment box is a text area with a send button
        return (
            <div className="panel panel-blue" style={ {marginTop: 10} }>
                <div className="panel-heading" style={sizeText}>
                    Comment :
                </div>
                <div className="panel-body pan white-background">
                    <textarea className="form-control no-resize" id="comment-text"></textarea>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="pull-right">
                                <button className="btn btn-primary" onClick={ () => {
                                    send(getText("comment-text"))
                                    setText("comment-text", "")
                                 } }>Send comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}