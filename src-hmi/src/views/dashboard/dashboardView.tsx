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

import { Quiz, QuizLauncher, QuizInstanceState } from '../../models/class/class'

export interface StateProps {
    isTeacher: boolean
    studentCount: number
    quizState: string

    // number of people who signaled lesson goes too fast
    tooFast: number
    // number of people who signaled lesson goes too slow
    tooSlow: number
    // number of people who signaled the are panicking
    panic: number
    // the current quiz
    currentQuiz: Quiz
    // choice for the current quiz => percentage who chose
    quizStats: any
    // the list of quiz to launch
    quizLaunchers: QuizLauncher[]

    isConnected: boolean
}

export interface ActionProps {
    launchQuiz(quizId: string)
    correction()
    finish()
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
            isTeacher,
            studentCount,
            quizState,

            tooFast,
            tooSlow,
            panic, 
            currentQuiz,
            quizStats,
            quizLaunchers,
            isConnected,

            launchQuiz,
            correction,
            finish
        } = this.props

        var quizInfoItem = quizLaunchers.map((item) => {
            return <QuizLauncherView 
                key={ item.title } 
                quizId={ item.quizId } 
                title={ item.title }
                state={ item.state }
                successRate={ item.successRate }
                launch= { () => {
                    switch(item.state) {
                        case 0: launchQuiz(item.quizId); break
                        case 1: correction(); break
                        case 2: break
                        case 3: finish(); break
                    }
                }}
            />
        })

        var quizInfos = 
        (<ul style={ paddingUl }>
            {quizInfoItem}
        </ul>)

        return (
            <div>
                { isTeacher ?
                    (isConnected ? 
                    <div>
                        <div className="col-lg-8">
                            <div className="row">
                                <QuizStatView 
                                    showQuiz={ currentQuiz != null }
                                    question={ currentQuiz && currentQuiz.question }
                                    state={ currentQuiz && 
                                        (quizState == QuizInstanceState.HEADING ? "énoncé" : "correction") 
                                    }
                                    quizStats={ quizStats } 
                                    correctChoice={ 
                                        currentQuiz != null &&
                                        (currentQuiz.type == "MCQ" ? 
                                        currentQuiz.choices[currentQuiz.answer] : currentQuiz.answer)
                                    }
                                    quizButton={ quizState == QuizInstanceState.HEADING ? 
                                        () => correction() : () => finish() 
                                    }
                                />
                            </div>
                            <div className="row">
                                <StudentFeedbackView 
                                    studentCount={studentCount}
                                    panicRate={panic} 
                                    slowRate={tooSlow}
                                    quickRate={tooFast}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="panel">
                                <div className="panel-heading">
                                    Statistiques de quiz
                                </div>
                                <div className="panel-body pan white-background">
                                    <div className="pal">
                                        { quizInfos }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <h1>Connection au server...</h1>
                    </div>)
                    :
                    <div className="row">
                        <h1>Vous ne pouvez pas accéder au tableau de bord en tant qu'étudiant (bien essayé)</h1>
                    </div>
                }
            </div>
        );
    }
}