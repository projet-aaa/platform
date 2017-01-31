import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
   text: string
   chosen: boolean
}

export interface ActionProps {
    choose()
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            chosen,choose,text
        } = this.props;

        return (
            <li>
                <a onClick={ choose }>
                    {text} { chosen ? ": [choisi]" : "" } 
                </a>
            </li>
        );
    }
}