import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/Remove";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { TextBox } from "mapps-io-base-plugins/src/Components/index.js";

class CategoryOptionsListByType extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };
    this.state.categoryOptionsType = [];
    this.state.categoryOptions = [];
    this.state.openedeCollapse = [];
    props
      .getCategoryOptionsType()
      .then((succ) => {
        this.setState({
          categoryOptionsType: succ.data
        });
        return props.getCategoryOptions();
      })
      .then((succ) => {
        this.setState({
          categoryOptions: succ.data
        });
      });
  }

  filterHandler(event) {
    this.setState({
      filter: event.target.value
    });
  }
  removeOption(event) {
    const id = event.currentTarget.dataset.tag;
    this.props
      .removeCategoryOptions({
        id: id
      })
      .then(() => {
        this.props.getCategoryOptions();
        this.setState({
          categoryOptions: this.state.categoryOptions.filter((item) => {
            return item.id != id;
          })
        });
      });
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
          <Link to={`/mapps/categories/categoriesOptions/new`}>
            <ListItem>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText>{trans.translate("Add")}</ListItemText>
            </ListItem>
          </Link>

          {this.state.categoryOptionsType.map((item, el) => {
            const catFiltered = this.state.categoryOptions.filter((element) => {
              return element.cot_id == item.id;
            });
            const matched = catFiltered.filter((item) => {
              return (
                String(item.name.toLowerCase()).startsWith(this.state.filter.toLowerCase()) ||
                String(item.name.toLowerCase()).indexOf(this.state.filter.toLowerCase()) > 0
              );
            });
            return (
              <div key={uuid()}>
                <ListItem button data-key={el} onClick={this.openCollapse.bind(this)}>
                  <ListItemText>
                    {item.name + "  -  " + matched.length + " / " + catFiltered.length}
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
                    {catFiltered
                      .sort((a, b) => {
                        return String(a.code) > String(b.code) ? 1 : -1;
                      })
                      .map((item, indx) => {
                        if (
                          String(item.name)
                            .toUpperCase()
                            .startsWith(this.state.filter.toUpperCase()) ||
                          String(item.name).toUpperCase().indexOf(this.state.filter.toUpperCase()) >
                            0
                        ) {
                          return (
                            <ListItem
                              className="justify-content-between "
                              key={indx}
                              title={JSON.stringify(item, null, 4)}
                            >
                              <ListItemText>
                                <Link to={`/mapps/categories/categoriesOptions/${item.id}`}>
                                  {item.name}
                                </Link>
                              </ListItemText>
                              <IconButton>
                                <RemoveIcon
                                  data-tag={item.id}
                                  onClick={this.removeOption.bind(this)}
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
    getCategoryOptionsType: (dto) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, dto)
      );
    },
    getCategoryOptions: (dto) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS, dto)
      );
    },
    removeCategoryOptions: (dto) => {
      return dispatch(
        new BaseService().queryThunt(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS, dto)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionsListByType);
