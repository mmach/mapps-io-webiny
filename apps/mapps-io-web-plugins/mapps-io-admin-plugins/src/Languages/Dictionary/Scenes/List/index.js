/*
    ./client/components/App.jsx
*/

import { IconButton } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RemoveIcon from "@material-ui/icons/Remove";
import { CommandList, Enums, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { TextBox } from "mapps-io-base-plugins/src/Components/index.js";

class DictionaryList extends React.Component {
  constructor() {
    super();
    this.state = { filter: "", openedeCollapse: [] };
  }
  filterHandler(event) {
    this.setState({
      filter: event.target.value
    });
  }
  removeDictionary(event) {
    this.props.removeDictionary(JSON.parse(event.target.getAttribute("data-tag")));
  }
  openCollapse(event) {
    const collapsed = [...this.state.openedeCollapse];
    collapsed[event.currentTarget.dataset.key] = !collapsed[event.currentTarget.dataset.key];
    this.setState({
      openedeCollapse: collapsed
    });
  }
  render() {
    const trans = Translator(this.props.codeList.data.LABEL, this.props.lang);
    return (
      <div>
        <TextBox
          label={trans.translate("CODE_FILTER_LABEL")}
          value={this.state.filter}
          onChange={this.filterHandler.bind(this)}
        />
        <List>
          <Link to={`/mapps/languages/dictionaries/edit`}>
            <ListItem>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText >
                {trans.translate("DICTIONARY_ADD_NEW")}
              </ListItemText>
            </ListItem>
          </Link>

          {Object.keys(Enums.CODE).map((key, el) => {
            const matched = Object.values(this.props.codeList.data[Enums.CODE[key]]).filter(
              (item) => {
                return (
                  String(item.code).startsWith(this.state.filter) ||
                  String(item.code).indexOf(this.state.filter) > 0
                );
              }
            );
            return (
              <div
              
                key={uuid()}
              >
                <ListItem button
                  data-key={el}
                  onClick={this.openCollapse.bind(this)}
                >
                  <ListItemText>
                    {Enums.CODE[key] +
                      "  -  " +
                      matched.length +
                      " / " +
                      Object.values(this.props.codeList.data[Enums.CODE[key]]).length}
                  </ListItemText>
                  {this.state.openedeCollapse[el] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  data-key={el}
                  in={this.state.openedeCollapse[el]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List>
                    {Object.values(this.props.codeList.data[Enums.CODE[key]])
                      .sort((a, b) => {
                        return String(a.code) > String(b.code) ? 1 : -1;
                      })
                      .map((item, indx) => {
                        if (
                          String(item.code).startsWith(this.state.filter) ||
                          String(item.code).indexOf(this.state.filter) > 0
                        ) {
                          return (
                            <ListItem
                              className="justify-content-between "
                              key={indx}
                              title={JSON.stringify(item, null, 4)}
                            >
                              <ListItemText>
                                <Link
                                  to={"/mapps/languages/dictionaries/edit?code=" + item.code + "&type=" + Enums.CODE[key]}
                                >
                                  {item.code}
                                </Link>
                              </ListItemText>
                              <IconButton>
                                <RemoveIcon
                                  data-tag={JSON.stringify(item)}
                                  onClick={this.removeDictionary.bind(this)}
                                ></RemoveIcon>
                              </IconButton>
                            </ListItem>
                          );
                        }
                      })}
                  </List>
                </Collapse>
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeList: state.DictionaryReducer,
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeDictionary: (dto) => {
      dispatch(new BaseService().commandThunt(CommandList.Dictionary.REMOVE_DICTIONARY, dto));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryList);
