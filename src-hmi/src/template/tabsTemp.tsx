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
    props: Props

    render() {
        const {
            names,
            urls,
            actualTabName
        } = this.props

        let children = (this.props as any).children

        let tabs = []
        for (var i=0; i < names.length; i++) {
            if (names[i] == actualTabName) {
                tabs.push(
                    <li key={i} className="active">
                        <a>{ names[i] }</a>
                    </li>
                )
            } else {
                tabs.push(
                    <li key={i}>
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
                    <div key={i} id={ names[i] } className="tab-pane fade in active">
                        <div className="row">
                            { children[i] }
                        </div>
                    </div>
                )
            } else {
                tabViews.push(
                    <div key={i} id={ names[i] } className="tab-pane fade">
                        <div className="row">
                            { children[i] }
                        </div>
                    </div>
                )
            }
        }

        return (
            <div id="tab-general">
                <ul id="generalTab" className="nav nav-tabs responsive">
                    { tabs }
                </ul>
                <div id="generalTabContent" className="tab-content responsive">
                    { tabViews }
                </div>
            </div>
        );
    }
}