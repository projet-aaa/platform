// Represents a page with a top band and a content

// EXTERNAL IMPORTS
import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

// INTERNAL IMPORTS
import TopBandContainer from "../containers/navigation/topBandContainer"

interface Props {
    mainLoading: boolean
    children: any
}

export default class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            mainLoading,
            children
        } = this.props

        // show the top band, the left menu and the path band
        // the content must be put into the div "page-wrapper" after the path band
        return (
            <div>
                <TopBandContainer/>
                <div className="page-content" style={ {paddingBottom: 0, paddingTop: 20} }>
                    { children }
                </div>
            </div>
        )
    }
}