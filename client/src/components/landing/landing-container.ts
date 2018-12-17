import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loginUser } from "../../actions/session-actions";
import { Landing, ILandingProps } from "./landing";

const mapDispatchToProps = (dispatch: Dispatch): ILandingProps => ({
  loginUser: (username: string) => dispatch(loginUser(username))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Landing);
