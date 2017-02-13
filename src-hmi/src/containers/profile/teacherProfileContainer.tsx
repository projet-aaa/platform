import { connect } from "react-redux";

import { View, StateProps, ActionProps } from "../../views/profile/teacherProfileView"

function mapStateToProps(state: any): StateProps {
    return { 
        lastName: "Mauran",
        firstName: "Philippe",
        mail: "mauran@etu.fr",
        // name of lessons a teacher teach
        lessons: ["PIM", "TOB", "PF"],
        // the groups a teacher have
        groups: ["3IN", "2IN"]
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