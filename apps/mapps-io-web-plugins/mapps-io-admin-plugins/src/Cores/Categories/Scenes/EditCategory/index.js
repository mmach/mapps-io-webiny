import { Chip, Grid, Typography, Card, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
/*
    ./client/components/App.jsx
*/
import "./style.scss";
import {
  BlobBase64DTO,
  CategoryDTO,
  CommandList,
  DictionaryDTO,
  Enums,
  QueryList,
  Translator
} from "justshare-shared";
import React from "react";
import { ChromePicker } from "react-color";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import "react-table-hoc-fixed-columns/lib/styles.css";

import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  ButtonLoader,
  TextBox,
  TranslateCompnent,
  DropDownList,
  MODAL_ACTIONS,
  NOTIFICATIONS_ACTIONS,
  BodyLoader
} from "mapps-io-base-plugins/src/Components/index.js";
import Image from "material-ui-image";
import CheckIcon from "@material-ui/icons/Check";
import CagtegoryLinkEditModal from "../CagtegoryLinkEditModal";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AceEditor from "react-ace";
import InputIcon from "@material-ui/icons/Input";
const ReactTableFixedColumns = withFixedColumns(ReactTable);

function ParamsEditor(props) {
  const [param, setParam] = React.useState(props.params);
  function onSubmit() {
    props.onSubmit(param);
  }
  return (
    <>
      <AceEditor
        mode={"json"}
        theme="monokai"
        value={param}
        onChange={(code) => {
          setParam(code);
        }}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,

          width: "50vw",
          height: "500px"
        }}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
      />
      <ButtonLoader onClick={onSubmit} size={"md"} color={"primary"} value={"Save"} />
    </>
  );
}

class CategoryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.category = new CategoryDTO();
    this.state.category.translation = {};
    this.state.categoryOptions = [];
    this.state.validation = [];
    this.state.rowEdit = "";
    this.state.file = null;
    this.state.actions = {};
    this.state.actionsLinked = [];
    this.state.coList = [];
    this.state.loading = false;
    this.fileUploader = React.createRef();
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.setState({ loading: true });
      Promise.all([
        this.props.getCategories(this.props.match.params.id),
        this.props.getCategoryOptions(this.props.match.params.id),
        this.props.getActions({ category_id: this.props.match.params.id }),
        this.props.getCategoryOptionsAll()
      ]).then((succ) => {
        this.setState({
          loading: false,
          category: succ[0].data[0],
          file: succ[0].data[0].icon_blob,
          categoryOptions: succ[1].data,
          actionsLinked: succ[2].data,
          coList: succ[3].data
        });
      });
    }
    //this.setState({
    // category: { ...this.state.category, id: next.match.params.id }
    //});
  }
  componentDidMount() {
    this.setState({ loading: true });
    Promise.all([
      this.props.getCategories(this.props.match.params.id),
      this.props.getCategoryOptions(this.props.match.params.id),

      this.props.getActions({ category_id: this.props.match.params.id }),
      this.props.getCategoryOptionsAll()
    ]).then((succ) => {
      this.setState({
        loading: false,
        category: succ[0].data[0],
        file: succ[0].data[0].icon_blob,
        categoryOptions: succ[1].data,
        actionsLinked: succ[2].data,
        coList: succ[3].data
      });
    });
    this.setState({
      category: { ...this.state.category, id: this.props.match.params.id }
    });
  }

  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        //          this.validation();
      });
    }
  }

  validation() {
    const validation = DictionaryDTO.prototype.validation(this.state);
    this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
    validation.map((item) => {
      item.msg = this.tran.translate(item.failed, ...item.value);
    });
    this.setState({
      validation: validation
    });
    return validation;
  }

  submitHanlder(event) {
    event.preventDefault();
    //   if (this.validation().length == 0) {
    // this.props.code=this.state;
    this.props.editCategory(this.state.category).then(() => {
      this.props.setNotification(
        Enums.CODE.SUCCESS_GLOBAL,
        Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
          "CATEOGRY_HAS_BEEN_MODIFIED_SUCCESS"
        )
      );
    });

    //   }
  }

  expireHandler(event) {
    const cat = this.state.category;
    cat.expired_day = event.target.value;
    this.setState({
      category: cat
    });
  }

  openModal(event) {
    const row = this.state.categoryOptions.filter((item) => {
      return item.id == event.currentTarget.dataset.tag;
    })[0];
    const link = row.category_link.filter((item) => {
      return item.category_id == this.state.category.id;
    })[0];
    const id = link.id;

    this.props.openModal(true, <CagtegoryLinkEditModal id={id} />);

    //  this.props.openModal(true, MODALS_VIEW.CATEGORY_LINK_EDIT, { id: id });
  }

  handleColorChange({ hex }) {
    this.setState({
      category: { ...this.state.category, color: hex }
    });
  }
  onDeleteRow(event) {
    const id = event.currentTarget.dataset.tag;
    const row = this.state.categoryOptions.filter((item) => {
      return item.id == id;
    })[0];
    const link = row.category_link.filter((item) => {
      return item.category_id == this.state.category.id;
    })[0];
    const catOptions = this.state.categoryOptions.filter((item) => {
      return item.id != id;
    });
    this.props.deleteCategoryOption({ id: link.id }).then(() => {
      this.setState({ categoryOptions: catOptions ? catOptions : [] });
    });
  }
  addNewCategoryOptionHanlder() {
    let link = {};
    const co = this.state.coList.filter((a) => {
      return a.id.toLowerCase() == this.state.catOptionId.toLowerCase();
    })[0];
    link = {
      ...co,
      id: uuid(),
      co_id: this.state.catOptionId,
      category_id: this.state.category.id
    };

    this.props.saveCategoryOption(link).then(() => {
      window.location.reload();
    });
  }

  uploadIconHandler(e) {
    // get the files
    const files = e.target.files;

    // Process each file
    const allFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Make new FileReader
      const reader = new window.FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          const dto = new BlobBase64DTO();
          dto.id = uuid();
          dto.blob = allFiles[0].base64.split("base64,")[1];
          dto.type = allFiles[0].type;
          this.setState({
            file: allFiles[0],
            category: {
              ...this.state.category,
              blob: dto
            }
          }); //this.props.onDone(allFiles[0]);
        }
      }; // reader.onload
    } // for
  }
  getDropDownActions() {
    return [
      { id: "", action: "" },
      ...this.props.config.actions.filter((item) => {
        return item.for_category == true;
      })
    ].map((item) => {
      return {
        id: item.id,
        value: item.action
      };
    });
  }
  getDropDownProcess() {
    return [{ id: "", token: "" }, ...this.props.config.processes].map((item) => {
      return {
        id: item.id,
        value: item.token
      };
    });
  }
  unlinkAction(event) {
    this.props
      .unlinkAction({
        id: event.currentTarget.dataset.tag
      })
      .then(() => {
        this.props.getActions({ category_id: this.state.category.id }).then((succ) => {
          this.setState({
            actionsLinked: succ.data
          });
        });
      });
  }
  linkAction(event) {
    this.props
      .linkAction({
        id: uuid(),
        category_id: this.state.category.id,
        action_id: event.target.value
      })
      .then(() => {
        this.props.getActions({ category_id: this.state.category.id }).then((succ) => {
          this.setState({
            actionsLinked: succ.data
          });
        });
      });
  }
  uploadClick() {
    this.fileUploader.click();
  }
  onSubmitAceEditor(params) {
    this.setState({
      category: {
        ...this.state.category,
        params: params
      }
    });
  }
  openParams() {
    this.props.openModal(
      true,
      <ParamsEditor
        onSubmit={this.onSubmitAceEditor.bind(this)}
        params={this.state.category.params}
      />
    );

    //  this.props.openModal(true, MODALS_VIEW.CATEGORY_LINK_EDIT, { id: id });
  }
  setProcessChange(event) {
    this.setState({
      category: { ...this.state.category, process_id: event.target.value }
    });
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

    const img = this.state.category.icon_blob
      ? window.env.BLOB_URL + "/blob/" + this.state.category.icon_blob.blob_id
      : this.state.category.category_parent[0] && this.state.category.category_parent[0].icon_blob
      ? window.env.BLOB_URL + "/blob/" + this.state.category.category_parent[0].icon_blob.blob_id
      : "";
    if (this.state.loading == true) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "92vh", display: "flex" }}
        >
          <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
        </Grid>
      );
    }

    return (
      <Grid>
        <Card style={{ padding: "10px" }}>
          <Grid container>
            <Grid item xs="1">
              <div>
                <div>
                  <span
                    onClick={this.uploadClick.bind(this)}
                    style={{
                      cursor: "pointer",
                      display: img ? "default" : "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {this.state.file == null ? (
                      img ? (
                        <Image src={img} />
                      ) : (
                        <IconButton>
                          <CloudUploadIcon />
                        </IconButton>
                      )
                    ) : (
                      <Image src={this.state.file.base64 ? this.state.file.base64 : img} />
                    )}
                  </span>
                </div>
              </div>

              <input
                type="file"
                ref={(ref) => (this.fileUploader = ref)}
                style={{ display: "none" }}
                onChange={this.uploadIconHandler.bind(this)}
              />
            </Grid>
            <Grid item xs="11" style={{ marginBottom: "30px" }}>
              <Typography variant="h6" component="h1">
                {tran.translate("Category")}
              </Typography>
              <Typography variant="h8" component="h2">
                {this.state.category.category_parent
                  ? this.state.category.category_parent[0]
                    ? tran.translate("CATEGORY_TYPE_LABEL") +
                      ": " +
                      this.state.category.category_parent[0].category
                    : ""
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs="12">
              <TextBox
                onChange={this.expireHandler.bind(this)}
                placeholder={phTrans.translate("CATEGORY_EXPIRE_DATE_PLACEHOLDER")}
                isRequired={true}
                label={tran.translate("CATEGORY_EXPIRE_DATE_PLACEHOLDER")}
                value={this.state.category.expired_day}
                field="expired_day"
                validation={this.state.validation}
              />
              <DropDownList
                label={tran.translate("Process")}
                valueOptions={this.getDropDownProcess.bind(this)()}
                onChange={this.setProcessChange.bind(this)}
                field="type"
                validation={this.state.validation}
                value={this.state.category.process_id}
              />
              <TranslateCompnent translation={this.state.category.translation}></TranslateCompnent>

              <Grid className="text-center mx-auto">
                <ChromePicker
                  className="chrome-picker text-center mx-auto g-mb-20 "
                  disableAlpha={true}
                  color={this.state.category.color ? this.state.category.color : "#666666"}
                  onChangeComplete={this.handleColorChange.bind(this)}
                />
              </Grid>
              <Grid item xs="12">
                {" "}
                Params
                <IconButton onClick={this.openParams.bind(this)}>
                  <InputIcon />
                </IconButton>
              </Grid>

              <ButtonLoader
                onClick={this.submitHanlder.bind(this)}
                size={"md"}
                color={"primary"}
                value={"Submit"}
                isLoading={this.props.codeDict.edit.isLoading}
              />
            </Grid>
          </Grid>
        </Card>
        <Card style={{ marginTop: "30px", marginBottom: "30px", padding: "10px" }}>
          <Grid container>
            <Grid item xs="12" style={{ marginBottom: "30px" }}>
              <Typography variant="h8" component="h2">
                {tran.translate("CATEGORY_ACTIONS_LABEL")}
              </Typography>
            </Grid>

            <Grid item xs="12">
              <DropDownList
                label={tran.translate("ACTION_TYPE")}
                valueOptions={this.getDropDownActions.bind(this)()}
                value={this.state.actions.id}
                onChange={this.linkAction.bind(this)}
                field="type"
                validation={this.state.validation}
              />
            </Grid>
            <Grid item xs="12">
              {this.props.config.actions
                .filter((item) => {
                  return item.for_category == true;
                })
                .filter((item) => {
                  const is_action = this.state.actionsLinked.filter((action) => {
                    return action.action_id == item.id;
                  });

                  return is_action.length > 0 && is_action[0].category_id == this.state.category.id;
                })
                .map((item) => {
                  const is_action = this.state.actionsLinked.filter((action) => {
                    return action.action_id == item.id;
                  })[0];

                  return (
                    <Chip
                      key={is_action.id}
                      onClick={this.unlinkAction.bind(this)}
                      data-tag={is_action.id}
                      label={item.action}
                    ></Chip>
                  );
                })}
            </Grid>
            <Grid container style={{ marginTop: "30px" }}>
              <Grid item xs="12" style={{ marginBottom: "30px" }}>
                <Typography variant="h8" component="h2">
                  {tran.translate("CATEGORY_ACTIONS_INHERITED_LABEL")}
                </Typography>
              </Grid>
              <Grid item xs="12">
                {this.props.config.actions
                  .filter((item) => {
                    return item.for_category == true;
                  })
                  .filter((item) => {
                    const is_action = this.state.actionsLinked.filter((action) => {
                      return action.action_id == item.id;
                    });

                    return (
                      is_action.length > 0 && is_action[0].category_id != this.state.category.id
                    );
                  })
                  .map((item) => {
                    const is_action = this.state.actionsLinked.filter((action) => {
                      return action.action_id == item.id;
                    })[0];

                    return (
                      <Chip key={is_action.id} data-tag={is_action.id} label={item.action}>
                        {item.action}
                      </Chip>
                    );
                  })}
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: "30px" }}>
              <Grid item xs="12" style={{ marginBottom: "30px" }}>
                <Typography variant="h8" component="h2">
                  {tran.translate("ACTIONS_PROPERTIES")}
                </Typography>
              </Grid>
              <Grid item>
                {this.props.config.actions
                  .filter((item) => {
                    return item.for_category == true;
                  })
                  .filter((item) => {
                    const is_action = this.state.actionsLinked.filter((action) => {
                      return action.action_id == item.id;
                    });

                    return (
                      is_action.length > 0 && is_action[0].category_id == this.state.category.id
                    );
                  })
                  .map((item) => {
                    const is_action = this.state.actionsLinked.filter((action) => {
                      return action.action_id == item.id;
                    })[0];

                    return (
                      <Chip
                        key={is_action.id}
                        onClick={this.unlinkAction.bind(this)}
                        data-tag={is_action.id}
                        label={item.action}
                      ></Chip>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Card>

        <Card style={{ padding: "10px" }}>
          <Grid item xs="12" style={{ marginBottom: "30px" }}>
            <Typography variant="h8" component="h2">
              {tran.translate("CATEGORY_OPTIONS_LABEL")}
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs="5">
              <TextBox
                onChange={(event) => {
                  this.setState({ catOptionId: event.target.value });
                }}
                placeholder={"GUID"}
                value={this.state.catOptionId}
                isRequired={true}
                label={tran.translate("ADD_NEW_CATEGORY_OPTION_ID")}
                field="category_pl"
                validation={this.state.validation}
              />
            </Grid>
            <Grid item xs="6" style={{ alignSelf: "center" }}>
              <ButtonLoader
                value={tran.translate("CATEGORY_ADD_NEW_CAEGORY_OPTION")}
                onClick={this.addNewCategoryOptionHanlder.bind(this)}
                size={"md"}
                color={"primary"}
                isLoading={this.state.isLoading}
              />
            </Grid>
          </Grid>
          <ReactTableFixedColumns
            data={this.state.categoryOptions
              .sort((a, b) => {
                return Number(a.category_link[0].order ? a.category_link[0].order : a.order) >
                  Number(b.category_link[0].order ? b.category_link[0].order : b.order)
                  ? 1
                  : -1;
              })
              .map((item) => {
                let link = item.category_link[0];
                link = link ? link : "";
                return { ...item, link: link, name: item["name_" + this.props.lang] };
              })}
            columns={[
              {
                Header: "Name",
                fixed: "left",
                columns: [
                  {
                    Header: tran.translate("#"),
                    accessor: "link.order",
                    width: 50
                  },
                  {
                    Header: tran.translate("SEARCH#"),
                    accessor: "link.order_search",
                    width: 50
                  },
                  {
                    Cell: (a) => {
                      return (
                        <Link
                          to={"/mapps/categories/categoriesOptions/" + a.original.id}
                          className="g-font-size-11 col-md-11 col-xs-11 g-color-primary--hover nav-link"
                        >
                          {a.value}
                        </Link>
                      );
                    },
                    Header: tran.translate("CATEGORY_OPTION_NAME_TBL_HEADER"),
                    accessor: "name",
                    width: 200
                  }
                ]
              },
              {
                Header: "Info",
                columns: [
                  {
                    Header: tran.translate("CATEGORY_OPTION_TYPE_TBL_HEADER"),
                    accessor: "cat_opt.name",

                    width: 200
                  },
                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_REQUIRE_TBL_HEADER"),
                    accessor: "link.is_require",

                    width: 80
                  },

                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_SEARCHABLE_TBL_HEADER"),
                    accessor: "link.is_searchable",
                    width: 80
                  },

                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_IS_ON_MAP_TBL_HEADER"),
                    accessor: "link.is_on_map",
                    width: 80
                  },
                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_IS_ON_TOOLTIP_TBL_HEADER"),
                    accessor: "link.is_on_pin_map",
                    width: 80
                  },

                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_FORM_HIDDEN_TBL_HEADER"),
                    accessor: "link.is_form_hidden",
                    id: "age2",
                    width: 80
                  },
                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_ABOVE_TBL_HEADER"),
                    accessor: "link.can_above_pin",
                    id: "visits2",
                    width: 80
                  },

                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_IS_IUA_HEADER"),
                    accessor: "link.is_on_iua",
                    id: "progress2",
                    width: 80
                  },
                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_IS_IUA_REQ_HEADER"),
                    accessor: "link.is_on_iua_request",
                    id: "progress2",
                    width: 80
                  },
                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_IS_PARAM_HEADER"),
                    accessor: "link.is_params",
                    id: "progress2",
                    width: 80
                  },
                  {
                    Cell: (a) => {
                      return <span>{a.value == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_IS_VISIBLE_HEADER"),
                    accessor: "link.is_visible_view",
                    id: "progress2",
                    width: 80
                  },
                  {
                    Cell: (a) => {
                      return <span>{a.original.is_on_main_page == true ? <CheckIcon /> : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_IS_ON_MAIN_PAGE_HEADER"),
                    accessor: "link.is_on_main_page",
                    id: "progress2",
                    width: 80
                  },
                  {
                    Cell: (a) => {
                      return <span>{a.original.limit_of > 0 ? a.original.limit_of : ""}</span>;
                    },
                    Header: tran.translate("CATEGORY_OPTION_LIMIT_TBL_HEADER"),
                    accessor: "link.limit_of",
                    id: "progress2",
                    width: 80
                  }
                ]
              },
              {
                Header: tran.translate("CATEGORY_OPTION_NAME_OPTION_HEADER"),
                fixed: "right",
                columns: [
                  {
                    Cell: (a) => {
                      return a.original.link.category_id == this.state.category.id ? (
                        <Grid container>
                          <Grid item xs="6">
                            <IconButton
                              data-tag={a.original.id}
                              onClick={this.openModal.bind(this)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs="6">
                            <IconButton
                              data-tag={a.original.id}
                              onClick={this.onDeleteRow.bind(this)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ) : (
                        <Link
                          to={"/categories/edit/" + a.original.link.category_id}
                          class="u-label u-label-info g-color-white"
                        >
                          PARENT
                        </Link>
                      );
                    },
                    Header: tran.translate("CATEGORY_OPTION_NAME_OPTION_HEADER"),
                    accessor: "progress",
                    id: "progress2",
                    width: 120
                  }
                ]
              }
            ]}
            defaultPageSize={50}
            style={{ height: 800 }}
            className="-highlight "
          />
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    categoryTree: state.CategoryTreeReaducer,
    config: state.ConfigReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (id) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, { id: id })
      );
    },
    getDictionary: () => {
      dispatch({
        type: QueryList.Dictionary.GET_DICTIONARY
      });
    },
    getCategoryOptions: (id) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, { id: id })
      );
    },
    editCategory: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Category.EDIT_CATEGORY, dto));
    },

    saveCategoryOption: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.Category_Options.UPSERT_CAETEGORY_OPTIONS_FOR_CATEGORY,
          dto
        )
      );
    },
    deleteCategoryOption: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.Category_Options.DELETE_CAETEGORY_OPTIONS_FOR_CATEGORY,
          dto
        )
      );
    },
    setNotification: (type, message) => {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
        notification: { message: message, type: type }
      });
    },
    linkAction: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Category.INSERT_CATEGORY_ACTION, dto)
      );
    },
    unlinkAction: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Category.REMOVE_CATEGORY_ACTION, dto)
      );
    },
    getActions: (dto) => {
      return dispatch(new BaseService().commandThunt(QueryList.Category.GET_CATEGORY_ACTIONS, dto));
    },
    getCategoryOptionsAll: (dto) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS, dto)
      );
    },

    openModal: (open, body) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          body: body
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryEdit));
