/*
    ./client/components/App.jsx
*/

import { QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class MailsListSender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };
  }

  componentDidMount() {
    this.props.getMail();
    this.props.getSenders();
    this.props.getMailsGlobal();
    this.props.getMailsParts();
  }

  render() {
    const trans = Translator(this.props.codeList.data.LABEL, this.props.lang);
    return (
      <React.Fragment>
        <List>
          <Link to={`/mapps/mails/accounts/new`}>
            <ListItem button key={uuid()}>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary={trans.translate("ADD")}></ListItemText>
            </ListItem>
          </Link>

          <Divider />

          {this.props.mailList.mail_senders.map((item) => {
            return (
              <Link key={uuid()} to={`/mapps/mails/accounts/edit/${item.id}`}>
                <ListItem button>
                  <ListItemText primary={item.email}></ListItemText>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </React.Fragment>
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
    getMail: (dto) => {
      dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_TYPE_PROJECT, dto));
    },
    getSenders: (dto) => {
      dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_SENDER, dto));
    },
    getMailsGlobal: (dto) => {
      dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_TYPE, dto));
    },
    getMailsParts: (dto) => {
      dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_PART, dto));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MailsListSender);
