// DASHBOARD VIEW
// Renders a dashboard for the teacher

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as QuizLauncherView} from "./quizLauncherView"
import { View as QuizStatView } from "./quizStatView"
import { View as StudentFeedbackView } from "./studentFeedbackView"

import { Quiz, QuizLauncher } from '../../models/class/class'

export interface StateProps {
    tooFast: number
    tooSlow: number
    panic: number
    currentQuiz: Quiz
    quizStats: any // choice for the current quiz => percentage who chose
    quizLaunchers: QuizLauncher[]
}

export interface ActionProps {
    launchQuiz(quizId: number)
}

// style for ul tag
var paddingUl = {
    padding: 0
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            tooFast,
            tooSlow,
            panic, 
            currentQuiz,
            quizStats,
            quizLaunchers,
            launchQuiz
        } = this.props

        var quizInfoItem = quizLaunchers.map((item) => {
            return <QuizLauncherView 
                key={ item.title } 
                quizId={ item.quizId } 
                title={ item.title }
                state={ item.state }
                successRate={ item.successRate }
                launch= { () => launchQuiz(item.quizId) }
            />
        })

        var quizInfos = 
        (<ul style={ paddingUl }>
            {quizInfoItem}
        </ul>)

        return (
            <div className="page-content" >
                <div className="col-lg-8">
                    <div className="row">
                        { currentQuiz != null &&  
                            <QuizStatView quizStats={ quizStats } correctChoice={ currentQuiz.choices[currentQuiz.answer] }/>
                        }
                    </div>
                    <div className="row">
                        <StudentFeedbackView panicRate={panic} 
                                    slowRate={tooSlow}
                                    quickRate={tooFast}/>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="panel">
                        <div className="panel-heading">
                            Statistiques de quizz
                        </div>
                        <div className="panel-body pan white-background">
                            <div className="pal">
                                { quizInfos }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}