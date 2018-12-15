import { connect } from "react-redux";

import { Landing } from "./landing";
import { receiveCurrentUser } from "../../actions/session-actions";

const mapDispatchToProps = (dispatch: any) => ({
  login: (username: string) => dispatch(receiveCurrentUser(username))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Landing);
