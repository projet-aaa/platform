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
    consultation: boolean
    // the explanation associated to the answer
    explanation: string
}

export interface ActionProps {
    choose() // select an answer
}

var heightExplanation = {
    height: "0px"
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            ind, chosen, choose, text, rightAnswer, consultation, explanation
        } = this.props;

        var mediumSizeText = {
            fontSize: 30
        }
        
        let colorAnswerStyle = null

        if(rightAnswer) {
            colorAnswerStyle = {
                color: "green"
            }
        } else {
            colorAnswerStyle = {
                color: "red"
            }
        }
        let indRef = "ind" + ind
        console.log(indRef)
        let res = null
        if (consultation) {
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
                        <br/>
                        <div className="row">
                            <div className="col-lg-12">
                                <div id={indRef} className="panel-collapse collapse" aria-expanded="false" style={heightExplanation}>
                                    { explanation }
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