/*
    ./client/components/App.js
*/

import { NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";
import { CommandList, Enums, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseService } from "./../../../../App/index.js";

class AuthorizeUser extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.authorizeUser({ uid: this.props.match.params.uid }).then(() => {
      this.props.setNotification(
        Enums.CODE.SUCCESS_GLOBAL,
        Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
          "AUTHORIZE_USER_SUCCESS"
        )
      );

//      this.props.history.push("/");
    });
  }

  render() {
    return <span></span>;
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    forgotPassword: state.ForgotPasswordReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authorizeUser: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.User.AUTHORIZE_USER,
          dto,
          null,
          Enums.LOADER.INITIAL
        )
      );
    },
    setNotification: (type, message) => {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
        notification: { message: message, type: type }
      });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthorizeUser));
