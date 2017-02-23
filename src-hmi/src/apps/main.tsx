import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import { auth } from '../store/auth/actions'

// REDUCERS
import remoteInfo from '../store/remote/reducers/reducer'
import dashboardInfo from '../store/dashboard/reducers/reducer'
import statInfo from '../store/stats/reducer'
import sessionsInfo from '../store/sessions/reducer'
import threadMessageInputInfo from '../store/faq/reducers/answerInput'
import threadContentInfo from '../store/faq/reducers/threadContent'
import questionInputInfo from '../store/faq/reducers/questionInput'
import wsServerInfo from '../store/wsrooms/reducer'
import questionnaireInfo from '../store/questionnaire/reducers/reducer'
import authInfo from '../store/auth/reducer'
import mainInfo from '../store/main/reducers/reducer'

// TEMPLATES
import { View as TopBandLeftMenuTemp } from '../template/topBandLeftMenuTemp'
import { View as TopBandTemp } from '../template/topBandTemp'
import { View as TabsTemp } from '../template/tabsTemp'

// VIEWS AND CONTAINERS
import MainContainer from '../containers/main/mainContainer'
import ProfileContainer from '../containers/profile/profileContainer'

import RemoteContainer from '../containers/quiz/remoteContainer'
import DashboardContainer from '../containers/dashboard/dashboardContainer'
import PresentationContainer from '../containers/dashboard/presentationContainer'

import CourseContainer from '../containers/class/courseContainer'

import DisciplineContainer from '../containers/discipline/disciplineContainer'

import QuestionnaireContainer from '../containers/questionnaire/questionnaireContainer'

import { storeFactory } from '../utils'

// STORE CREATION (DEFINITION OF THE GLOBAL STATE)
let store = storeFactory([
    remoteInfo,
    dashboardInfo,
    statInfo,
    sessionsInfo,
    threadMessageInputInfo,
    threadContentInfo,
    questionInputInfo,
    wsServerInfo,
    questionnaireInfo,
    authInfo,
    mainInfo
], true, true, auth)
    
// ROUTE
let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ TopBandLeftMenuTemp }>
            <IndexRoute component={ MainContainer }/>
        </Route>
        <Route path="/profil" component={ TopBandLeftMenuTemp }>
            <IndexRoute component={ ProfileContainer }/>
        </Route>

        <Route path="/:UE" component={ TopBandLeftMenuTemp }>
            <IndexRoute component={ DisciplineContainer }/>
            <Route path=":course">
                <IndexRoute component={ (p, c) => <CourseContainer  name="Cours" {...p} /> } />
                <Route path="faq" component={ (p, c) => <CourseContainer name="FAQ" {...p} /> } />
                <Route path="statistique">
                    <IndexRoute component={ (p, c) => 
                        <CourseContainer name="Statistique" {...p} statType={ "SESSION" } /> }
                    />
                    <Route path=":sessionId/quiz" component={ (p, c) => 
                        <CourseContainer name="Statistique" {...p} statType={ "QUIZ" } /> }
                    />
                    <Route path=":sessionId/attention" component={ (p, c) => 
                        <CourseContainer name="Statistique" {...p} statType={ "ATTENTION" } /> }
                    />
                />
                </Route>
                <Route path="direct" component={ (p, c) =>  <CourseContainer name="Direct" {...p} /> } />
                <Route path="questionnaires" component={ (p, c) => <CourseContainer name="Questionnaires" {...p} /> } />
            </Route>
        </Route>

        <Route path="/:UE/:course/:profName/tele" component={ TopBandTemp }>
            <IndexRoute component={ RemoteContainer }/>
        </Route>
        <Route path="/:UE/:course/:profName/tb" component={ TopBandTemp }>
            <IndexRoute component={ DashboardContainer }/>
        </Route>
        <Route path="/:UE/:course/:profName/presentation" component={ PresentationContainer }/>
    </Router>
</Provider>)

// RENDER
ReactDOM.render(MainRouter, document.getElementById('main'))