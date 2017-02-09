import { connect } from "react-redux";

import { postThreadMessageAction } from "../../store/faq/actions/actions"

import { StateProps, ActionProps, View } from "../../views/faq/faqQuestionView"

function mapStateToProps(state: any): any {
    return {};
 }

function mapDispatchToProps(dispatch): any {
    return {
        sendAnswer: (content,threadId,userId) => {
            if (content) {
                dispatch(postThreadMessageAction(content,threadId,userId))
            }
        }
    }
 }

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)