import * as React from "react";
import { Link } from "react-router"

import { FAQAnswer, FAQQuestion } from "../../models/faq"
import { View as FAQAnswerView} from "./faqAnswerView"

export type StateProps = FAQQuestion

export interface ActionProps {}

function ddmmyyyy(date: Date): string {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return (dd>9 ? '' : '0') + dd + '/' + 
            (mm>9 ? '' : '0') + mm + '/' +
            date.getFullYear()
};

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            text,
            author,
            date,
            answers
        } = this.props;
        var dateString = ddmmyyyy(date)
        var heightAnswer = {
            height: "0px"
        }
        var answerRender = [];
        for(var i=0;i<answers.length;i++) {
            answerRender.push(
                <FAQAnswerView text={answers[i].text} author={answers[i].author} date={answers[i].date} votes={answers[i].votes}/>
            )
        }
        return (
            <div>
                <div className="faq-item">
                    <div className="row">
                        <div className="col-md-9">
                            <a data-toggle="collapse" href="#faq1" className="faq-question collapsed" aria-expanded="false">Quel est le sens de la vie ?</a>
                            <small>Ajouté par <strong>Somin Maurel</strong> <i className="fa fa-clock-o"></i> Aujourd'hui 14:40 - 27.01.2017</small>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="faq1" className="panel-collapse collapse" aria-expanded="false" style={heightAnswer}>
                            {answerRender}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}