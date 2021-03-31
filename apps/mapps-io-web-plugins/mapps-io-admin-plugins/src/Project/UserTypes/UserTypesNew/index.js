import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { CommandList, QueryList, TranslationsDTO, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { ButtonLoader, TextBox, TranslateCompnent } from "mapps-io-base-plugins/src/Components/index.js";

class UserTypeNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.userType = {};
    this.state.userType.translation = new TranslationsDTO();
    this.state.userType.translation_id = this.state.userType.translation.id;
    this.state.validation = [];
  }
  shouldComponentUpdate(nextState) {
    if (this.state.isLoading != nextState.isLoading) {
      return true;
    }

    return false;
  }
  componentDidMount() {
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

    this.refreshValidation();
  }

  nameHandler(event) {
    this.setState({
      userType: {
        ...this.state.userType,
        name: event.target.value
      }
    });
  }
  submitHanlder(event) {
    //this.state.toRefresh = true;

    //console.log(this.state.userType);
    const id = uuid();
    this.props.addUserTYpe({ ...this.state.userType, id: id }).then(() => {
      this.props.getUserTypes().then(() => {
        this.props.history.push("/mapps/users/settings/types/edit/" + id);
      });
    });

    event.preventDefault();

    //   this.props.addDictionary(this.state);
  }
  getDropDownValues() {
    const roles = this.state.role.filter((item) => {
      if (this.state.userType.usertype_roles.length == 0) {
        return true;
      }
      return (
        this.state.userType.usertype_roles.filter((ur) => {
          return ur.role_id == item.id;
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
      // location.reload()
    });
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    return (
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
              {tran.translate("USERTYPE_FORM_HEADER")}
            </Typography>

            <Grid item>
              <TextBox
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
              color="primary"
              className={
                "btn u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
              }
              value={tran.translate("USERTYPE_BUTTON_SAVE")}
              isLoading={this.props.codeDict.edit.isLoading}
            />
          </Paper>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grantRole: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.User.GRANT_USERTYPE_ROLE, dto));
    },
    revokeRole: (dto) => {
      return dispatch(new BaseService().queryThunt(CommandList.User.REVOKE_USERTYPE_ROLE, dto));
    },
    getUserTypes: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.User.GET_USER_TYPES, dto));
    },
    getRoles: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_ROLES, dto));
    },
    addUserTYpe: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.User.UPSERT_USERTYPE, dto));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTypeNew));
