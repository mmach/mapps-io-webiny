/*
    ./client/components/App.js
*/

import { mappsPlugins } from "./../../../../index.js";
import { CommandList, Enums, Translator, UserRegisterInternalDTO } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "./../../../../App";
import { NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = new UserRegisterInternalDTO();
    this.state.nickname = "";
    this.state.validation = [];
    this.state.setLonLat = false;
    this.view = mappsPlugins.byName(this.props.mappsSettings.mappsNameViewPlugin);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser.isLoading == false && prevProps.currentUser.isLoading == true) {
      this.setState(this.props.currentUser.user);
    }
  }
  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        this.validation();
      });
    }
  }

  validation() {
    const validation = UserRegisterInternalDTO.prototype.validation(this.state);
    this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
    validation.map((item) => {
      item.msg = this.tran.translate(item.failed, ...item.value);
    });
    this.setState({
      validation: validation
    });
    return validation;
  }

  nameHandler(event) {
    this.setState({
      name: event.target.value
    });

    this.refreshValidation();
  }

  phoneHandler(event) {
    this.setState({
      phone: event.target.value
    });

    this.refreshValidation();
  }
  birthDateHandler(event) {
    this.setState({
      birthDate: event
    });

    this.refreshValidation();
  }

  surnameHandler(event) {
    this.setState({
      surname: event.target.value
    });

    this.refreshValidation();
  }
  nicknameHandler(event) {
    this.setState({
      nickname: event.target.value
    });

    this.refreshValidation();
  }

  submitHanlder(event) {
    this.setState({
      toRefresh: 1
    });
    event.preventDefault();
    //if (this.validation().length == 0) {
    const obj = this.state;
    obj.language = this.props.lang;
    obj.uid = uuid();
    this.props
      .editUser(obj)
      .then(() => {
        this.props.setNotification(
          Enums.CODE.SUCCESS_GLOBAL,
          Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
            "EDIT_USER_SUCCESS"
          )
        );
      })
      .catch(() => {
        this.props.setNotification(
          Enums.CODE.ERROR,
          Translator(this.props.codeDict.data.ERROR_GLOBAL, this.props.lang).translate(
            "EDIT_USER_ERROR"
          )
        );
      });
    // }
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    return this.view ? (
      this.view.render({
        validation: this.state.validation,
        name: this.state.name,
        nameHandler: this.nameHandler.bind(this),
        surname: this.state.surname,
        surnameHandler: this.surnameHandler.bind(this),
        nickname: this.state.nickname,
        nicknameHandler: this.nicknameHandler.bind(this),
        birthDate: this.state.birthDate,
        birthDateHandler: this.birthDateHandler.bind(this),
        phone: this.state.phone,
        phoneHandler: this.phoneHandler.bind(this),
        submitHanlder: this.submitHanlder.bind(this),
        //  isLoading={this.props.registerUser.isLoading}
        tran: tran,
        phTrans: phTrans
      })
    ) : (
      <span>SET VARIANT</span>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    currentUser: state.UserImageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.User.EDIT_USER,
          dto,
          null,
          Enums.LOADER.SET_CONTAINER_ACTION
        )
      );
    },
    setNotification: (type, message) => {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
        notification: { message: message, type: type }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(EditUser));
