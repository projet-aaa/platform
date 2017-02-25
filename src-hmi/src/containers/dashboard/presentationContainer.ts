import { connect } from "react-redux"

import createConnector from "../../wrappers/connectionWrapper"

import Container from "./presLogicContainer"

export default createConnector(Container)