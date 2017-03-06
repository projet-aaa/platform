// FAQ VIEW
// Renders a list of question and its answers, related to a chapter

// EXTERAL IMPORTS
import * as React from "react"
import { Link } from "react-router"
import { MarkdownEditor } from "react-markdown-editor"

//INTERNAL IMPORTS
import { Thread } from "../../models/faq"
import { View as FaqQuestionView } from "../../views/faq/faqQuestionView"
import { Session } from "../../models/session"


export type StateProps = {
    //The list of question for this FAQ
    threadList:  Thread[]
    //The current session
    currSession: string
    //The content of the input used to ask a new question
    questionValue: string
    //The content of each answer editor indexed by thread id
    editorContents: string[]

    currUser:string
}

export interface ActionProps {
    //Publish a new question
    postThread(sessionId: string, question:string)
    //Send the answer to the server
    postThreadAnswer(threadId: string, content: string)

    //Update the store with the new content of the new question input
    changeQuestionInput(changeEvent: any)
    //Update the store with the new content of the answer input
    changeAnswerInput(threadId:string, content:string)

 }


export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            threadList, currSession, questionValue, editorContents,
            postThread, postThreadAnswer, 
            changeQuestionInput, changeAnswerInput
        } = this.props;

        //Render each thread of this chapter
        if (threadList) {
            var threadItem = threadList.map((item,i) => {
            return <FaqQuestionView 
                        key={item.id}
                        thread={item}
                        editorContent={editorContents[item.id]}
                        postThreadAnswer={(editorContent) => postThreadAnswer(item.id, editorContent)}
                        changeAnswerInput={(editorContent) => changeAnswerInput(item.id, editorContent)} />
            });    
        }
        
        //Div displayed if the session has no thread yet
        let noThreadDiv = <div className="list-group-item">Il n'y a pas de question pour ce chapitre</div>

        return (
            <div className="col-lg-12"> 
                <div className="row">
                    <div className="col-lg-12">
                        <h2> Sujets ouverts sur ce chapitre : </h2>
                        <div className="list-group">
                            {threadItem && threadItem.length != 0 ? threadItem : noThreadDiv}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h2> Poser une question : </h2>
                        <input style={{width: '100%'}} className="form-control" placeholder="Le titre de votre question"  onChange={(event) => changeQuestionInput(event.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-right" style={{paddingTop: '20px'}}>   
                            <button className="btn btn-lg btn-primary" onClick={() => postThread(currSession, questionValue)}>Publier la question</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}