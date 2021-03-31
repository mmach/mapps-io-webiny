import { Container, CssBaseline, Grid, Paper, Typography } from "@material-ui/core";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { BodyLoader, ButtonLoader, TextBox } from "mapps-io-base-plugins/src/Components/index.js";

class RolesAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.roles = [];
    this.state.rolesProject = [];
    this.state.role = [];
    this.state.validation = [];
    this.state.isLoading = true;
    this.state.roleChoose = "";
    this.state.loadingGrant = false;
    this.state.name = "";
    this.state.description = "";
    this.state.newLoading = false;
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    this.props.getAll().then((succ) => {
      this.props.get().then((succ2) => {
        this.setState({
          isLoading: false,
          roles: succ.data,
          rolesProject: succ2.data
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
      .upsertRoleGlobal({
        id: id,
        name: this.state.name,
        status: this.state.status
      })
      .then(() => {
        this.state.roles.push({
          id: id,
          name: this.state.name,
          status: this.state.status
        });
        this.setState({
          actions: this.state.roles,
          name: "",
          newLoading: false
        });
      });
  }
  nameHandler(event) {
    this.setState({
      name: event.target.value.toUpperCase()
    });
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
                {tran.translate("NEW ROLE")}
              </Typography>
              <Grid item>
                <TextBox
                  label={tran.translate("RoleName")}
                  onChange={this.nameHandler.bind(this)}
                ></TextBox>
              </Grid>

              <ButtonLoader
                onClick={this.submitHanlder.bind(this)}
                size={"md"}
                color={"primary"}
                value={tran.translate("Save")}
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
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    config: state.ConfigReducer,
    auth: state.AuthReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertRole: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Roles.GRANT_ROLE_TO_PROJECT, dto));
    },
    deleteRole: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Roles.REVOKE_ROLE_TO_PROJECT, dto)
      );
    },

    upsertRoleGlobal: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Roles.CREATE_ROLE_GLOBAL, dto));
    },
    get: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_ROLES, dto));
    },
    getAll: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_GLOBAL_ROLES, dto));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RolesAdd));
