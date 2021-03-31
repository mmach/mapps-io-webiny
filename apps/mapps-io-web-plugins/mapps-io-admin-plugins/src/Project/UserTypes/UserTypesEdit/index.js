import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  BodyLoader,
  ButtonLoader,
  DropDownList,
  TextBox,
  TranslateCompnent
} from "mapps-io-base-plugins/src/Components/index.js";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

class UserTypesEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.userType = {};
    this.state.role = [];
    this.state.validation = [];
    this.state.isLoading = false;
    this.state.roleChoose = "";
    this.state.loadingGrant = false;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      return true;
    } else if (this.state.userType != nextState.userType) {
      return true;
    } else if (this.state.isLoading != nextState.isLoading) {
      return true;
    } else if (this.state.role != nextState.role) {
      return true;
    } else if (this.state.roleChoose != nextState.roleChoose) {
      return true;
    } else if (this.state.loadingGrant != nextState.loadingGrant) {
      return true;
    } else if (
      this.state.userType.usertype_roles &&
      nextState.userType.usertype_roles &&
      this.state.userType.usertype_roles.length != nextState.userType.usertype_roles.length
    ) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      const usertype = this.props.config.user_types.filter((i) => {
        return i.id == this.props.match.params.id;
      })[0];
      this.setState({
        userType: usertype
      });
    }
  }
  componentDidMount() {
    const usertype = this.props.config.user_types.filter((i) => {
      return i.id == this.props.match.params.id;
    })[0];
    this.setState({
      userType: usertype
    });
    this.props.getRoles().then((succ) => {
      this.setState({
        role: succ.data
      });
    });
  }
  roleHandler(event) {
    this.setState({
      roleChoose: event.target.value
    });
  }

  grantAccessHandler() {
    this.setState({
      loadingGrant: true
    });
    const id = uuid();
    this.props
      .grantRole({
        id: id,
        usertype_id: this.state.userType.id,
        role_id: this.state.roleChoose
      })
      .then(() => {
        const name = this.state.role.filter((item) => {
          return item.id == this.state.roleChoose;
        })[0].role_detail.name;
        this.state.userType.usertype_roles.push({
          id: id,
          roles: {
            role_detail: {
              name: name
            }
          }
        });
        this.setState({
          roleChoose: "",
          loadingGrant: false
        });
      });
  }

  nameHandler(event) {
    //console.log('kurwa')
    this.setState({
      userType: {
        ...this.state.userType,
        name: event.target.value
      }
    });
  }
  submitHanlder() {
    this.props.addUserTYpe(this.state.userType);
  }
  deleteHanlder() {
    this.props.removeUserTYpe(this.state.userType).then(() => {
      this.props.history.push("/mapps/users/settings/types/new");
    });
  }
  getDropDownValues() {
    const roles = this.state.role.filter((item) => {
      if (this.state.userType.role.length == 0) {
        return true;
      }
      return (
        this.state.userType.role.filter((ur) => {
          return ur.name == item.role;
        }).length == 0
      );
    });
    return [{ id: "", value: "" }, ...roles].map((item) => {
      return {
        id: item.id,
        value: item.role_detail ? item.role_detail.name : item.value
      };
    });
  }
  onDeleteRow(event) {
    const id = event.currentTarget.dataset.tag;
    this.props.revokeRole({ id: id }).then(() => {
      const userType = { ...this.state.userType };
      userType.usertype_roles = [
        ...this.state.userType.usertype_roles.filter((item) => {
          return item.id != id;
        })
      ];
      this.setState({
        userType: userType
      });
    });
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    if (!this.state.userType.id) {
      return (
        <BodyLoader
          className="js-height-xl-83vh js-height-lg-83vh js-height-xs-85vh js-height-md-85vh js-height-md-85vh"
          zIndex={3}
          size="6rem"
        />
      );
    }
    const dropdown = this.getDropDownValues();

    return (
      <Container style={{ width: "100%" }} fixed id="actionProject">
        <Grid
          style={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
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
              {tran.translate("USERTYPE_FORM_HEADER")}
            </Typography>

            <Grid item>
              <TextBox
                placeholder={phTrans.translate("USER_TYPE_PLACEHOLDER")}
                isRequired={true}
                label={tran.translate("USER_TYPE_LABEL")}
                value={this.state.userType.name}
                onChange={this.nameHandler.bind(this)}
                validation={this.state.validation}
              />
            </Grid>

            <TranslateCompnent
              setTranslate={(translate) => {
                this.setState({ userType: { ...this.state.userType, translation: translate } });
              }}
              translation={this.state.userType.translation}
            ></TranslateCompnent>
            <ButtonLoader
              onClick={this.submitHanlder.bind(this)}
              size={"md"}
              color="primary"
              value={tran.translate("USERTYPE_BUTTON_SAVE")}
              isLoading={this.props.codeDict.edit.isLoading}
            />
            <ButtonLoader
              onClick={this.deleteHanlder.bind(this)}
              size={"md"}
              value={tran.translate("USERTYPE_BUTTON_DELETE")}
              isLoading={this.props.codeDict.edit.isLoading}
            />
          </Paper>
        </Grid>
        <Grid
          style={{ width: "100%" }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Paper style={{ padding: "20px", width: "auto", minWidth: "320px" }}>
            <Typography
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #999"
              }}
              variant="h6"
              component="h2"
            >
              {tran.translate("Granted Roles")}
            </Typography>
            {this.state.userType.role.map((ut) => {
              return (
                <Grid container item key={uuid()}>
                  <Grid item xs="9">
                    {ut.name}
                  </Grid>

                  <Grid item xs="3">
                    <span data-tag={ut.id} onClick={this.onDeleteRow.bind(this)}>
                      <DeleteIcon />
                    </span>
                  </Grid>
                </Grid>
              );
            })}
            <Grid content>
              <Grid item xs="9">
                <DropDownList
                  noLabel={true}
                  valueOptions={dropdown}
                  value={this.state.roleChoose}
                  onChange={this.roleHandler.bind(this)}
                  field="type"
                  validation={this.state.validation}
                />
              </Grid>

              <Grid item xs="3">
                {this.state.roleChoose != "" || this.state.loadingGrant == true ? (
                  <span onClick={this.grantAccessHandler.bind(this)}>
                    <AddIcon />
                  </span>
                ) : (
                  <span></span>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    config: state.ConfigReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grantRole: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.User.GRANT_USERTYPE_ROLE, dto));
    },
    revokeRole: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.User.REVOKE_USERTYPE_ROLE, dto));
    },
    getUserTypes: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.User.GET_USER_TYPES, dto));
    },
    getRoles: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_ROLES, dto));
    },
    addUserTYpe: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.User.UPSERT_USERTYPE, dto));
    },
    removeUserTYpe: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.User.REMOVE_USERTYPE, dto));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTypesEdit));
