import { connect } from "react-redux"

import createConnector from "../connection/connectionContainer"

import Container from "./presLogicContainer"

function mapStateToProps(state, ownProps) {
    return { }
}

function mapDispatchToProps(dispatch, ownProps) {
    return { }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign(stateProps, dispatchProps, ownProps)
}

export default createConnector(Container, true)