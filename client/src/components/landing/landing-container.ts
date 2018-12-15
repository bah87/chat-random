import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Landing, ILandingProps } from "./landing";
import { loginUser } from "../../actions/session-actions";

const mapDispatchToProps = (dispatch: Dispatch): ILandingProps => ({
  loginUser: (username: string) => dispatch(loginUser(username))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Landing);
