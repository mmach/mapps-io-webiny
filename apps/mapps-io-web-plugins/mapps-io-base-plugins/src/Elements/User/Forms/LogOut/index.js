/*
    ./client/components/App.js
*/

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { mappsPlugins } from "./../../../../index.js";
import { CommandList, Enums, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseService } from "./../../../../App/index.js";
import { DIALOG_ALERT_ACTIONS, NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state.loading = false;
    this.state.logOut = 0;
    this.logoutView = mappsPlugins.byName(this.props.mappsSettings.mappsNameViewPlugin);
  }

  logOUt() {
    this.setState({
      loading: true
    });
    this.props.openDialog(
      true,
      <React.Fragment>
        <DialogTitle id="alert-dialog-slide-title">
          {Translator(this.props.codeDict.data.LABEL, this.props.lang).translate(
            "LOGOUT_CONFIRM_HEADER"
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {Translator(this.props.codeDict.data.LABEL, this.props.lang).translate(
              "LOGOUT_USER_TEXT_HEADER"
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.logOut().then(() => {
                this.setState({
                  loading: false,
                  logOut: 1
                });
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("refresh_token");

                this.props.closeDialog();
                this.props.setNotification(
                  Enums.CODE.SUCCESS_GLOBAL,
                  Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
                    "LOGGED_OUT_SUCCESS"
                  )
                );
                this.props.history.push("/");
              });
            }}
            color="primary"
          >
            {Translator(this.props.codeDict.data.LABEL, this.props.lang).translate("YES_LABEL")}
          </Button>
          <Button
            onClick={() => {
              this.setState({
                loading: false
              });
              this.props.closeDialog();
            }}
            color="primary"
          >
            {Translator(this.props.codeDict.data.LABEL, this.props.lang).translate("NO_LABEL")}
          </Button>
        </DialogActions>
      </React.Fragment>,
      () => {
        this.setState({
          loading: false
        });
      }
    );
  }
  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    this.open = false;
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    return (
      <span onClick={this.logOUt.bind(this)}>
        {this.logoutView && this.logoutView.render && 
          this.logoutView.render({ loading: this.state.loading, translate: tran.translate })}
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    user: state.UserReducer,
    auth: state.AuthReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDialog: (open, body, onClose) => {
      dispatch({
        type: DIALOG_ALERT_ACTIONS.OPEN_DIALOG,
        dto: {
          open: open,
          body: body,
          onClose: onClose
        }
      });
    },
    closeDialog: () => {
      dispatch({
        type: DIALOG_ALERT_ACTIONS.OPEN_DIALOG,
        dto: {}
      });
    },
    logOut: () => {
      return dispatch(new BaseService().commandThunt(CommandList.User.LOG_OUT, {}));
    },
    setNotification: (type, message) => {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
        notification: { message: message, type: type }
      });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogOut));
