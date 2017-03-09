import * as React from "react";
import { Link } from "react-router"

export interface StateProps {
    // the name of the app
    appName: string
    // the user full name
    userFullName: string
    isAdmin: boolean
}
export interface ActionProps {}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            appName,
            userFullName,
            isAdmin
        } = this.props
        
        return (
            <div id="header-topbar-option-demo" className="page-header-topbar">
                <nav id="topbar" role="navigation" data-step="3" className="navbar navbar-default navbar-static-top" style={ {marginBottom: 0} }>
                    <div className="topbar-main">
                        <div className="pull-left">
                            <a id="logo" href="#" className="navbar-brand">
                                <span className="fa fa-rocket"></span>
                                <span className="logo-text">{ appName }</span>
                            </a>
                        </div>
                        <div className="pull-right height-covering">
                            <div className="nav navbar navbar-top-links navbar-right mbn height-covering" style={ {marginRight: 0} }>
                                <li className="dropdown topbar-user height-covering" style={ {marginRight: 0, bottom: 0} }>
                                    <a data-hover="dropdown" href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <span>{ userFullName != null && userFullName }</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-user pull-right">
                                        <li><Link to="/profil"><i className="fa fa-user"></i>Mon Profil</Link></li>
                                        <li><a href="/logout"><i className="fa fa-key"></i>Déconnection</a></li>
                                        { isAdmin && <li><a href="/admin"><i className="fa fa-lock"></i>Espace admin</a></li>}
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}