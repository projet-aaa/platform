// Represents the profile page of a student

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
    mail: string
    group: string
    // name of lessons a student take
    lessons: string[]
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
            mail,
            group,
            lessons
        } = this.props;
        
        // the render of taken lessons
        let lessonRender = []
        for (var i=0 ; i<lessons.length ; i++) {
            let j = i % chartColors.length
            let colorStyle = {
                backgroundColor: chartColors[j]
            }
            lessonRender.push(
                <span>
                    <span className="label label-defaut" style={ colorStyle } key={ lessons[i] }>
                        { lessons[i] }
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
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Mail</label>
                            <div className="col-sm-9 controls">
                                <div className="row">
                                    <div className="col-xs-9">
                                        <input type="text" value={ mail } contentEditable={ false } className="form-control" readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" style={ noPaddingTop }>Groupe</label>
                            <div className="col-sm-9 controls">
                                <div className="row">
                                    <div className="col-xs-9">
                                        <span className="label label-yellow">
                                            { group }
                                        </span>
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
                        <hr/>
                    </form>
                </div>
            </div>
        );
    }
}