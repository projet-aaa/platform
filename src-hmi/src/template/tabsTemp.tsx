// represents a view with a list of tabs

// EXTERNAL IMPORTS
import * as React from "react"
import { Link } from "react-router"

export interface StateProps {
    // the tab names
    names: string[]
    urls: string[]
    // the actual tab name
    actualTabName: string
}

export interface ActionProps { 
    
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<any, any> {
    props: any

    render() {
        const {
            names,
            urls,
            actualTabName,
            children
        } = this.props

        let tabs = []
        for (var i=0; i < names.length; i++) {
            if (names[i] == actualTabName) {
                tabs.push(
                    <li className="active">
                        <a>{ names[i] }</a>
                    </li>
                )
            } else {
                tabs.push(
                    <li>
                        <Link to={ urls[i] } >
                            { names[i] }
                        </Link>
                    </li>
                )
            }
        }

        let tabViews = []
        for (var i=0; i < children.length; i++) {
            if (names[i] == actualTabName) {
                tabViews.push(
                    <div id={ names[i] } className="tab-pane fade in active">
                        { children[i] }
                    </div>
                )
            } else {
                tabViews.push(
                    <div id={ names[i] } className="tab-pane fade">
                        { children[i] }
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