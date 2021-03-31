import { Grid, Typography } from "@material-ui/core";
import { CommandList, MailSendersDTO, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { ButtonLoader, Checkbox, TextBox, TranslateCompnent } from "mapps-io-base-plugins/src/Components/index.js";

class MailsSender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.sender = new MailSendersDTO();
    this.state.sender.id = uuid();
    this.state.sender.translation = {
      id: uuid()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      return true;
    } else if (this.state.sender != nextState.sender) {
      return true;
    } else if (this.props.mailList.mail_senders != nextProps.mailList.mail_senders) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.id != this.props.match.params.id ||
      this.props.mailList.mail_senders != prevProps.mailList.mail_senders
    ) {
      this.props.mailList.mail_senders.forEach((item) => {
        if (item.id == this.props.match.params.id) {
          this.setState({
            sender: item
          });
        }
      });
    }
  }
  componentDidMount() {
    this.props.mailList.mail_senders.forEach((item) => {
      if (item.id == this.props.match.params.id) {
        this.setState({
          sender: item
        });
      }
    });
  }
  submitHanlder() {
    this.props.upsertMailSender(this.state.sender).then(() => {
      this.props.getSenders().then(() => {
        this.props.history.push("/mapps/mails/accounts/edit/" + this.state.sender.id);
      });
    });
  }
  render() {
    const tran = Translator(this.props.codeList.data.LABEL, this.props.lang);

    return (
      <Grid container>
        <Grid item xs="12">
          <Typography
            style={{
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "1px solid #999"
            }}
            variant="h6"
            component="h2"
          >
            {tran.translate("Mail sender")}
          </Typography>
        </Grid>
        <Grid item xs="8">
          <TranslateCompnent
            setTranslate={(translate) => {
              this.setState({ sender: { ...this.state.sender, translation: translate } });
            }}
            translation={this.state.sender.translation}
          ></TranslateCompnent>
        </Grid>
        <Grid item xs="12">
          <TextBox
            label={tran.translate("MAIL_SENDER_NAME_ACTIONS")}
            value={this.state.sender.email}
            onChange={(event) => {
              this.setState({ sender: { ...this.state.sender, email: event.target.value } });
            }}
          ></TextBox>
        </Grid>
        <Grid item xs="12">
          <TextBox
            label={tran.translate("MAIL_SENDER_PASSWORD_ACTIONS")}
            value={this.state.sender.password}
            onChange={(event) => {
              this.setState({ sender: { ...this.state.sender, password: event.target.value } });
            }}
          ></TextBox>
        </Grid>
        <Grid item xs="12">
          <TextBox
            label={tran.translate("MAIL_SENDER_SENDGRID_ACTIONS")}
            value={this.state.sender.sendgrid_key}
            onChange={(event) => {
              this.setState({
                sender: { ...this.state.sender, sendgrid_key: event.target.value }
              });
            }}
          ></TextBox>
        </Grid>
        <Grid item xs="12">
          <TextBox
            label={tran.translate("MAIL_SENDER_SMTP_HOST_ACTIONS")}
            value={this.state.sender.smtp_host}
            onChange={(event) => {
              this.setState({ sender: { ...this.state.sender, smtp_host: event.target.value } });
            }}
          ></TextBox>
        </Grid>
        <Grid item xs="12">
          <TextBox
            label={tran.translate("MAIL_SENDER_PORT_ACTIONS")}
            value={this.state.sender.smtp_port}
            onChange={(event) => {
              this.setState({ sender: { ...this.state.sender, smtp_port: event.target.value } });
            }}
          ></TextBox>
        </Grid>
        <Grid item xs="12">
          <Checkbox
            label={tran.translate("MAIL_SENDER_SECURITY_ACTIONS")}
            value={this.state.sender.smtp_security}
            onChange={(event) => {
              this.setState({
                sender: { ...this.state.sender, smtp_security: event.target.checked }
              });
            }}
          ></Checkbox>
        </Grid>

        <ButtonLoader
          onClick={this.submitHanlder.bind(this)}
          color={"primary"}
          className={
            "g-mx-5 btn u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
          }
          value={tran.translate("ACTION_BUTTON_SAVE")}
          isLoading={this.state.newLoading}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeList: state.DictionaryReducer,
    lang: state.LanguageReducer,
    mailList: state.MailsListReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertMailSender: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Mail.UPSERT_MAIL_SENDER, dto));
    },
    getSenders: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_SENDER, dto));
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailsSender));
