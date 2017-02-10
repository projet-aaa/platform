// represents a view with a list of tabs

// EXTERNAL IMPORTS
import * as React from "react"
import { Link } from "react-router"

export interface StateProps {
    // the tab names
    names: string[]
    // the actual tab name
    actualTabName: string
    // the tab views
    views: any[]
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            names,
            actualTabName,
            views
        } = this.props

        let tabs = []
        for (var i=0 ; i<names.length ; i++) {
            if (names[i] == actualTabName) {
                tabs.push(
                    <li className="active">
                        <a href={ "#" + names[i] } data-toggle="tab">{ names[i] }</a>
                    </li>
                )
            } else {
                tabs.push(
                    <li>
                        <a href={ "#" + names[i] } data-toggle="tab">{ names[i] }</a>
                    </li>
                )
            }
        }

        let tabViews = []
        for (var i=0 ; i<views.length ; i++) {
            if (names[i] == actualTabName) {
                tabViews.push(
                    <div id={ names[i] } className="tab-pane fade in active">
                        { views[i] }
                    </div>
                )
            } else {
                tabViews.push(
                    <div id={ names[i] } className="tab-pane fade">
                        { views[i] }
                    </div>
                )
            }
        }

        return (
            <div className="page-content">
                <div id="tab-general">
                    <ul id="generalTab" className="nav nav-tabs responsive">
                        { tabs }
                    </ul>
                    <div id="generalTabContent" className="tab-content responsive">
                        { tabViews }
                    </div>
                </div>
            </div>
        );
    }
}