/*
    ./client/components/App.jsx
*/

import {
  CommandList,
  DictionaryDTO,
  Enums,
  QueryList,
  TranslationsDTO,
  Translator
} from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  TranslateCompnent,
  ButtonLoader,
  DropDownList,
  TextBox
} from "mapps-io-base-plugins/src/Components";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { Typography, Grid } from "@material-ui/core";

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //        this.state = new DictionaryDTO();
    this.state.translation = new TranslationsDTO();
    this.state.validation = [];
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps.location.search) != JSON.stringify(this.props.location.search)) {
      return true;
    }
    if (JSON.stringify(this.state.translation) != JSON.stringify(nextState.translation)) {
      return true;
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search != this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);

      const type = urlParams.get("type");
      const code = urlParams.get("code");
      const dictList = this.props.codeDict.data[type];
      if (dictList != undefined) {
        const codeItem = dictList[code];
        this.setState({
          translation: {
            ...this.state.translation,
            id: codeItem.id,
            ...codeItem.message,
            code: codeItem.code,
            status: codeItem.status,
            type: codeItem.type,
            validation: []
          }
        });
      } else {
        this.setState({
          translation: {
            ...this.state.translation,

            id: null,
            ...new TranslationsDTO(),
            code: "",
            status: "",
            type: "",
            validation: []
          }
        });
      }
    }
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);

    const type = urlParams.get("type");
    const code = urlParams.get("code");
    const dictList = this.props.codeDict.data[type];
    if (dictList != undefined) {
      const codeItem = dictList[code];
      this.setState({
        translation: {
          ...this.state.translation,
          id: codeItem.id,
          ...codeItem.message,
          code: codeItem.code,
          status: codeItem.status,
          type: codeItem.type,
          validation: []
        }
      });
    }
  }

  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        //          this.validation();
      });
    }
  }
  getDropDownValues() {
    return [
      { id: "", value: "" },
      { id: Enums.CODE.ERROR, value: Enums.CODE.ERROR },
      { id: Enums.CODE.INFO, value: Enums.CODE.INFO },
      { id: Enums.CODE.VALIDATION, value: Enums.CODE.VALIDATION },
      { id: Enums.CODE.WARNING, value: Enums.CODE.WARNING },
      { id: Enums.CODE.SUCCESS, value: Enums.CODE.SUCCESS },
      { id: Enums.CODE.ERROR_GLOBAL, value: Enums.CODE.ERROR_GLOBAL },
      { id: Enums.CODE.INFO_GLOBAL, value: Enums.CODE.INFO_GLOBAL },
      { id: Enums.CODE.SUCCESS_GLOBAL, value: Enums.CODE.SUCCESS_GLOBAL },
      { id: Enums.CODE.WARNING_GLOBAL, value: Enums.CODE.WARNING_GLOBAL },
      { id: Enums.CODE.LABEL, value: Enums.CODE.LABEL },
      { id: Enums.CODE.PLACEHOLDER, value: Enums.CODE.PLACEHOLDER },
      { id: Enums.CODE.EMAIL, value: Enums.CODE.EMAIL }
    ];
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
  codeHandler(event) {
    this.setState({
      translation: {
        ...this.state.translation,
        code: event.target.value,
        token: this.state.translation.code
      }
    });

    this.refreshValidation();
  }
  statusHandler(event) {
    this.setState({
      translation: {
        ...this.state.translation,
        status: event.target.value,
        respStatus: this.state.translation.status
      }
    });

    this.refreshValidation();
  }

  typeHandler(event) {
    this.setState({
      translation: { ...this.state.translation, type: event.target.value }
    });

    this.refreshValidation();
  }
  submitHanlder(event) {
    event.preventDefault();
    //   if (this.validation().length == 0) {
    // this.props.code=this.state;
    const obj = { ...this.state.translation };
    obj.token = obj.code;
    obj.respStatus = obj.status;
    this.props.addDictionary(this.state.translation).then(() => {
      this.props.getDictionary().then(() => {
        this.props.history.push(
          `/mapps/languages/dictionaries/edit?code=${obj.code}&type=${obj.type}`
        );
      });
    });

    //   }
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    return (
      <Grid>
        <Typography
          style={{
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "1px solid #999"
          }}
          variant="h5"
          component="h1"
        >
          {tran.translate("CODE_FORM_HEADER")}
        </Typography>

        <TextBox
          placeholder={phTrans.translate("CODE_CODE_PLACEHOLDER")}
          isRequired={true}
          label={tran.translate("CODE_CODE_LABEL")}
          value={this.state.translation.code}
          onChange={this.codeHandler.bind(this)}
          field="code"
          validation={this.state.validation}
        />

        <DropDownList
          isRequired={true}
          label={tran.translate("CODE_TYPE_LABEL")}
          valueOptions={this.getDropDownValues()}
          value={this.state.translation.type}
          onChange={this.typeHandler.bind(this)}
          field="type"
          validation={this.state.validation}
        />

        <TextBox
          placeholder={phTrans.translate("CODE_STATUS_PLACEHOLDER")}
          isRequired={true}
          label={tran.translate("CODE_STATUS_LABEL")}
          value={this.state.translation.status}
          onChange={this.statusHandler.bind(this)}
          field="status"
          validation={this.state.validation}
        />

        <TranslateCompnent
          setTranslate={(translate) => {
            this.setState({ translation: { ...this.state.translation, ...translate } });
          }}
          translation={this.state.translation}
        ></TranslateCompnent>
        <ButtonLoader
          onClick={this.submitHanlder.bind(this)}
          size={"md"}
          color={"primary"}
          value={"Submit"}
          isLoading={this.props.codeDict.edit.isLoading}
        />
      </Grid>
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
    addDictionary: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Dictionary.ADD_DICTIONARY, dto));
    },
    getDictionary: () => {
      return dispatch(new BaseService().queryThunt(QueryList.Dictionary.GET_DICTIONARY, {}));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCategory));
