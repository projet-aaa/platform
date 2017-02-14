// FAQ QUESTION VIEW
// Renders a question and its answers for a FAQ

// EXTERNAL IMPORTS
import * as React from "react"
import { Link } from "react-router"
import { MarkdownEditor } from "react-markdown-editor"
import { markdown } from "markdown"

//INTERNAL IMPORTS
import { ThreadMessage, Thread } from "../../models/faq"
import { View as ThreadMessageView } from "./faqAnswerView"


export interface StateProps {
    thread: Thread
    editorContent: string
}

export interface ActionProps {
    //Send the answer to the server
    sendAnswer(editorContent: string)
    //Update the content of this question's answer in the store
    changeAnswerInput(editorContent: string )
}


//Convert a Date format to string
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
            thread, editorContent,
            sendAnswer, changeAnswerInput
        } = this.props;
        var dateString = ddmmyyyy(thread.date)
        var heightAnswer = {
            height: "0px"
        }
        var answerRender = [];
        for(var i=0;i<thread.answers.length;i++) {
            answerRender.push(
                <ThreadMessageView 
                        text={thread.answers[i].text}
                        key={thread.answers[i].id} 
                        author={thread.answers[i].author} 
                        date={thread.answers[i].date} 
                        id={thread.answers[i].id}
                        votes={thread.answers[i].votes}/>
            )
        }

        //Give unique id to question tab
        let questionId = "faq-" + thread.id;

        return (
            <div>
                <div className="faq-item">
                    <div className="row">
                        <div className="col-md-9">
                            <a data-toggle="collapse" href={"#" + questionId} className="faq-question collapsed" aria-expanded="false">{thread.text}</a>
                            <small>Ajouté par <strong>{thread.author}</strong> <i className="fa fa-clock-o"></i> {ddmmyyyy(thread.date)} </small>
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
                                                <MarkdownEditor 
                                                    initialContent="" 
                                                    iconsSet="font-awesome" 
                                                    onContentChange={ (content) => changeAnswerInput(content)}
                                                    />      
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button className="btn btn-lg btn-primary pull-right" 
                                                onClick={() =>  sendAnswer(markdown.toHTML(editorContent)) }>Envoyer la réponse</button>
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