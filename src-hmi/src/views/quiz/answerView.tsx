// ANSWER VIEW
// Renders a choice for an MCQ

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
    // the answer index
    ind: number
    // The answer 
    text: string
    // True if it has been chosen by the user
    chosen: boolean
    // true if it's the right answer
    rightAnswer: boolean
    // true => show the correction
    showCorrection: boolean
    // the explanation associated to the answer
    explanation: string
    // true => answer explanations whill be shown automatically, else we have to click on the answers
    forceUnfold: boolean
}

export interface ActionProps {
    // select an answer
    choose()
}

// styles
var sizeText = {
    fontSize: 22
}
var mediumSizeText = {
    fontSize: 30
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            ind,
            chosen,
            choose,
            text,
            rightAnswer,
            showCorrection,
            explanation,
            forceUnfold
        } = this.props;
        
        let colorAnswerStyle = null
        if (!showCorrection) {
            colorAnswerStyle = {}
        } else {
            if(rightAnswer) {
                colorAnswerStyle = {
                    color: "green"
                }
            } else if (chosen) {
                colorAnswerStyle = {
                    color: "red"
                }
            } else {
                colorAnswerStyle = {
                    
                }
            }
        }
        
        let indRef = "ind" + ind
        let res = null
        if (showCorrection) {
            res = (
                <li className="without-bullet">
                    <div className="faq-item">
                        <div className="row">
                            <div className="col-lg-12">
                                <a data-toggle="collapse" href={"#" + indRef} className={ forceUnfold ? "" : "collapsed" } aria-expanded={ forceUnfold ? "true" : "false" } style={ colorAnswerStyle }>
                                    <label className="tab" style={ mediumSizeText }>{ text }</label>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div id={indRef} className={ "panel-collapse collapse" + (forceUnfold ? " in" : "") } aria-expanded={ forceUnfold ? "true" : "false" }>
                                    <div className="bigTab" style={sizeText}>
                                        { explanation }
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )
        } else {
            res = (
                <li className="without-bullet" onClick={ choose }>
                    <a>
                        <input type="radio" checked={ chosen }/>
                        <label className="tab" style={ mediumSizeText }>{ text }</label>
                    </a>
                </li>
            )
        }

        // An answer is a radio button with text
        return (
            <div>
            { res }
            </div>
        );
    }
}