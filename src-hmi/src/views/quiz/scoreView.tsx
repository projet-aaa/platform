// represents the score of a user on the last quiz

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
   score: number // his score
   rank: number // his rank
   population: number
   highScore: number // the high score
   average: number // the average
}

export interface ActionProps {}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            score, rank, population, highScore, average
        } = this.props;

        var mediumSizeText = {
            fontSize: 30
        }
        // we show a panel containing all the values defined above
        return (
            <div>
                <div className="panel panel-blue">
                    <div className="panel-heading" style={mediumSizeText}>
                        Scores :
                    </div>
                    <div className="panel-body pan white-background">
                        <div className="pal">
                            <h3>Score global : {score}</h3>
                            <h3>Rang : {rank}/{population}</h3>
                            <h3>high score : {highScore}</h3>
                            <h3>moyenne : {average}</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}