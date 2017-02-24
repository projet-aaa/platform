// Represents the menu with the disciplines on the left of the application

// INTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"

import { Discipline } from "../../models/discipline"

export interface StateProps {
    // the disciplines list
    disciplines: Discipline[]
    // the actual discipline
    discipline: string
}

export interface ActionProps {  }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            disciplines,
            discipline
        } = this.props

        let disciplinesRender = [];
        for(let i = 0; i < disciplines.length; i++) {
            if (disciplines[i].name == discipline) {
                disciplinesRender.push(
                    <li key={i} className="active">
                        <Link to={ "/" + disciplines[i] } >
                            <div className="icon-bg bg-orange"/>
                            <span className="menu-title">{ disciplines[i].name }</span>
                        </Link>
                    </li>
                )
            } else {
                disciplinesRender.push(
                    <li key={i}>
                        <Link to={ "/" + disciplines[i] } >
                            <div className="icon-bg bg-orange"/>
                            <span className="menu-title">{ disciplines[i].name }</span>
                        </Link>
                    </li>
                )
            }
        }
        return (
            <div style={ {position: "absolute"} }>
                <nav id="sidebar" role="navigation" data-step="2" data-intro="Template has &lt;b&gt;many navigation styles&lt;/b&gt;"
                        data-position="right" className="navbar-default navbar-static-side" style={ {top: 0, bottom: 0} }>
                    <div className="sidebar-collapse menu-scroll">
                        <ul id="side-menu" className="nav">
                            <div className="clearfix"></div>
                            <li>
                                <Link to="/">
                                    <i className="fa fa-home">
                                        <div className="icon-bg bg-green"/>
                                    </i>
                                    <span className="menu-title">Accueil</span>
                                </Link>
                            </li>
                            { disciplinesRender }
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}