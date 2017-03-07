/* -- MAIN
 * The root of the entire website: contains the list of redux reducers used (representing the 
 * global state) and the urls of the website. Some of the URL references within the website are
 * hard coded so be carefull when modifying the URLs on this page.
 */

// EXTERNAL
import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router'
import { Provider } from 'react-redux'

import { auth } from '../store/auth/actions'

// REDUCERS
import remoteInfo from '../store/remote/reducers/reducer'
import dashboardInfo from '../store/dashboard/reducers/reducer'
import statInfo from '../store/stats/reducer'
import sessionsInfo from '../store/sessions/reducer'
import threadMessageInputInfo from '../store/faq/reducers/answerInput'
import threadContentInfo from '../store/faq/reducers/threadContent'
import questionInputInfo from '../store/faq/reducers/questionInput'
import currSessionInfo from '../store/faq/reducers/currSession'
import wsServerInfo from '../store/wsrooms/reducer'
import questionnaireInfo from '../store/questionnaire/reducers/reducer'
import authInfo from '../store/auth/reducer'
import mainInfo from '../store/main/reducers/reducer'
import profileInfo from '../store/profile/reducer'
import navigationInfo from '../store/navigation/reducer'

// TEMPLATES
import TopBandLeftMenuTemp from '../template/topBandLeftMenuTemp'
import TopBandTemp from '../template/topBandTemp'
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

import LoginContainer from '../containers/dev/loginContainer'
import CloseRoomContainer from '../containers/dev/closeRoomContainer'

import { storeFactory } from '../utils'
import { devtools } from '../models/consts'
import rootWrapper from "../wrappers/rootWrapper"
import { fetchTest, fetchSessionQuiz, fetchDisciplinesSessions, fetchSessionStats } from '../api/fetchs'

// STORE CREATION (DEFINITION OF THE GLOBAL STATE)
let store = storeFactory([
    remoteInfo,
    dashboardInfo,
    statInfo,
    sessionsInfo,
    threadMessageInputInfo,
    threadContentInfo,
    questionInputInfo,
    currSessionInfo,
    wsServerInfo,
    questionnaireInfo,
    authInfo,
    mainInfo,
    profileInfo,
    navigationInfo
], true, auth)
    
// THE WEBSITES REACT ROUTES
// cf. urls.md for the description of every page. Any modification here should be copied and documented
// in urls.md
// to remove the devtools, remove them from the router

// { devtools && <Route path="/login" component={ LoginContainer }/> }
// { devtools && <Route path="/close_room/:prof" component={ CloseRoomContainer }/> }
let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ TopBandLeftMenuTemp }>
            <IndexRoute component={ MainContainer }/>
        </Route>

        { devtools && <Route path="/login" component={ LoginContainer }/> }
        { devtools && <Route path="/close_room/:prof" component={ CloseRoomContainer }/> }

        <Route path="/profil" component={ TopBandLeftMenuTemp }>
            <IndexRoute component={ ProfileContainer }/>
        </Route>

        <Route path="/session/:profName" component={ TopBandTemp }>
            <IndexRoute component={ RemoteContainer }/>
        </Route>
        <Route path="/session/:course/:profName/tb" component={ TopBandTemp }>
            <IndexRoute component={ DashboardContainer }/>
        </Route>
        <Route path="/session/:course/:profName/presentation" component={ PresentationContainer }/>

        <Route path="/:UE" component={ TopBandLeftMenuTemp }>
            <IndexRoute component={ DisciplineContainer }/>
            <Route path=":course">
                <IndexRoute component={ (p, c) => <CourseContainer  name="Cours" {...p} /> } />
                <Route path="faq" component={ (p, c) => <CourseContainer name="FAQ" {...p} /> } />
                <Route path="statistique">
                    <IndexRoute component={ (p, c) => 
                        <CourseContainer name="Statistique" {...p} statType={ "SESSION" } /> }
                    />
                    <Route path=":profName/quiz" component={ (p, c) => 
                        <CourseContainer name="Statistique" {...p} statType={ "QUIZ" } /> }
                    />
                    <Route path=":profName/attention" component={ (p, c) => 
                        <CourseContainer name="Statistique" {...p} statType={ "ATTENTION" } /> }
                    />
                    <Route path=":profName/timeline" component={ (p, c) => 
                        <CourseContainer name="Statistique" {...p} statType={ "TIMELINE" } /> }
                    />
                </Route>
                <Route path="direct" component={ (p, c) =>  <CourseContainer name="Direct" {...p} /> } />
                <Route path="questionnaires" component={ (p, c) => <CourseContainer name="Questionnaires" {...p} /> } />
            </Route>
        </Route>
    </Router>
</Provider>)

// RENDER
ReactDOM.render(MainRouter, document.getElementById('main'))