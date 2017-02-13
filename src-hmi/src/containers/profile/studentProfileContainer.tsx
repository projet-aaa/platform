import { connect } from "react-redux";

import { View, StateProps, ActionProps } from "../../views/profile/studentProfileView"

function mapStateToProps(state: any): StateProps {
    return { 
        lastName: "Gibson",
        firstName: "Emerick",
        mail: "emerick.gibson@hotmail.fr",
        group: "3INB",
        lessons: ["TOB", "PIM", "PF"]
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