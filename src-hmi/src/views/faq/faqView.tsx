import * as React from "react"
import { Link } from "react-router"

import { Thread } from "../../models/faq"
import  FaqQuestionContainer from "../../containers/faq/faqQuestionContainer"

export type StateProps = {
    threadList:  Thread[]
    sessionId: number
    questionValue: string
}

export interface ActionProps {
    retrieveThreadInfos(sessionId: number)
    publishQuestion(sessionId:number, question:string)
    changeQuestionInput(sessionId:number, changeEvent: string)
 }


export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    componentWillMount() {
        this.props.retrieveThreadInfos(this.props.sessionId);
    }

    render() {
        const {
            threadList, sessionId, questionValue,
            publishQuestion, changeQuestionInput
        } = this.props;


        if (threadList) {
            var threadItem = threadList.map((item,i) => {
            return <FaqQuestionContainer 
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        author={item.author}
                        date={item.date}
                        answers={item.answers} />

            });    
        }
        

        return (
            <div> 
                <div className="row">
                    <div className="col-lg-12">
                        {threadItem ? threadItem : "Il n'y a pas de question pour ce chapitre"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <input style={{width: '100%'}}  onChange={(event) => changeQuestionInput(sessionId, event.target.value)} />
                    </div>
                    <div className="col-lg-4 text-center">
                        <button className="btn btn-lg btn-primary" onClick={() => publishQuestion(sessionId,questionValue)}>Publier la question</button>
                    </div>
                </div>
            </div>
        );
    }
}