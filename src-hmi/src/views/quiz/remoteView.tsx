// REMOTE VIEW
// Renders the student remote during a live lesson

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import RemoteContainerDesktop from "../../containers/quiz/remoteContainerDesktop"
import RemoteContainerMobile from "../../containers/quiz/remoteContainerMobile"
import { QuizType, Quiz } from "../../models/class/class"

import { getText } from '../../utils'

export interface StateProps { }

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {

        } = this.props;
        
        return (
            <div>
                <MediaQuery query='(min-width: 1224px)'>
                    <RemoteContainerDesktop/>
                </MediaQuery>
                <MediaQuery query='(max-width: 1224px)'>
                    <RemoteContainerMobile/>
                </MediaQuery>
            </div>
        );
    }
}