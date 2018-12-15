import { connect } from "react-redux";

import { IAppState } from "../../store/store";
import { Home, IHomeProps } from "./home";

const mapStateToProps = (state: IAppState): IHomeProps => ({
  username: state.username
});

export default connect(
  mapStateToProps,
  undefined
)(Home);
