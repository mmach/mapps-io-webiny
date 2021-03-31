/*
    ./client/components/App.jsx
*/

import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { CommandList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import AddIcon from "@material-ui/icons/Add";

class UserTypesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };
  }
  filterHandler(event) {
    this.setState({
      filter: event.target.value
    });
  }

  removeUserTYpe(event) {
    this.props.removeDictionary(JSON.parse(event.target.getAttribute("data-tag")));
  }
  render() {
    const trans = Translator(this.props.codeList.data.LABEL, this.props.lang);
    return (
      <React.Fragment>
        <List>
          <Link to={`/mapps/users/settings/types/new`}>
            <ListItem button key={uuid()}>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary={trans.translate("USERTTYPE_NEW_USERTYPE")}></ListItemText>
            </ListItem>
          </Link>

          <Divider />

          {this.props.config.user_types.map((item) => {
            return (
              <Link key={uuid()} to={`/mapps/users/settings/types/edit/${item.id}`}>
                <ListItem button >
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
    config: state.ConfigReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeDictionary: (dto) => {
      dispatch(new BaseService().commandThunt(CommandList.REMOVE_DICTIONARY, dto));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTypesList);
