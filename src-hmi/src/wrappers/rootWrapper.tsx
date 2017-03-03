import { connect } from "react-redux"
import * as React from "react"
import * as _ from "underscore"

import { startMainLoad, endMainLoad, endFixLoad } from "../store/navigation/actions"

import { auth } from "../store/auth/actions"

import { id, username, password } from "../models/consts"

export default function rootWrapper(mapState, mapDispatch, mergeProps, onEnter: (props, done: () => void) => void, onExit: (props) => void, Component) {
    function mapStateToProps(state) {
        return { 
            mainLoading: state.navigation.mainLoading
        }
    }
    function mapDispatchToProps(dispatch) {
        return {
            endFixLoad: () => dispatch(endFixLoad()),
            startMainLoad: () => dispatch(startMainLoad()),
            endMainLoad: () => dispatch(endMainLoad()),
            auth: (promise) => dispatch(auth(id, username, password, promise))
        }
    }

    class Wrapper extends React.Component<any, any> {
        timeout
        loading: boolean
        componentWillMount () {
            this.props.startMainLoad()
            this.loading = true
            this.timeout = setTimeout(() => {
                this.loading = false
                this.props.endFixLoad()
            }, 100)
            this.props.auth(() => {
                if(onEnter) { 
                    onEnter(this.props, () => this.props.endMainLoad()) 
                } else {
                    this.props.endMainLoad()
                }
            })
        }

        componentDidUpdate (prevProps) {
            if (!_.isEqual(this.props.params, prevProps.params)) {
                this.props.startMainLoad()
                if(onEnter) { 
                    onEnter(this.props, () => this.props.endMainLoad()) 
                } else {
                    this.props.endMainLoad()
                }
            }
        }

        componentWillUnmount() {
            if(onExit) {
                onExit(this.props)
            }
        }

        render () { 
            let tmp = this.loading
            this.loading = false
            clearTimeout(this.timeout)
            
            return (!this.props.mainLoading && !tmp ? 
                <Component {...this.props} /> : 
                <div className="loader" style={ { } }></div>) 
        }
    }
        
    if(mapState) {
        if(mergeProps) {
            return connect<any, any, any>( 
                mapStateToProps,
                mapDispatchToProps
            )(connect<any, any, any>(
                mapState,
                mapDispatch,
                mergeProps
            )(Wrapper))
        } else {
            return connect<any, any, any>( 
                mapStateToProps,
                mapDispatchToProps
            )(connect<any, any, any>(
                mapState,
                mapDispatch
            )(Wrapper))
        }
    } else {
        return connect<any, any, any>( 
            mapStateToProps,
            mapDispatchToProps
        )(Wrapper)
    }
}
