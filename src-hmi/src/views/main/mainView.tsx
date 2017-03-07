// Represents the content of the home page

// EXTENRAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { Session, SessionType } from "../../models/session"
import { Discipline } from "../../models/discipline"
import { ddmmyyyy, findAllIndex, getText } from "../../utils/index"


export interface StateProps {
    // the list of sessions of all disciplines, it must be sorted by reverse date
    sessions: Session[],
    // the list of disciplines
    disciplines: Discipline[]
    // the list of not checked disciplines in filters : discipline name -> is checked
    areNotChecked: any
    // the string which was in the search bar when the search button was clicked
    searchedString: string

    showList: boolean
    isTeacher: boolean
}

export interface ActionProps {
    // click on a discipline filter
    selectFilter(disciplineId: string)
    // click on the serach button of the search bar
    search(searchedString: string)
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            sessions,
            disciplines,
            areNotChecked,
            searchedString,
            showList,
            isTeacher,

            selectFilter,
            search
        } = this.props

        var sessionsRender = []
        for (var i=0 ; i<sessions.length ; i++) {
            if ( !areNotChecked[sessions[i].discipline]) {
                //Match the session's discipline id to disciplineName
                //There should be only one result to findAllIndex so first element is picked 
                var disciplineName = disciplines[findAllIndex(disciplines, (discipline) => {return (discipline.id == sessions[i].discipline)})[0]].name
                sessionsRender.push( 
                    <Link to={"/" + disciplineName + "/" + sessions[i].sessionName} key={i} className="list-group-item">
                        { ddmmyyyy(sessions[i].date) } | { disciplineName } | { sessions[i].sessionName }
                    </Link>
                );
            }
        }
        var filtersRender = []
        for (var i=0; i < disciplines.length; i++) {
            filtersRender.push(
                <li key={i} className="without-bullet" onClick={ (function(i){ return () => selectFilter(disciplines[i].id)})(i) }>
                    <label className="checkbox-inline">
                        <input id="optionsVisa" type="checkbox" name="optionsRadios" value="Visa" checked={ !areNotChecked[disciplines[i].id] }/>
                        &nbsp; { disciplines[i].name }
                    </label>
                </li>
            )
        }

        // a list of sessions sorted by date
        return (
            <div className="row">
                { showList ? 
                <div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="input-group">
                                    <input id="search" type="text" placeholder="Rechercher" className="form-control input-lg" onChange={ (event) => search(getText("search")) } />

                                    <div className="input-group-btn">
                                        <button className="btn btn-lg btn-primary" onClick={ () => search(getText("search")) }>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                            </div>
                        </div>
                        <div className="row" style={ {marginTop:15} }>
                            { sessionsRender }
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="panel panel-grey">
                            <div className="panel-heading">
                                Filtres
                            </div>
                            <div className="panel-body pan">
                                <ul>
                                    { filtersRender }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="col-lg-12">
                { !isTeacher ?
                    <h2>
                        Vous n'avez pas de groupe, allez sur votre <b><Link to="/profil">profil</Link></b> pour choisir votre groupe.
                    </h2>
                   :
                    <h2>
                        Vous ne suivez aucune discipline, allez sur votre <b><Link to="/profil">profil</Link></b> pour choisir vos disciplines.
                    </h2>
                }
                </div>
                }
            </div>
        )
    }
}