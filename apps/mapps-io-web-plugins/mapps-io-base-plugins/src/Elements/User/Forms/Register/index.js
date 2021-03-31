/*
    ./client/components/App.js
*/

import { CommandList, Enums, Translator, UserRegisterInternalDTO } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "./../../../../App";
import {
  NOTIFICATIONS_ACTIONS,
  ButtonLoader,
  DayPickerInputComponent,
  TextBox
} from "./../../../../Components/index.js";
import { FormHelperText, Grid } from "@material-ui/core";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = new UserRegisterInternalDTO();
    this.state.validation = [];
    this.state.setLonLat = false;

    this.state.city = "";
    this.state.city_id = 0;
    this.state.adress = "";
    this.state.country = "";
    this.state.country_id = 0;
    this.state.longitude = 0;
    this.state.latitude = 0;
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

  countryHandler(event) {
    this.setState({
      country: event.target.value
    });

    this.refreshValidation();
  }
  regionHandler(event) {
    this.setState({
      region: event.target.value
    });

    this.refreshValidation();
  }
  cityHandler(event) {
    this.setState({
      city: event.target.value
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

  passwordRepeatHandler(event) {
    this.setState({
      passwordRepeat: event.target.value
    });
    this.refreshValidation();
  }

  submitHanlder(event) {
    this.setState({
      toRefresh: 1
    });
    event.preventDefault();
    if (this.validation().length == 0) {
      const obj = this.state;
      obj.language = this.props.lang;
      obj.uid = uuid();
      this.props
        .createUser(obj)
        .then(() => {
          this.props.setNotification(
            Enums.CODE.SUCCESS_GLOBAL,
            Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
              "CREATE_USER_SUCCESS"
            )
          );
        })
        .catch(() => {
          this.props.setNotification(
            Enums.CODE.ERROR,
            Translator(this.props.codeDict.data.ERROR_GLOBAL, this.props.lang).translate(
              "CREATE_USER_ERROR"
            )
          );
        });
    }
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    return (
      <Grid>
        <Grid >
          
          <FormHelperText error={this.state.exception}>
            {this.state.exception && this.state.exception.message[this.props.lang]}
          </FormHelperText>
        </Grid>

        <TextBox
          placeholder={phTrans.translate("REGISTER_EMAIL_PLACEHOLDER")}
          isRequired={true}
          label={tran.translate("REGISTER_EMAIL_LABEL")}
          value={this.state.email}
          onChange={this.emailHandler.bind(this)}
          field="email"
          validation={this.state.validation}
        />

        <TextBox
          type="password"
          placeholder={phTrans.translate("REGISTER_PASSWORD_PLACEHOLDER")}
          isRequired={true}
          label={tran.translate("REGISTER_PASSWORD_LABEL")}
          value={this.state.password}
          onChange={this.passwordHandler.bind(this)}
          field="password"
          validation={this.state.validation}
        />
        <TextBox
          type="password"
          placeholder={phTrans.translate("REGISTER_PASSWORD_REPEAT_PLACEHOLDER")}
          isRequired={false}
          label={phTrans.translate("REGISTER_PASSWORD_REPEAT_PLACEHOLDER")}
          value={this.state.passwordRepeat}
          onChange={this.passwordRepeatHandler.bind(this)}
          field="passwordRepeat"
          validation={this.state.validation}
        />

        <TextBox
          placeholder={phTrans.translate("REGISTER_NAME_PLACEHOLDER")}
          isRequired={true}
          label={tran.translate("REGISTER_NAME_LABEL")}
          value={this.state.name}
          onChange={this.nameHandler.bind(this)}
          field="name"
          validation={this.state.validation}
        />

        <DayPickerInputComponent
          dateFormat="dd-MM-yyyy"
          showTimeSelect={false}
          scrollableYearDropdown={true}
          showYearDropdown={true}
          maxDate={new Date()}
          value={this.state.birthDate}
          placeholder={phTrans.translate("REGISTER_BIRTHDATE_PLACEHOLDER")}
          isRequired={true}
          label={tran.translate("REGISTER_BIRTHDATE_LABEL")}
          onChange={this.birthDateHandler.bind(this)}
          field="birthDate"
          validation={this.state.validation}
        />

        <TextBox
          placeholder={phTrans.translate("REGISTER_PHONE_PLACEHOLDER")}
          isRequired={true}
          label={tran.translate("REGISTER_PHONE_LABEL")}
          value={this.state.phone}
          onChange={this.phoneHandler.bind(this)}
          field="phone"
          validation={this.state.validation}
        />

        <ButtonLoader
          onClick={this.submitHanlder.bind(this)}
          size={"md"}
          
          value={tran.translate("REGISTER_SUBMIT_LABEL")}
          isLoading={this.props.isLoading}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    registerUser: state.RegisterReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.User.CREATE_USER,
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Register));
