/* -- COURSE CONTAINER
 * The root of a sessions page: contains and renders the list tabs in a session page (stats, quizzes, ...)
 */

// EXTERNAL IMPORTS
import { connect } from "react-redux"
import * as React from "react"

import { View as TabsTemp } from '../../template/tabsTemp'

// CONTAINERS
import CourseMainContainer from '../../containers/class/mainContainer'
import FAQContainer from '../../containers/faq/faqContainer'
import LiveContainer from '../../containers/class/liveContainer'
import StatSessionContainer from '../../containers/class/statSessionContainer'
import StatQuizContainer from '../../containers/class/statQuizContainer'
import StatFeedbackContainer from '../../containers/class/statFeedbackContainer'
import StatTimelineContainer from '../../containers/class/statTimelineContainer'
import QuestionnaireContainer from '../../containers/questionnaire/questionnaireContainer'

import { AuthState } from "../../store/auth/reducer"
import { auth } from "../../store/auth/actions"

import { id, username, password } from "../../models/consts"

function mapStateToProps(state: any, ownProps: any): any {
    let authState: AuthState = state.auth
    return { 
        isTeacher: authState.isTeacher,
        infoFetched: authState.infoFetched
    }
}
function mapDispatchToProps(dispatch, ownProps): any {
    return { 
        auth: () => dispatch(auth(id, username, password))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)((props, ctx) => {
    // test if we are logged in or not, if not, show loader
    if(!props.infoFetched) {
        props.auth()
        return <div className="loader"></div>
    } else {
        let prePath = "/" + props.params.UE + "/" + props.params.course

        if(props.isTeacher) {
            return <TabsTemp 
            actualTabName={ props.name } 
            names={ ["Cours", "FAQ", "Statistique", "Direct"] }
            urls={ [prePath,
                    prePath + "/faq",
                    prePath + "/statistique",
                    prePath + "/direct"] }>
                { props.name == "Cours" ? 
                    <CourseMainContainer {...props}/> : <div>Shouldn't show</div> }
                { props.name == "FAQ" ? 
                    <FAQContainer {...props}/> : <div>Shouldn't show</div> }
                { props.name == "Statistique" ? 
                    (props.statType == "QUIZ" ?
                        <StatQuizContainer {...props}/> :
                    (props.statType == "SESSION" ?
                        <StatSessionContainer {...props}/> :
                    (props.statType == "FEEDBACK" ? 
                        <StatFeedbackContainer {...props}/> :
                        <StatTimelineContainer {...props}/>
                    )))
                    : <div>Shouldn't show</div> }
                { props.name == "Direct" ?
                    <LiveContainer {...props}/> : <div>Shouldn't show</div> }
            </TabsTemp> 
        } else {
            return <TabsTemp 
            actualTabName={ props.name } 
            names={ ["Cours", "FAQ", "Direct", "Questionnaires"] }
            urls={ [prePath,
                    prePath + "/faq",
                    prePath + "/direct",
                    prePath + "/questionnaires"] }>
                { props.name == "Cours" ? 
                    <CourseMainContainer {...props}/> : <div>Shouldn't show</div> }
                { props.name == "FAQ" ? 
                    <FAQContainer {...props}/> : <div>Shouldn't show</div> }
                { props.name == "Direct" ? 
                    <LiveContainer {...props}/> : <div>Shouldn't show</div> }
                { props.name == "Questionnaires" ?
                    <QuestionnaireContainer {...props}/> : <div>Shouldn't show</div> }
            </TabsTemp> 
        }
    }
})