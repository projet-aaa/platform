import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as QuizLauncherView } from "./quizLauncherView"
import { View as QuizStatView } from "./quizStatView"
import { View as StudentFeedbackView } from "./studentFeedbackView"

import { StudentFeedback, QuizStats } from "../../models/dashboard"

export interface StateProps {
    studentFeedback : StudentFeedback
    quizStatsArray : QuizStats[]
}

export interface ActionProps {
    launchQuiz(quizTitle: string)
}


function getLastCompleted(quizStatsArray: QuizStats[]) 
{
    var i = quizStatsArray.length - 1;
    while (quizStatsArray[i].state!=0)
    {
        i--;
    }
    return quizStatsArray[i]; 
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            studentFeedback, quizStatsArray,
            launchQuiz
        } = this.props;

        var quizInfoItem = quizStatsArray.map((item) => {
            return <QuizLauncherView quizStats={item} key={item.title} title={item.title} launch={() => launchQuiz(item.title)}> </QuizLauncherView>;
        });

        var quizInfos = 
        (<ul>
            {quizInfoItem}
        </ul>)



        return (
            <div className="page-content" >
                <div className="row ">
                    <div className="col-md-8">
                        <QuizStatView quizStats={getLastCompleted(quizStatsArray)}> </QuizStatView>
                    </div>

                    <div className="col-md-4">
                        <div className="panel">
                            <div className="panel-heading">
                                Statistiques de quizz
                            </div>
                            <div className="panel-body pan white-background">
                                <div className="pal">
                                    {quizInfos}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <StudentFeedbackView panicAlert={studentFeedback.panicAlert} 
                                    slowerAlert={studentFeedback.slowerAlert}
                                    quickerAlert={studentFeedback.quickerAlert}> </StudentFeedbackView>
                    </div>
                </div>
            </div>
        );
    }
}