import { connect } from "react-redux";

import rootWrapper from "../../wrappers/rootWrapper"

import { fetchSessionByName } from "../../api/fetchs"
import { findAllIndex } from "../../utils"
import { Session } from "../../models/session"
import { 
    fetchThreads, 
    postThread, 
    postThreadAnswer,

    storeCurrentSession,
    changeQuestionValueAction,
    changeAnswerValueAction 
} from "../../store/faq/actions/actions"
import { fetchSessions } from "../../store/sessions/actions"


import { StateProps, ActionProps, View } from "../../views/faq/faqView"

function mapStateToProps(state: any, ownProps): StateProps {
    return { 
        threadList: state.threadContent.threadList,
        currSession: state.currSession.currSession,
        questionValue: state.questionInput.questionInputVal,
        editorContents: state.threadMessageInput.threadMessageInputVal,
        currUser: state.auth.firstName + " " + state.auth.lastName
    }
}
function mapDispatchToProps(dispatch) {
    return {
        //Store the current session id in the state
        storeCurrentSession : (session) => dispatch(storeCurrentSession(session)),

        //Retrieve all thread information from server, and update store
        fetchThreads : (threadIdList, success) => {dispatch(fetchThreads(threadIdList, success))},

        //Publish a question to the server
        postThread : (sessionId, question, author) => {
            if (question) {
                dispatch(postThread(sessionId,question, author));
            }
        },

        //Send the answer content to the server
        postThreadAnswer: (threadId,content, author) => {
            if (content) {
                dispatch(postThreadAnswer(threadId, content, author))
            }
        },

        //Update store with the content of the new question input
        changeQuestionInput : (questionValue) => {
            dispatch(changeQuestionValueAction(questionValue))
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
    (stateProps, dispatchProps, op) => {
        return Object.assign(stateProps, dispatchProps, op, {
            postThread: (sessionId, question) => dispatchProps.postThread(sessionId, question, stateProps.currUser),
            postThreadAnswer: (threadId, content) => dispatchProps.postThreadAnswer(threadId, content, stateProps.currUser)
        })
    },
    (props, d) => { 
        fetchSessionByName(props.params.course, session => {
                props.storeCurrentSession(session["hydra:member"][0].id)    
                
                var threadIdList = session["hydra:member"][0].threads.map((item) => {
                    let split = item.split('/');                        
                    return split[split.length -1];
                })
                console.log(threadIdList)
                props.fetchThreads(threadIdList, d)
            }, 
            (error) => console.log(error))
    },
    null,
    View
)