// Represents the profile page of a student

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { getText } from "../../utils"
import { chartColors } from "../../models/consts"

export interface StateProps {
    lastName: string
    firstName: string
    //email: string
    group: string
    // name of lessons a student take
    disciplines: string[]

    edition: boolean

    groupCache
}
export interface ActionProps { 
    toShow()
    toEdition()

    onGroupChange(group: string)
}

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
            group,
            disciplines,

            edition,
            groupCache,

            toShow,
            toEdition,
            onGroupChange
        } = this.props;
        
        // the render of taken lessons
        let lessonRender = []
        for (var i=0 ; i<disciplines.length ; i++) {
            let j = i % chartColors.length
            let colorStyle = {
                backgroundColor: chartColors[j]
            }
            lessonRender.push(
                <span key={ i }>
                    <span className="label label-defaut" style={ colorStyle } key={ disciplines[i] }>
                        { disciplines[i] }
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
                                        <input 
                                            type="text" 
                                            value={ lastName } 
                                            contentEditable={ false }  
                                            className="form-control" 
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Prénom</label>
                            <div className="col-sm-9 controls">
                                <div className="row">
                                    <div className="col-xs-9">
                                        <input 
                                            type="text" 
                                            value={ firstName } 
                                            contentEditable={ false } 
                                            className="form-control" 
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label" style={ noPaddingTop }>
                                Groupe
                                </label>
                            <div className="col-sm-9 controls">
                                <div className="row">
                                    <div className="col-xs-9">
                                        { !edition ? 
                                            <span className="label label-green">
                                                { group }
                                            </span>:
                                            <input 
                                                type="text" 
                                                id="group"
                                                onChange={ () => onGroupChange(getText("group")) }
                                                value={ groupCache }
                                            />
                                        }
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
                    { edition ? 
                        <button className="btn btn-primary" onClick={ toShow }>Sauvegarder</button> :
                        <button className="btn btn-primary" onClick={ toEdition }>Editer</button>    
                    }
                </div>
            </div>
        )
    }
}

// -- EMAIL
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