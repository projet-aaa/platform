// FAQ QUESTION VIEW
// Renders a question and its answers for a FAQ

// EXTERNAL IMPORTS
import * as React from "react"
import { Link } from "react-router"
import * as PagedownEditor from "pagedown-editor"

//INTERNAL IMPORTS
import { ThreadMessage, Thread } from "../../models/faq"
import { View as ThreadMessageView} from "./faqAnswerView"


export type StateProps = Thread

export interface ActionProps {
    //Send the answer to the server
    sendAnswer(answerContent: string, threadId: number, userId: number )
}


//Convert a Date format to string
function ddmmyyyy(date: Date): string {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return (dd>9 ? '' : '0') + dd + '/' + 
            (mm>9 ? '' : '0') + mm + '/' +
            date.getFullYear()
};

//Important for pagedown editor initialisation
function getPagedownEditor() {
    return PagedownEditor.getPagedownEditor();
}

//Pick the html code from the answer preview to send it to server
function getAnswerContentAsHtml() {
    return document.getElementById("wmd-preview").innerHTML;
}


export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    //Initialize pagedown editor
    componentDidMount() {
        getPagedownEditor().run();
    }

    render() {
        const {
            text, author, date, answers, id,
            sendAnswer
        } = this.props;
        var dateString = ddmmyyyy(date)
        var heightAnswer = {
            height: "0px"
        }
        var answerRender = [];
        for(var i=0;i<answers.length;i++) {
            answerRender.push(
                <ThreadMessageView 
                        text={answers[i].text}
                        key={answers[i].id} 
                        author={answers[i].author} 
                        date={answers[i].date} 
                        id={answers[i].id}
                        votes={answers[i].votes}/>
            )
        }

        //Give name according to id for editor to make them unique 
        // let editorBarName = "wmd-button-bar-" + id;
        // let editorName = "wmd-input-" + id;
        // let editorPreview = "wmd-preview" + id;

        //Give unique id to question tab
        let questionId = "faq-" + id;


        return (
            <div>
                <div className="faq-item">
                    <div className="row">
                        <div className="col-md-9">
                            <a data-toggle="collapse" href={"#" + questionId} className="faq-question collapsed" aria-expanded="false">{text}</a>
                            <small>Ajouté par <strong>{author}</strong> <i className="fa fa-clock-o"></i> {ddmmyyyy(date)} </small>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div id={questionId} className="panel-collapse collapse" aria-expanded="false" style={heightAnswer}>
                                {answerRender}
                                <div className="well">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5> Ajouter une réponse </h5>
                                            <div>
                                                <div id="wmd-button-bar"></div>

                                                <textarea id="wmd-input" className="wmd-input"></textarea>

                                                <div id="wmd-preview" className="wmd-panel wmd-preview"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button className="btn btn-lg btn-primary pull-right" 
                                                onClick={() => sendAnswer(getAnswerContentAsHtml(),id, 0 )}>Envoyer la réponse</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}