// represents an answer choice of an faq Question

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
    // true if we are in consultation mode, false if in answer mode
    answerConsultation: boolean
    // the explanation associated to the answer
    explanation: string
    // true if display mode, false else
    displayMode: boolean
}

export interface ActionProps {
    // select an answer
    choose()
}

// styles
var heightExplanation = {
    height: "0px"
}
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
            answerConsultation,
            explanation,
            displayMode
        } = this.props;
        
        let colorAnswerStyle = null
        if (displayMode) {
            colorAnswerStyle = {}
        } else {
            if(rightAnswer) {
                colorAnswerStyle = {
                    color: "green"
                }
            } else {
                colorAnswerStyle = {
                    color: "red"
                }
            }
        }
        
        let indRef = "ind" + ind
        let res = null
        if (answerConsultation) {
            res = (
                <li className="without-bullet">
                    <div className="faq-item">
                        <div className="row">
                            <div className="col-lg-12">
                                <a data-toggle="collapse" href={"#" + indRef} className="faq-question collapsed" aria-expanded="false" style={ colorAnswerStyle }>
                                        <label className="tab" style={ mediumSizeText }>{ text }</label>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div id={indRef} className="panel-collapse collapse" aria-expanded="false" style={heightExplanation}>
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
        } else if (displayMode) {
            res = (
                <li className="without-bullet" onClick={ choose }>
                    <a>
                        <label className="tab" style={ mediumSizeText }>{ text }</label>
                    </a>
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