import { connect } from "react-redux";

import rootWrapper from "../../wrappers/rootWrapper"

import { 
    fetchThreads, 
    postThread, 
    postThreadAnswer,

    changeQuestionValueAction,
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
function mapDispatchToProps(dispatch) {
    return {
        //Retrieve all thread information from server, and update store
        fetchThreads : (threadId) => {
            // console.log("thread id :" +  threadId)
            //Fetch call
            // dispatch(retrieveThreadInfosAction(threadId)) 

            //Receive call result
            // dispatch(receivedThreadInfosAction(threadId))
        },
        //Publish a question to the server
        postThread : (sessionId, question) => {
            dispatch(postThread(sessionId,question));
            dispatch(fetchThreads(sessionId))
        },
        //Send the answer content to the server
        postThreadAnswer: (threadId,content) => {
            console.log(content)
            if (content) {
                dispatch(postThreadAnswer(threadId,content))
            }
        },

        //Update store with the content of the new question input
        changeQuestionInput : (sessionId, questionValue) => {
            dispatch(changeQuestionValueAction(sessionId,questionValue))
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
    (props, d) => {
        props.fetchThreads(props.sessionId)
        d()
    },
    View
)