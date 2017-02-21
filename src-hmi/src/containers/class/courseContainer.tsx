import { connect } from "react-redux"
import * as React from "react"

import { View as TabsTemp } from '../../template/tabsTemp'

import CourseMainContainer from '../../containers/class/mainContainer'
import FAQContainer from '../../containers/faq/faqContainer'
import LiveContainer from '../../containers/class/liveContainer'
import StatSessionContainer from '../../containers/class/statSessionContainer'
import StatQuizContainer from '../../containers/class/statQuizContainer'
import StatFeedbackContainer from '../../containers/class/statFeedbackContainer'
import QuestionnaireContainer from '../../containers/questionnaire/questionnaireContainer'

import { AuthState } from "../../store/auth/reducer"

function mapStateToProps(state: any, ownProps: any): any {
    let authState: AuthState = state.auth
    return { 
        isTeacher: authState.isTeacher
    }
}
function mapDispatchToProps(dispatch, ownProps): any {
    return {
        
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)((props, ctx) => {
    let prePath = "/" + props.UE + "/" + props.course

    console.log("props: ", props)

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
                        <StatFeedbackContainer {...props}/>
                    )
                )
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
})