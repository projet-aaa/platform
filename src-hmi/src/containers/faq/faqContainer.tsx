import { connect } from "react-redux";

import { retrieveThreadInfosAction, publishQuestionAction, changeQuestionValueAction } from "../../store/faq/actions/actions"

import { StateProps, ActionProps, View } from "../../views/faq/faqView"

function mapStateToProps(state: any): StateProps {
    return { 
        threadList: state.threadContent.threadList,
        sessionId: state.threadContent.sessionId,
        questionValue: state.threadContent.questionValue
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        retrieveThreadInfos : (threadId) => {
            // console.log("thread id :" +  threadId)
            //Fetch call
            // dispatch(retrieveThreadInfosAction(threadId)) 

            //Receive call result
            // dispatch(receivedThreadInfosAction(threadId))
        },
        publishQuestion : (sessionId, question) => {
            dispatch(publishQuestionAction(sessionId,question));
            dispatch(retrieveThreadInfosAction(sessionId))
        },
        changeQuestionInput : (sessionId, questionValue) => {
            dispatch(changeQuestionValueAction(sessionId,questionValue))
        }

    }
 }

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)