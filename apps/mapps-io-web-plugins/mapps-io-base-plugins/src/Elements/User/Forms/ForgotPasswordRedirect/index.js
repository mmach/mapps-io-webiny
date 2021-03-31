/*
    ./client/components/App.js
*/

import { NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";
import { CommandList, Enums, Translator, UserForgotPasswordDTO } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseService } from "./../../../../App/index.js";

class ForgotPasswordRedirect extends React.Component {
  constructor() {
    super();
    this.state = new UserForgotPasswordDTO();
    this.state.validation = [];
  }
  componentDidMount() {
    if (this.props.match.params.uid) {
      this.props.forgotPassowrd({ uid: this.props.match.params.uid }).then(() => {
        this.props.setNotification(
          Enums.CODE.SUCCESS_GLOBAL,
          Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
            "PASSWORD_HAS_BEEN_SEND_SUCCESS"
          )
        );
        //  this.props.history.push("/");
      });
    }
  }

  render() {
    return <span></span>;
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassowrd: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.User.FORGOT_PASSWORD,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordRedirect));
