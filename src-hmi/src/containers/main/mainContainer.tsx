import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/main/mainView"

function mapStateToProps(state: any): StateProps {
    return { 

    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)