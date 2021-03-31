/*
    ./client/components/App.jsx
*/

import { Grid, Typography } from "@material-ui/core";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  BodyLoader,
  ButtonLoader,
  Checkbox,
  MODAL_ACTIONS,
  TranslateCompnent
} from "mapps-io-base-plugins/src/Components/index.js";
import "./styles.scss";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

function ModalDim(props) {
  const [translation, setTranslation] = useState(props.translation);
  useEffect(() => {
    if (props.translation.id != translation.id) {
      setTranslation(props.translation);
    }
  }, [props.translation.id]);
  function onClick() {
    props.saveDimHanlder({ id: props.id, translation: translation });
  }
  return (
    <div key={props.id}>
      <Typography
        style={{
          marginBottom: "10px",
          paddingBottom: "10px",
          borderBottom: "1px solid #999"
        }}
        variant="h6"
        component="h1"
      >
        {props.dimension_details.uniq_name}
      </Typography>
      <div>
        <TranslateCompnent
          setTranslate={(translate) => {
            setTranslation(translate);
          }}
          translation={translation}
        ></TranslateCompnent>
        <ButtonLoader
          data-key={props.id}
          onClick={onClick}
          size={"md"}
          value={"Submit"}
          color={"primary"}
          isLoading={false}
        />
      </div>
    </div>
  );
}

class DimensionToProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.dimensions = [];
    this.state.dimensionProject = [];
    this.state.role = [];
    this.state.validation = [];
    this.state.isLoading = true;
    this.state.roleChoose = "";
    this.state.loadingGrant = false;
    this.state.name = "";
    this.state.description = "";
    this.state.newLoading = false;
    this.state.catOptionsType = [];
    this.state.catChoose = null;
    this.state.cottArray = [];
    this.state.cottChoose = null;
    this.state.uniq_name = null;
    this.state.as_cat_ref = null;
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    this.props.getAll().then((succ) => {
      this.props.get().then((succ2) => {
        this.props.getCategoryOptions().then((opt) => {
          this.setState({
            isLoading: false,
            dimensions: succ.data,
            dimensionProject: succ2.data,
            catOptionsType: opt.data
          });
        });
      });
    });
  }

  onChange(event) {
    const checked = event.target.checked;
    const id = event.currentTarget.dataset.key;
    if (checked == true) {
      const objId = uuid();
      const translationId = uuid();
      this.props
        .upsertDimension({
          id: objId,
          dimension_id: id,
          translation: {
            id: translationId,
            name: ""
          }
        })
        .then(() => {
          this.state.dimensionProject.push({
            id: objId,
            dimension_id: id,
            translation: {
              id: translationId,
              name: this.state.dimensions.filter((item) => {
                return item.id == id;
              })[0].name
            },
            dimension_details: this.state.dimensions.filter((item) => {
              return item.id == id;
            })[0]
          });
          this.setState({
            dimensionProject: [...this.state.dimensionProject]
          });
        });
    } else {
      const idActProj = this.state.dimensionProject.filter((item) => {
        return item.dimension_id == id;
      })[0];
      const res = [
        ...this.state.dimensionProject.filter((item) => {
          return item.dimension_id != id;
        })
      ];

      this.props.deleteDimension({ id: idActProj.id, status: true }).then(() => {
        this.setState({
          dimensionProject: res
        });
      });
    }
  }

  saveDimHanlder(dimChanged) {
    const id = dimChanged.id;
    const dim = this.state.dimensionProject.filter((item) => {
      return item.id == id;
    })[0];

    this.props.upsertDimension({ ...dim, ...dimChanged });
  }

  openModal(event) {
    const item = this.state.dimensionProject.filter((i) => i.id == event.target.dataset.key)[0];
    if (!item) {
      return;
    }
    this.props.openModal(
      true,
      <ModalDim saveDimHanlder={this.saveDimHanlder.bind(this)} {...item} />
    );
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    if (this.state.isLoading) {
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
      <div id="dimensions">
        <ReactTableFixedColumns
          expanded={{
            1: {
              2: true
            }
          }}
          data={this.state.dimensions}
          columns={[
            {
              Header: "Dimension",
              columns: [
                {
                  Cell: (a) => {
                    return new Date(a.original.createdAt).toLocaleDateString();
                  },
                  Header: tran.translate("Created At"),
                  accessor: "createdAt",
                  width: 100
                },
                {
                  Header: tran.translate("Name"),
                  Cell: (a) => {
                    const id = this.state.dimensionProject.filter((el) => {
                      return el.dimension_id == a.original.id;
                    })[0];
                    return (
                      <span
                        style={{ cursor: id ? "pointer" : "default" }}
                        data-key={id && id.id}
                        onClick={this.openModal.bind(this)}
                      >
                        {a.original.uniq_name}
                      </span>
                    );
                  },
                  accessor: "uniq_name",
                  width: 350
                }
              ]
            },
            {
              Header: "Dimension Action",
              columns: [
                {
                  Cell: (a) => {
                    const id = this.state.dimensionProject.filter((el) => {
                      return el.dimension_id == a.original.id;
                    })[0];
                    return (
                      <Checkbox
                        noLabel={true}
                        onChange={this.onChange.bind(this)}
                        value={id ? true : false}
                        data-key={a.original.id}
                      ></Checkbox>
                    );
                  },
                  Header: tran.translate("Activate"),
                  width: 150
                }
              ]
            }
          ]}
          defaultPageSize={23}
          style={{ height: "92vh" }}
          className="-highlight "
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertDimension: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Dimensions.UPSERT_DIM, dto));
    },
    openModal: (open, body) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          body: body
        }
      });
    },
    getCategoryOptions: (dto) => {
      return dispatch(
        new BaseService().commandThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, dto)
      );
    },
    deleteDimension: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Dimensions.DELETE_DIM, dto));
    },
    deleteDimensionGlobal: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Dimensions.DELETE_DIM_GLOBALLY, dto)
      );
    },
    upsertDimensionGlobal: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Dimensions.UPSERT_DIM_GLOBALLY, dto)
      );
    },
    get: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Dimensions.GET_DIM, dto));
    },
    getAll: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Dimensions.GET_GLOBAL_DIM, dto));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DimensionToProject));
