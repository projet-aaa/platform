// COMMENT BOX VIEW
// Renders a comment box for the student remote

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { getText } from '../../utils'

export interface StateProps {

}

export interface ActionProps {
    // Fires an action signaling that the user has sent a comment
    send(comment: string)
}

// Style for the text
var mediumSizeText = {
    fontSize: 30
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
            <div className="panel panel-blue">
                <div className="panel-heading" style={mediumSizeText}>
                    Comment :
                </div>
                <div className="panel-body pan white-background">
                    <div className="pal">
                        <textarea className="form-control no-resize" id="comment-text"></textarea>
                        <br/>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="pull-right">
                                    <button className="btn btn-lg btn-primary" onClick={ () => send(getText("comment-text")) }>Send comment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}