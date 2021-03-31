/*
    ./client/components/App.js
*/

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class GuardAuth extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    Redirect() {
        this.props.history.push("/?redirectTo=" + encodeURIComponent(this.props.location.pathname));
    }

    render() {
        if (this.props.auth.is_logged == true) {
            return this.props.children;
            // <Route path={this.props.path} component={this.props.component} render={this.props.render} />
        } else {
            this.Redirect();
            return <span></span>;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GuardAuth));
