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
    launchQuiz(quizId: number)
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

        var quizInfoItem = quizStatsArray.map((item,i) => {
            return <QuizLauncherView quizStats={item} key={i} id={i} launch={() => launchQuiz(i)}> </QuizLauncherView>;
        });

        var quizInfos = 
        (<ul>
            {quizInfoItem}
        </ul>)

        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <QuizStatView quizStats={getLastCompleted(quizStatsArray)}> </QuizStatView>
                    </div>
                    <div className="col-lg-6">
                        {quizInfos}
                    </div>
                </div>

                <StudentFeedbackView panicAlert={studentFeedback.panicAlert} 
                                    slowerAlert={studentFeedback.slowerAlert}
                                    quickerAlert={studentFeedback.quickerAlert}
                > </StudentFeedbackView>
            </div>
        );
    }
}