import * as React from "react";
import { Link } from "react-router"

export interface StateProps {
    disciplines: string[]
}
export interface ActionProps {}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            disciplines
        } = this.props;
        var disciplinesRender = [];
        for(var i=0;i<disciplines.length;i++) {
            disciplinesRender.push(
                <li>
                    <Link to="/">
                        <div className="icon-bg bg-orange"/>
                        <span className="menu-title">{disciplines[i]}</span>
                    </Link>
                </li>
            )
        }
        return (
            <div>
                <nav id="sidebar" role="navigation" data-step="2" data-intro="Template has &lt;b&gt;many navigation styles&lt;/b&gt;"
                        data-position="right" className="navbar-default navbar-static-side">
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