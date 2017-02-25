import * as React from "react";
import { Link } from "react-router"

export interface StateProps {
    // the name of the app
    appName: string
    // the user full name
    userFullName: string
}
export interface ActionProps {}

// style for nav bar
var noMarginBottom = {
    marginBottom: 0
}
var noMarginRight = {
    marginRight: 0
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            appName,
            userFullName
        } = this.props;
        return (
            <div id="header-topbar-option-demo" className="page-header-topbar">
            <nav id="topbar" role="navigation" data-step="3" className="navbar navbar-default navbar-static-top" style={ noMarginBottom }>
                <div className="navbar-header">
                    <span id="logo" href="#" className="navbar-brand" disabled>
                    <span className="fa fa-rocket"></span>
                    <span className="logo-text">{ appName }</span>
                    </span>
                </div>
                <div className="topbar-main">
                    <ul className="nav navbar navbar-top-links navbar-right mbn height-covering" style={ noMarginRight }>
                        <li className="dropdown topbar-user height-covering" style={ noMarginRight }>
                            <a data-hover="dropdown" href="#" className="dropdown-toggle" data-toggle="dropdown">
                                &nbsp;
                                <span className="hidden-xs">{ userFullName }</span>
                                &nbsp;
                                <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu dropdown-user pull-right">
                                <li><i className="fa fa-user"></i>Mon Profil</li>
                                <li><i className="fa fa-key"></i>Déconnection</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
        );
    }
}