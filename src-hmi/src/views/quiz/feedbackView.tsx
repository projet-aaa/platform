import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {}

export interface ActionProps {
    signalPanic()
    signalSlow()
    signalFast()
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            signalPanic, signalSlow, signalFast
        } = this.props;

        return (
            <div>
                <button onClick={ signalPanic }>
                    Panique !
                </button>
                <button onClick={ signalSlow }>
                    Trop lent !
                </button>
                <button onClick={ signalFast }>
                    Trop rapide !
                </button>
            </div>
        );
    }
}