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
        } = this.props;

        var quizInfoItem = quizLaunchers.map((item) => {
            return <QuizLauncherView 
                key={ item.title } 
                quizId={ item.quizId } 
                title={ item.title }
                state={ item.state }
                successRate={ item.successRate }
                launch= { () => launchQuiz(item.quizId) } > 
            </QuizLauncherView>;
        });

        var quizInfos = 
        (<ul>
            {quizInfoItem}
        </ul>)

        return (
            <div className="page-content" >
                <div className="row ">
                    <div className="col-md-8">
                        { currentQuiz != null &&  
                            <QuizStatView quizStats={ quizStats } correctChoice={ currentQuiz.answer }> </QuizStatView>
                        }
                    </div>

                    <div className="col-md-4">
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
                <div className="row">
                    <div className="col-md-12">
                        <StudentFeedbackView 
                            panicAlert={ panic > 0 } 
                            slowerAlert={ tooSlow > 0 }
                            quickerAlert={ tooFast > 0 }> 
                        </StudentFeedbackView>
                    </div>
                </div>
            </div>
        );
    }
}