// Represents the profile page of a teacher

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { chartColors } from "../../models/consts"

export interface StateProps {
    lastName: string
    firstName: string
    //email: string
    // name of lessons a teacher teach
    disciplines: string[]
    // the groups a teacher have
    groups: string[]
}
export interface ActionProps { }

// style
var noPaddingTop = {
    paddingTop: 0
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            lastName,
            firstName,
            //email,
            disciplines,
            groups
        } = this.props;
        
        // the render of taught lessons
        let lessonRender = []
        // the render of groups
        let groupRender = []
        for (var i=0 ; i<disciplines.length ; i++) {
            // index of colors
            let j = i % chartColors.length
            let k = (chartColors.length - i - 1) % chartColors.length
            let colorStyleLesson = {
                backgroundColor: chartColors[j]
            }
            let colorStyleGroup = {
                backgroundColor: chartColors[k]
            }
            lessonRender.push(
                <span key={ i }>
                    <span className="label label-defaut" style={ colorStyleLesson } key={ disciplines[i] }>
                        { disciplines[i] }
                    </span>
                    &nbsp;
                </span>
            )
            groupRender.push(
                <span key={ i }>
                    <span className="label label-defaut" style={ colorStyleGroup } key={ groups[i] }>
                        { groups[i] }
                    </span>
                    &nbsp;
                </span>
            )
        }

        // a form with all the info
        return (
            <div id="generalTabContent" className="tab-content">
                <div id="tab-edit" className="tab-pane fade in active">
                    <form action="#" className="form-horizontal">
                        <h3>Informations</h3>

                        <div className="form-group">
                            <label className="col-sm-3 control-label">Nom</label>
                            <div className="col-sm-9 controls">
                                <div className="row">
                                    <div className="col-xs-9">
                                        <input type="text" value={ lastName } contentEditable={ false }  className="form-control" readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Prénom</label>
                            <div className="col-sm-9 controls">
                                <div className="row">
                                    <div className="col-xs-9">
                                        <input type="text" value={ firstName} contentEditable={ false } className="form-control" readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <hr/>
                        <h3>Cours</h3>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" style={ noPaddingTop }>Cours suivis</label>
                            <div className="col-sm-9 controls">
                                <div className="row">
                                    <div className="col-xs-9">
                                        { lessonRender }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" style={ noPaddingTop }>Groupes</label>
                            <div className="col-sm-9 controls">
                                <div className="row">
                                    <div className="col-xs-9">
                                        { groupRender }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </form>
                </div>
            </div>
        );
    }
}
// <div className="form-group">
//     <label className="col-sm-3 control-label">Mail</label>
//     <div className="col-sm-9 controls">
//         <div className="row">
//             <div className="col-xs-9">
//                 <input type="text" value={ email } contentEditable={ false } className="form-control" readOnly/>
//             </div>
//         </div>
//     </div>
// </div>