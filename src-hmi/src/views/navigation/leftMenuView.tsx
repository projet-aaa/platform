// Represents the menu with the disciplines on the left of the application

// INTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"

export interface StateProps {
    // the disciplines list
    disciplines: string[]
    // the actual discipline
    discipline: string
}

export interface ActionProps {  }

// style
var navbarPosition = {
    top: 0,
    bottom: 0
}

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
            if (disciplines[i] == discipline) {
                disciplinesRender.push(
                    <li key={i} className="active">
                        <Link to="/" onClick={e => e.preventDefault()}>
                            <div className="icon-bg bg-orange"/>
                            <span className="menu-title">{disciplines[i]}</span>
                        </Link>
                    </li>
                )
            } else {
                disciplinesRender.push(
                    <li key={i}>
                        <Link to={ "/" + disciplines[i] } >
                            <div className="icon-bg bg-orange"/>
                            <span className="menu-title">{disciplines[i]}</span>
                        </Link>
                    </li>
                )
            }
        }
        return (
            <div>
                <nav id="sidebar" role="navigation" data-step="2" data-intro="Template has &lt;b&gt;many navigation styles&lt;/b&gt;"
                        data-position="right" className="navbar-default navbar-static-side" style={ navbarPosition }>
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
                            {disciplinesRender}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}