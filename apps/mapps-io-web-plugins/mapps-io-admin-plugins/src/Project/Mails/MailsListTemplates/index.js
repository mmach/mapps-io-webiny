/*
    ./client/components/App.jsx
*/

import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";

class MailsListTemplates extends React.Component {
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
          <Link to={`/mapps/mails/templates/new`}>
            <ListItem button key={uuid()}>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary={trans.translate("ADD")}></ListItemText>
            </ListItem>
          </Link>

          <Divider />

          {this.props.mailList.mail_types.map((item) => {
            return (
              <Link key={uuid()} to={`/mapps/mails/templates/edit/${item.id}`}>
                <ListItem button>
                  <ListItemText primary={item.translation[this.props.lang]}></ListItemText>
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
export default connect(mapStateToProps, mapDispatchToProps)(MailsListTemplates);
