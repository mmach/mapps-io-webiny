/*
    ./client/components/App.jsx
*/

import { Container, CssBaseline, Grid, Paper, Typography } from "@material-ui/core";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  BodyLoader,
  ButtonLoader,
  Checkbox,
  DropDownList,
  MODAL_ACTIONS,
  TextArea,
  TextBox
} from "mapps-io-base-plugins/src/Components/index.js";
import "./styles.scss";

class DimensionAdd extends React.Component {
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

  submitHanlder() {
    this.setState({
      newLoading: true
    });
    const id = uuid();
    this.props
      .upsertDimensionGlobal({
        id: id,
        name: this.state.name,
        uniq_name: this.state.uniq_name,
        co_type_id: this.state.catChoose,
        descritpion: this.state.descritpion,
        cott_id: this.state.cottChoose,
        as_cat_ref: this.state.as_cat_ref
      })
      .then(() => {
        this.setState({
          name: "",
          uniq_name: "",
          descritpion: "",
          newLoading: false,
          catChoose: null,
          cott_id: null,
          as_cat_ref: null
        });
      });
  }
  descriptionHandler(event) {
    this.setState({
      descritpion: event.target.value
    });
  }
  nameHandler(event) {
    this.setState({
      name: event.target.value.toUpperCase()
    });
  }
  uniqHandler(event) {
    this.setState({
      uniq_name: event.target.value.toUpperCase()
    });
  }

  getDropDownValues() {
    return [{ id: null, value: "" }, ...this.state.catOptionsType].map((item) => {
      return {
        id: item.id,
        value: item.name ? item.name : item.value
      };
    });
  }

  getDropDownValuesCott() {
    const cot = this.state.catOptionsType.filter((item) => {
      return item.id == this.state.catChoose;
    })[0];
    return [{ id: null, value: "" }, ...cot.cat_options_type_temp].map((item) => {
      return {
        id: item.id,
        value: item.order ? item.order + " " + item.type : item.value
      };
    });
  }

  catOptHandler(event) {
    this.setState({
      catChoose: event.target.value
    });
  }
  cottHandler(event) {
    this.setState({
      cottChoose: event.target.value
    });
  }
  saveDimHanlder(event) {
    const id = event.currentTarget.getAttribute("data-key");
    const dim = this.state.dimensionProject.filter((item) => {
      return item.id == id;
    })[0];
    this.props.upsertDimension(dim);
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
      <React.Fragment>
        <CssBaseline />

        <Container style={{ width: "100%", height: "92vh" }} fixed id="actionProject">
          <Grid
            style={{ width: "100%", height: "100%" }}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Paper style={{ padding: "20px", width: "auto", minWidth: "420px" }}>
              <Typography
                style={{
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #999"
                }}
                variant="h5"
                component="h1"
              >
                {tran.translate("DIM_NEW_ACTIONS")}
              </Typography>
              <Grid item>
                <TextBox
                  label={tran.translate("DIM_NAME")}
                  onChange={this.nameHandler.bind(this)}
                ></TextBox>
              </Grid>
              <Grid item>
                <TextBox
                  label={tran.translate("DIM_UNIQ")}
                  onChange={this.uniqHandler.bind(this)}
                ></TextBox>
              </Grid>
              <TextArea
                label={tran.translate("ACTION_DESCRIPTION")}
                onChange={this.descriptionHandler.bind(this)}
              ></TextArea>
              <Grid item>
                <DropDownList
                  label={tran.translate("ACTION_CAT_TYPE")}
                  valueOptions={this.getDropDownValues()}
                  value={this.state.catChoose}
                  onChange={this.catOptHandler.bind(this)}
                  field="type"
                  validation={this.state.validation}
                />
              </Grid>
              <Grid item>
                {this.state.catChoose != null ? (
                  <DropDownList
                    label={tran.translate("ACTION_CAT_TYPE")}
                    valueOptions={this.getDropDownValuesCott()}
                    value={this.state.cottChoose}
                    onChange={this.cottHandler.bind(this)}
                    field="type"
                    validation={this.state.validation}
                  />
                ) : (
                  <span></span>
                )}
              </Grid>
              <Checkbox
                label={tran.translate("ACTION_AS_CAT_REF")}
                onChange={(event) => {
                  this.setState({ as_cat_ref: event.target.checked });
                }}
              ></Checkbox>

              <ButtonLoader
                onClick={this.submitHanlder.bind(this)}
                size={"md"}
                color={"primary"}
                value={tran.translate("ACTION_BUTTON_SAVE")}
                isLoading={this.state.newLoading}
              />
            </Paper>
          </Grid>
        </Container>
      </React.Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DimensionAdd));
