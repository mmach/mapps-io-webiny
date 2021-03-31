/*
    ./client/components/App.js
*/

import React from "react";
import { connect } from "react-redux";
import { Enums, Translator, CommandList } from "justshare-shared";
import { BaseService } from "./../../../../App/index.js";
import { ButtonLoader, DIALOG_ALERT_ACTIONS, NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class RemoveUser extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.state.validation = [];
    this.open = false;
    this.toggle = this.toggle.bind(this);
    this.state.activeTab = "1";
    this.state.loading = false;
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.props.closeWindow();
  }
  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    this.open = false;
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  confirmRemoveAccount(event) {
    event.preventDefault();
    this.setState({
      loading: true
    });

    this.props.openDialog(
      true,
      <React.Fragment>
        <DialogTitle id="alert-dialog-slide-title">
          {" "}
          {Translator(this.props.codeDict.data.LABEL, this.props.lang).translate(
            "REMOVE_USER_HEADER"
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {Translator(this.props.codeDict.data.LABEL, this.props.lang).translate(
              "REMOVE_USER_TEXT"
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.removeAccounts().then(() => {
                this.setState({
                  loading: false
                });
                this.props.setNotification(
                  Enums.CODE.SUCCESS_GLOBAL,
                  Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
                    "REMOVE_USER_SUCCESS"
                  )
                );
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("refresh_token");
                this.props.closeDialog();
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

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    const body = (
      <ButtonLoader
        isLoading={this.state.loading}
        onClick={this.confirmRemoveAccount.bind(this)}
        size={"md"}
        value={tran.translate("REMOVE_ACCOUNT_BUTTON_LABEL")}
      />
    );
    return body;
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    user: state.UserReducer,
    auth: state.AuthReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDialog: () => {
      dispatch({
        type: DIALOG_ALERT_ACTIONS.OPEN_DIALOG,
        dto: {}
      });
    },
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
    removeAccounts: () => {
      return dispatch(
        new BaseService().commandThunt(CommandList.User.REMOVE_USER, {}, localStorage.token)
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

export default connect(mapStateToProps, mapDispatchToProps)(RemoveUser);
