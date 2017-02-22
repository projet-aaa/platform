import { connect } from "react-redux"

import createConnector from "../../wrappers/connectionWrapper"

import Container from "./dashLogicContainer"

export default createConnector(Container, true)