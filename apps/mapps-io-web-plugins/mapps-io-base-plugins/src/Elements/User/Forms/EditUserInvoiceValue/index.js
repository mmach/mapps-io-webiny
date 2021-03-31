/*
    ./client/components/App.js
*/

import { mappsPlugins } from "./../../../../";
import {
  CommandList,
  QueryList,
  Enums,
  Translator,
  UserRegisterInternalDTO
} from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "./../../../../App";
import { NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";

class EditUserInvoiceValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      name: "",
      address: "",
      tax_number: "",
      country: "",
      city: "",
      zip_code: "",
      user_name: "",
      bank_account_nr: ""
    };
    this.state.validation = [];
    this.state.setLonLat = false;
    this.view = mappsPlugins.byName(this.props.mappsSettings.mappsNameViewPlugin);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser.isLoading == false && prevProps.currentUser.isLoading == true) {
      this.props.getInvoicesUserValues({ user_id: this.props.currentUser.user.id }).then((succ) => {
        succ.data && this.setState(succ.data);
      });
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

  addressHandler(event) {
    this.setState({
      address: event.target.value
    });

    this.refreshValidation();
  }
  zipCodeHandler(event) {
    this.setState({
      zip_code: event
    });

    this.refreshValidation();
  }
  userNameHandler(event) {
    this.setState({
      user_name: event
    });

    this.refreshValidation();
  }
  bankNrHandler(event) {
    this.setState({
      bank_account_nr: event
    });

    this.refreshValidation();
  }
  taxNrHandler(event) {
    this.setState({
      tax_number: event
    });

    this.refreshValidation();
  }
  countryHandler(event) {
    this.setState({
      country: event.target.value
    });

    this.refreshValidation();
  }
  cityHandler(event) {
    this.setState({
      city: event.target.value
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
            "EDIT_USER_INVOICE_SUCCESS"
          )
        );
      })
      .catch(() => {
        this.props.setNotification(
          Enums.CODE.ERROR,
          Translator(this.props.codeDict.data.ERROR_GLOBAL, this.props.lang).translate(
            "EDIT_USER_INVOICE_ERROR"
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
        address: this.state.address,
        tax_number: this.state.tax_number,
        country: this.state.country,
        city: this.state.city,
        zip_code: this.state.zip_code,
        user_name: this.state.user_name,
        bank_account_nr: this.state.bank_account_nr,
        addressHandler: this.addressHandler.bind(this),
        bankNrHandler: this.bankNrHandler.bind(this),
        cityHandler: this.cityHandler.bind(this),
        taxNrHandler: this.taxNrHandler.bind(this),
        countryHandler: this.countryHandler.bind(this),
        zipCodeHandler: this.zipCodeHandler.bind(this),
        userNameHandler: this.userNameHandler.bind(this),
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
          CommandList.User.UPSERT_USERS_INVOICE_DATA,
          dto,
          null,
          Enums.LOADER.SET_CONTAINER_ACTION
        )
      );
    },
    getInvoicesUserValues: (dto) => {
      return dispatch(
        new BaseService().queryThunt(
          QueryList.User.GET_USER_INVOICE_DATA,
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(EditUserInvoiceValue));
