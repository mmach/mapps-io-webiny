/*
    ./client/components/App.js
*/

import React from "react";
import { connect } from "react-redux";

class ActionsAccess extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const access = this.props.config.actions.filter((item) => {
      return item.action == this.props.action;
    })[0];
    if (!access) {
      return <span></span>;
    }
    const funcAuths = access.privileges.map((item) => {
      return this.props.config.privs_list[item.name.trim()] &&
        this.props.config.privs_list[item.name.trim()].func_front
        ? this.props.config.privs_list[item.name.trim()].func_front
        : this.props.config.privs_list[item.name.trim()].func;
    });

    if (
      funcAuths.filter((func) => {
        return func.bind(this)(this.props.params);
      }).length > 0
    ) {
      return this.props.children;
    } else {
      return this.props.unsuf_body ? this.props.unsuf_body : <span></span>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.AuthReducer,
    config: state.ConfigReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionsAccess);
