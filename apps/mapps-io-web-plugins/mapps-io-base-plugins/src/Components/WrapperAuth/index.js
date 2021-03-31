/*
    ./client/components/App.js
*/

import React from "react";
import { connect } from "react-redux";

class WrapperAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.isLogged = props.isLogged == false ? props.isLogged : true;
    this.state.ref = props.ref;
    this.state.fadeIn = true;
  }

  render() {
    if (this.props.auth.is_logged == this.state.isLogged) {
      return this.props.children;
    } else {
      return <span className="hidden"></span>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.AuthReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WrapperAuth);
