/*
    ./client/components/App.js
*/

import {
  CommandList,
  Enums,
  ExternalCredentialsDTO,
  QueryList,
  Translator,
  UserLoginInternalDTO
} from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isUuid } from "uuidv4";
import { BaseService } from "./../../../../App";
import LOGIN_ACTIONS from "./actions.js";

import { NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";
import { AUTH_ACTIONS, LANGUAGE_ACTIONS } from "../../../../Reducers/index.js";
import { mappsPlugins } from "./../../../../index";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = new UserLoginInternalDTO();
    this.state.validation = [];
    this.state.exception = undefined;
    this.state.isLoading = false;
    this.state.fbLoading = false;
    this.state.googleLoading = false;
    this.loginView = mappsPlugins.byName(this.props.mappsSettings.mappsNameViewPlugin);
  }
  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        this.validation();
      });
    }
  }

  validation() {
    const validation = UserLoginInternalDTO.prototype.validation(this.state);
    this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
    validation.map((item) => {
      item.msg = this.tran.translate(item.failed, ...item.value);
    });
    this.setState({
      validation: validation
    });
    return validation;
  }

  emailHandler(event) {
    this.setState({
      email: event.target.value
    });

    this.refreshValidation();
  }
  passwordHandler(event) {
    this.setState({
      password: event.target.value
    });
    this.refreshValidation();
  }

  submitHanlder(event) {
    this.setState({
      toRefresh: true,
      isLoading: true
    });
    event.preventDefault();
    if (this.validation().length == 0) {
      // this.props.code=this.state;
      this.state.language;
      this.props
        .loginInternal(this.state)
        .then(() => {
          this.setState({
            isLoading: false
          });
          this.props.setNotification(
            Enums.CODE.SUCCESS_GLOBAL,
            Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
              "LOGIN_SUCCESS"
            )
          );

          const urlParams = new URLSearchParams(window.location.search);
          const redirectTo = urlParams.get("redirectTo");

          if (redirectTo) {
            this.props.history.push(redirectTo);
          } else if (this.props.mappsSettings.redirectUri) {
            this.props.history.push(this.props.mappsSettings.redirectUri);
          } else  {
            this.props.history.push("/");
          }
        })
        .catch((ex) => {
          this.setState({
            isLoading: false
          });
          this.setState({ exception: Object.assign({}, ex.data.error) });
          this.props.setNotification(
            Enums.CODE.ERROR_GLOBAL,
            Translator(this.props.codeDict.data.ERROR, this.props.lang).translate("EMAIL_NOT_EXIST")
          );
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  setTokenToLocalStorage(token, refresh_token) {
    window.localStorage.token == token;
    window.localStorage.refresh_token = refresh_token;
  }
  /*genNewToken(logStep,uid){
        if(logStep==1)
        {
            this.props.genRefresh(uid);
        }
    }*/
  responseFacebook(response) {
    if (!response.accessToken) {
      this.props.setNotification(
        Enums.CODE.ERROR_GLOBAL,
        Translator(this.props.codeDict.data.ERROR, this.props.lang).translate("LOGIN_FAILED")
      );
      return;
    }
    if (this.state.fbLodaing == true) {
      return;
    }
    this.setState({
      fbLodaing: true
    });
    const externalDTO = new ExternalCredentialsDTO();
    externalDTO.provider = 1;
    externalDTO.token = response.accessToken;
    externalDTO.userId = response.id;
    this.props.loginByExternal(externalDTO).then(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get("redirectTo");
      this.props.setNotification(
        Enums.CODE.SUCCESS_GLOBAL,
        Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
          "LOGIN_SUCCESS"
        )
      );
      this.setState({
        fbLodaing: false
      });
      if (redirectTo) {
        this.props.history.push(redirectTo);
      } else if (this.props.mappsSettings.redirectUri) {
        this.props.history.push(this.props.mappsSettings.redirectUri);
      } else if (!this.props.mappsSettings.redirectUri) {
        this.props.history.push("/");
      }
    });
  }
  responseGoogle(response) {
    if (!response.accessToken) {
      this.props.setNotification(
        Enums.CODE.ERROR_GLOBAL,
        Translator(this.props.codeDict.data.ERROR, this.props.lang).translate("LOGIN_FAILED")
      );
      return;
    }
    if (this.state.googleLoading == true) {
      return;
    }
    this.setState({
      googleLoading: true
    });
    const externalDTO = new ExternalCredentialsDTO();
    externalDTO.provider = 2;
    externalDTO.token = response.accessToken;
    externalDTO.userId = response.googleId;
    this.props.loginByExternal(externalDTO).then(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get("redirectTo");
      this.props.setNotification(
        Enums.CODE.SUCCESS_GLOBAL,
        Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
          "LOGIN_SUCCESS"
        )
      );
      this.setState({
        googleLoading: false
      });
      if (redirectTo) {
        this.props.history.push(redirectTo);
      } else if (this.props.element) {
        this.props.history.push(this.props.element.data.redirect.desktop);
      } else if (!this.props.element) {
        this.props.history.push("/");
      }
    });
  }
  failureGoogle() {
    this.props.setNotification(
      Enums.CODE.ERROR_GLOBAL,
      Translator(this.props.codeDict.data.ERROR, this.props.lang).translate("LOGIN_FAILED")
    );
    return;
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

    return this.loginView ? this.loginView.render.bind(this)(tran, phTrans) : <span></span>;
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
  const loginLogic = (succ) => {
    window.localStorage.token = succ.data.token;
    window.localStorage.refresh_token = succ.data.refresh_token ? succ.data.refresh_token : "";
    window.localStorage.expiresIn = succ.data.expiresIn;
    if (!window.localStorage.refresh_token || !isUuid(window.localStorage.refresh_token)) {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.User.GEN_REFRESH_TOKEN,
          { uid: succ.data.uid },
          null,
          Enums.LOADER.SET_CONTAINER_ACTION
        )
      )
        .then((succ) => {
          return dispatch(
            new BaseService().commandThunt(
              QueryList.User.GET_REFRESH_TOKEN,
              { uid: succ.data.uid },
              window.localStorage.token,
              Enums.LOADER.SET_CONTAINER_ACTION
            )
          );
        })
        .then((succ) => {
          window.localStorage.refresh_token = succ.data;
          return dispatch(
            new BaseService().queryThunt(QueryList.User.USER_INFO, {}, window.localStorage.token)
          );
        })
        .then((succ) => {
          if (succ.data.language != window.localStorage.lang) {
            window.localStorage.lang = succ.data.language;
            dispatch({
              type: LANGUAGE_ACTIONS.SET_LANGUAGE,
              lang: window.localStorage.lang
            });
          }
          dispatch({
            type: AUTH_ACTIONS.IS_AUTH,
            dto: {
              refresh_token: window.localStorage.refresh_token,
              token: window.localStorage.token,
              user: succ.data
            }
          });
        });
    } else {
      return dispatch(
        new BaseService().queryThunt(QueryList.User.USER_INFO, {}, window.localStorage.token)
      ).then((succ) => {
        if (succ.data.language != window.localStorage.lang) {
          window.localStorage.lang = succ.data.language;
          dispatch({
            type: LANGUAGE_ACTIONS.SET_LANGUAGE,
            lang: window.localStorage.lang
          });
        }

        dispatch({
          type: AUTH_ACTIONS.IS_AUTH,
          dto: {
            refresh_token: window.localStorage.refresh_token,
            token: window.localStorage.token,
            user: succ.data
          }
        });
      });
    }
    return Promise.resolve(succ);
  };
  return {
    loginInternal: (dto) => {
      return dispatch(
        new BaseService().queryThunt(
          QueryList.User.LOG_IN_INTERNAL,
          dto,
          null,
          Enums.LOADER.SET_CONTAINER_ACTION
        )
      )
        .then((succ) => {
          return loginLogic(succ);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    openForgotPassword: () => {
      dispatch({
        type: LOGIN_ACTIONS.OPEN_MODAL,
        dto: {
          open: true,
          action: "FORGOT_PASSWORD"
        }
      });
    },
    loginByExternal: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.User.CREATE_USER_EXTERNAL_PROV,
          dto,
          null,
          Enums.LOADER.SET_CONTAINER_ACTION
        )
      )
        .then(() => {
          return dispatch(
            new BaseService().queryThunt(
              QueryList.User.LOGIN_BY_EXTERNAL,
              dto,
              null,
              Enums.LOADER.SET_CONTAINER_ACTION
            )
          );
        })
        .then((succ) => {
          return loginLogic(succ);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    setNotification: (type, message) => {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
        notification: { message: message, type: type }
      });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
