import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
    id: number
    title: string
    state: number // 0: not done; 1: being run; 2: already ran 
    successRate: number
}

export interface ActionProps { 
    launch()
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            id,
            title,
            state,
            successRate,
            launch
        } = this.props;

        let res = null
        if(state == 2) { // the quiz is done
            res = title + ": " + successRate + "%";
        } else if(state == 1) {
            res = title + ": lancé";
        } else {
            res = <button className="btn btn-lg btn-primary" onClick={ launch }> { title } </button>
        }

        return (
            <li><h3> { res } </h3></li>
        );
    }
}