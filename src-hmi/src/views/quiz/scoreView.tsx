import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
   score: number
   rank: number
   highScore: number
   average: number
}

export interface ActionProps {}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            score, rank, highScore, average
        } = this.props;

        return (
            <div>
                score : {score} <br/>
                rang : {rank} <br/>
                high score : {highScore} <br/>
                moyenne : {average}
            </div>
        );
    }
}