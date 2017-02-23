import { connect } from "react-redux"
import * as React from "react"
import * as _ from "underscore"

import { auth } from "../store/auth/actions"
import { AuthState } from "../store/auth/reducer"

import { id, username, password } from "../models/consts"

export default function rootWrapper(mapState, mapDispatch, mergeProps, fn, Component) {
    function mapStateToProps(state) {
        return { }
    }
    function mapDispatchToProps(dispatch) {
        return {
            auth: (promise) => dispatch(auth(id, username, password, promise))
        }
    }

    class Wrapper extends React.Component<any, any> {
            componentWillMount () {
                this.props.auth(() => {
                    console.log("authentification done!")
                    if(fn) { fn(this.props) }
                })
            }

            render () { return (<Component {...this.props} />) }
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
