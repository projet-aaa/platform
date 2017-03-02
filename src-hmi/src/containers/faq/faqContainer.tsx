import { connect } from "react-redux";

import rootWrapper from "../../wrappers/rootWrapper"

import { 
    retrieveThreadInfosAction, 
    publishQuestionAction, 
    changeQuestionValueAction,
    postThreadMessageAction,
    changeAnswerValueAction 
} from "../../store/faq/actions/actions"

import { StateProps, ActionProps, View } from "../../views/faq/faqView"

function mapStateToProps(state: any): StateProps {
    return { 
        threadList: state.threadContent.threadList,
        sessionId: state.threadContent.sessionId,
        questionValue: state.questionInput.questionInputVal,
        editorContents: state.threadMessageInput.threadMessageInputVal
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        //Retrieve all thread information from server, and update store
        retrieveThreadInfos : (threadId) => {
            // console.log("thread id :" +  threadId)
            //Fetch call
            // dispatch(retrieveThreadInfosAction(threadId)) 

            //Receive call result
            // dispatch(receivedThreadInfosAction(threadId))
        },
        //Publish a question to the server
        publishQuestion : (sessionId, question) => {
            dispatch(publishQuestionAction(sessionId,question));
            dispatch(retrieveThreadInfosAction(sessionId))
        },

        //Update store with the content of the new question input
        changeQuestionInput : (sessionId, questionValue) => {
            dispatch(changeQuestionValueAction(sessionId,questionValue))
        },

        //Send the answer content to the server
        sendAnswer: (content,threadId) => {
            console.log(content)
            if (content) {
                dispatch(postThreadMessageAction(content,threadId))
            }
        },
        //The content of the answer editor has changed
        changeAnswerInput: (threadId, content) => {
            dispatch(changeAnswerValueAction(threadId, content))
        }
    }
 }

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    null,
    null,
    View
)