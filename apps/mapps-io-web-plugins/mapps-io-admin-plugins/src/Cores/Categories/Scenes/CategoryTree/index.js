/*
    ./client/components/App.jsx
*/

import { Grid, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { CommandList, QueryList } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  DIALOG_ALERT_ACTIONS,
  NOTIFICATIONS_ACTIONS,
  TextBox
} from "mapps-io-base-plugins/src/Components/index.js";
import "./style.scss";

class CategoryTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: "src/", category: " ", children: [{ title: "index.js", category: " " }] }
      ],
      loading: false,
      categories: [],
      search: ""
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.categoryTree.categories != this.props.categoryTree.categories &&
      nextProps.categoryTree.categories.length > 0 &&
      nextProps.categoryTree.isLoading == false
    ) {
      return true;
    }
    if (nextState.categories != this.state.categories) {
      return true;
    }
    if (nextState.treeData != this.state.treeData) {
      return true;
    }
    if (nextState.search != this.state.search) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.categoryTree.categories != this.props.categoryTree.categories &&
      this.props.categoryTree.categories.length > 0 &&
      this.props.categoryTree.isLoading == false
    ) {
      this.loadData();
    }
  }
  loadData() {
    const verified = this.props.categoryTree.categories.filter((item) => {
      return item.status == 1;
    });
    const notVerified = this.props.categoryTree.categories.filter((item) => {
      return item.status == 0;
    });
    const resultVer = this.list_to_tree(
      verified.map((item) => {
        return item;
      })
    );
    const resultNotVer = this.list_to_tree(
      notVerified.map((item) => {
        return item;
      })
    );
    const result = [
      {
        title: "_VERIFIED",
        category: "_VERIFIED",
        status: 1,
        forEvent: true,
        forSell: true,
        forThing: true,
        expanded:
          verified.filter((item) => {
            return item.expanded == true;
          }).length > 0
            ? true
            : false,
        children: resultVer
      },
      {
        title: "_NOT_VERIFIED",
        category: "_NOT_VERIFIED",
        forEvent: true,
        forSell: true,
        forThing: true,
        status: 0,
        expanded:
          notVerified.filter((item) => {
            return item.expanded == true;
          }).length > 0
            ? true
            : false,
        children: resultNotVer
      }
    ];

    this.setState({
      categories: this.props.categoryTree.categories,
      treeData: result
    });
  }
  list_to_tree(list) {
    const map = {};
    let node;
    const roots = [];
    let i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].category_child_id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      try {
        node = list[i];
        if (node.category_parent_id !== null) {
          list[map[node.category_parent_id]].children.push(node);
        } else {
          roots.push(node);
        }
      } catch (exception) {}
    }
    return roots;
  }

  setParent(event) {
    const id = event.currentTarget.dataset.tag;
    const parentId = event.currentTarget.getAttribute("data-parent-tag");
    const status = event.currentTarget.getAttribute("data-status");

    //if (parentId) {
    const dto = {
      id: id,
      status: status,
      CategoryHierarchy: {
        category_parent_id: parentId
      }
    };
    this.props.setParent(dto).then(() => {
      this.loadData();
    });
  }
  setParentFromNode(parent) {
    //if (parentId) {
    const dto = {
      id: parent.id,
      status: parent.status,
      CategoryHierarchy: {
        category_parent_id: parent.parentId
      }
    };
    this.props.setParent(dto).then(() => {
      this.loadData();
    });
  }
  removeCategory(event) {
    const id = event.currentTarget.dataset.tag;

    event.preventDefault();
    this.setState({
      loading: true
    });

    this.props.openDialog(
      true,
      <React.Fragment>
        <DialogTitle id="alert-dialog-slide-title">Remove Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure that you want to remove this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.removeElements(id).then(() => {
                this.loadData();
              });
              this.props.closeDialog();
            }}
            color="primary"
          >
            YES
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
            NO
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
  toVerifyClick(event) {
    const id = event.currentTarget.getAttribute("data-tag");
    this.props.openDialog(
      true,
      <React.Fragment>
        <DialogTitle id="alert-dialog-slide-title">Verify Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to move category to verified section?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              const dto = {
                id: id,
                status: 1,
                CategoryHierarchy: {
                  category_parent_id: null
                }
              };
              this.props.setParent(dto).then(() => {
                this.loadData();
              });
              this.props.closeDialog();
            }}
            color="primary"
          >
            YES
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
            NO
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
  componentDidMount() {
    this.props.getAllCategories();
  }
  searchHandler(event) {
    const search = event.target.value;
    this.setState({
      search: String(search).toUpperCase()
    });
  }
  render() {
   
    return (
      <Grid>
        <TextBox
          label={"Filter"}
          isRequired={true}
          value={this.state.search}
          onChange={this.searchHandler.bind(this)}
          field="message.es"
          validation={this.state.validation}
        />

        <SortableTree
          rowHeight={55}
          style={{ height: "800px" }}
          treeData={this.state.treeData}
          onChange={(treeData) => {
            this.setState({ treeData: [...treeData] });
          }}
          onMoveNode={(element) => {
            if (element.prevTreeIndex != element.treeIndex) {
              this.setParentFromNode({
                id: element.node.id,
                parentId: element.nextParentNode.id,
                status: element.nextParentNode.status
              });
            }
            //  if (
            //   element.nextParentNode &&
            //   element.nextParentNode.category_child_id != element.node.category_parent_id
            //  ) {
            //    element.node.toSave = true;
            // }
            return element;
          }}
          searchQuery={this.state.search}
          onlyExpandSearchedNodes={true}
          canDrag={(node) => {
            if (
              ["_SPAM", "_NOT_VERIFIED", "_VERIFIED", "_TO_DO", "_ROOT"].includes(
                node.node.category
              )
            ) {
              return false;
            }
            return true;
          }}
          canDrop={(node) => {
            if (
              (node.nextParent.forEvent == node.node.forEvent ||
                node.nextParent.forEvent == true) &&
              (node.nextParent.forSell == node.node.forSell || node.nextParent.forSell == true) &&
              (node.nextParent.forThing == node.node.forThing || node.nextParent.forThing == true)
            ) {
              return true;
            }
            return false;
          }}
          //    nodeContentRenderer={CategoryTreeElement}
          generateNodeProps={(item) => {
            item.node.title =
              item.node.category && item.node.category.startsWith("_") ? (
                <span className="">
                  {item.node.icon ? <i className={item.node.icon}></i> : <span></span>}
                  <span className="">{String(item.node.category).toUpperCase()}</span>
                </span>
              ) : (
                <span>
                  {item.node.icon ? <i className={item.node.icon}></i> : <span></span>}
                  <Link
                    to={`/mapps/categories/categories/edit/${item.node.category_child_id}`}
                    className=" "
                  >
                    {String(item.node.category).toUpperCase()}
                  </Link>
                </span>
              );
            item.buttons = [];
            item.buttons.push(
              <Link
                to={`/mapps/categories/categories/add/${item.node.status}/${item.node.category_child_id}`}
                className=""
              >
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Link>
            );
            if (
              !["_SPAM", "_NOT_VERIFIED", "_VERIFIED", "_TO_DO", "_ROOT"].includes(
                item.node.category
              )
            ) {
              /*  if (item.node.toSave == true) {
                item.buttons.push(
                  <span
                    data-status={item.parentNode.status}
                    data-parent-tag={item.parentNode.category_child_id}
                    data-tag={item.node.category_child_id}
                    data-name={item.node.title}
                    onClick={this.setParent.bind(this)}
                  >
                    <IconButton>
                      <SaveIcon className="fa fa-floppy-o" />
                    </IconButton>
                  </span>
                );
              }*/
              /*if (item.node.status == 1) {
                item.buttons.push(
                  <span
                    data-tag={item.node.category_child_id}
                    data-name={item.node.category}
                    onClick={this.toDoClick.bind(this)}
                  >
                    <i className="fa fa-exclamation-triangle"></i>
                  </span>
                );
              }*/
              if (item.node.status == 0) {
                item.buttons.push(
                  <span
                    data-tag={item.node.category_child_id}
                    data-name={item.node.category}
                    onClick={this.toVerifyClick.bind(this)}
                  >
                    <IconButton>
                      <CheckIcon />
                    </IconButton>
                  </span>
                );
              }

              /*  item.buttons.push(
                <span
                  data-tag={item.node.category_child_id}
                  data-name={item.node.category}
                  onClick={this.toSpamClick.bind(this)}
                >
                  <IconButton>
                    <DeleteForeverIcon />
                  </IconButton>
                </span>
              );*/
              item.buttons.push(
                <span
                  data-tag={item.node.category_child_id}
                  data-name={item.node.category}
                  onClick={this.removeCategory.bind(this)}
                >
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </span>
              );
            }

            return item;
          }}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeList: state.DictionaryReducer,
    lang: state.LanguageReducer,
    categoryTree: state.CategoryTreeReducer
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
    getAllCategories: () => {
      return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_ALL_TREE, {}));
    },
    removeElements: (id) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Category.DELETE_CATEGORY, { id: id })
      );
    },
    setParent: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Category.SET_PARENT, dto));
    },
    setNotification: (type, message) => {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
        notification: { message: message, type: type }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CategoryTree));
