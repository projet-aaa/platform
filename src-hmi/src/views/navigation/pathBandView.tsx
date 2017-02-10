// Reprents the band at the top of the page content which contains 
// the actual page name and the path from home page

// EXTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"

export interface StateProps {
    // the path from home page
    path: string[]
}
export interface ActionProps {}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            path,
        } = this.props;

        // this var is the render off the path (home > page 1 > page 1.1)
        var pathRender = [];
        if (path.length == 0) {
            pathRender.push(
                <li className="active"><i className="fa fa-home"></i>&nbsp;<Link to="/">Accueil</Link></li>
            )
        } else {
            pathRender.push(
                <li><i className="fa fa-home"></i>&nbsp;<Link to="/">Accueil</Link></li>
            )
            for(var i=0;i<path.length-1;i++) {
                pathRender.push(
                    <li>&nbsp;&nbsp;<i className="fa fa-angle-right"></i>&nbsp;&nbsp;
                    <Link to="/">{path[i]}</Link></li>
                )
            }
            pathRender.push(
                <li className="active">&nbsp;&nbsp;<i className="fa fa-angle-right"></i>&nbsp;&nbsp;
                <Link to="/">{path[path.length-1]}</Link></li>
            )
        }

        // shows a band with the actual location on the left and the path on the right
        return (
            <div id="title-breadcrumb-option-demo" className="page-title-breadcrumb">
                <div className="page-header pull-left">
                    <div className="page-title">
                        { path[path.length - 1] }
                    </div>
                </div>
                <ol className="breadcrumb page-breadcrumb pull-right">
                    {pathRender}
                </ol>
                <div className="clearfix">
                </div>
            </div>
        );
    }
}