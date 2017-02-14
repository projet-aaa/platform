import { connect } from "react-redux"
import * as React from "react"

import { View as TabsTemp } from '../../template/tabsTemp'

import CourseMainContainer from '../../containers/class/mainContainer'
import FAQContainer from '../../containers/class/faqContainer'
import LiveContainer from '../../containers/class/liveContainer'
import StatSessionContainer from '../../containers/class/statSessionContainer'
import StatQuizContainer from '../../containers/class/statQuizContainer'
import StatFeedbackContainer from '../../containers/class/statFeedbackContainer'

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

    if(props.isTeacher) {
        return <TabsTemp 
        actualTabName={ props.name } 
        names={ ["Cours", "FAQ", "Statistique", "Direct"] }
        urls={ [prePath,
                prePath + "/faq",
                prePath + "/statistique",
                prePath + "/direct"] }>
            { props.name == "Cours" ? 
                <CourseMainContainer courseId={ props.courseId }/> 
                : <div>Shouldn't show</div> }
            { props.name == "FAQ" ? 
                <FAQContainer courseId={ props.courseId }/> 
                : <div>Shouldn't show</div> }
            { props.name == "Statistique" ? 
                (props.statType == "QUIZ" ?
                    <StatQuizContainer courseId={ props.courseId } /> :
                    (props.statType == "SESSION" ?
                        <StatSessionContainer courseId={ props.courseId } /> :
                        <StatFeedbackContainer courseId={ props.courseId } />
                    )
                )
                : <div>Shouldn't show</div> }
            { props.name == "Direct" ?
                <LiveContainer courseId={ props.courseId }/> 
                : <div>Shouldn't show</div> }
        </TabsTemp> 
    } else {
        return <TabsTemp 
        actualTabName={ props.name } 
        names={ ["Cours", "FAQ", "Direct"] }
        urls={ [prePath,
                prePath + "/faq",
                prePath + "/direct"] }>
            { props.name == "Cours" ? 
                <CourseMainContainer courseId={ props.courseId }/> 
                : <div>Shouldn't show</div> }
            { props.name == "FAQ" ? 
                <FAQContainer courseId={ props.courseId }/> 
                : <div>Shouldn't show</div> }
            { props.name == "Direct" ? 
                <LiveContainer courseId={ props.courseId }/> 
                : <div>Shouldn't show</div> }
        </TabsTemp> 
    }
})