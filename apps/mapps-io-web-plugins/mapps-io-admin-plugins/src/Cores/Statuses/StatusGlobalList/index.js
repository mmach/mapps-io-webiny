import { ListItem, List, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import AddIcon from "@material-ui/icons/Add";

class StatusGlobalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };
  }

  componentDidMount() {
    this.props.getStatuses();
    this.props.getStatusesProject();
  }

  render() {
    const trans = Translator(this.props.codeList.data.LABEL, this.props.lang);
    return (
      <React.Fragment>
        <List>
          <Link to={`/mapps/status/global/new`}>
            <ListItem button key={uuid()}>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary={trans.translate("MAIL_TYPE_ADD_NEW")}></ListItemText>
            </ListItem>
          </Link>

          <Divider />

          {this.props.statuses.statuses
            .sort((a, b) => {
              return a.status_order > b.status_order ? 1 : -1;
            })
            .map((i) => {
              return (
                <Link key={uuid()} to={`/mapps/status/global/edit/${i.id}`}>
                  <ListItem button>
                    <ListItemText primary={i.token}></ListItemText>
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
    statuses: state.StatusListReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatuses: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Status.GET_GLOBAL_STATUSES, dto));
    },
    getStatusesProject: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Status.GET_STATUS, dto));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StatusGlobalList);
