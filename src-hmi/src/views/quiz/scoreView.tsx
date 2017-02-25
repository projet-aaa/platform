// SCORE VIEW
// Renders the score of a student during a live lesson

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
    // his score
    score: number
    // his rank
    rank: number
    // the people number who answered the questions
    population: number
    // the high score
    highScore: number
    // the average
    average: number
}

export interface ActionProps {}

// style for the text
var mediumSizeText = {
    fontSize: 30
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            score, rank, population, highScore, average
        } = this.props;

        // we show a panel containing all the values defined above
        return (
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
        );
    }
}