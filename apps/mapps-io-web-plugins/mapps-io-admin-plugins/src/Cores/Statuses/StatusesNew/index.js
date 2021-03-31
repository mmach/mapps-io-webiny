/*
    ./client/components/App.jsx
*/

import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  ButtonLoader,
  Checkbox,
  DropDownList,
  TextBox,
  TranslateCompnent
} from "mapps-io-base-plugins/src/Components/index.js";

class StatusesNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {
        id: uuid(),
        translation: {
          id: uuid()
        }
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.status != nextState.status) {
      return true;
    }
    return false;
  }
  tokenandler(event) {
    this.setState({
      status: {
        ...this.state.status,
        status_id: event.target.value
      }
    });
  }

  getDropDownValues() {
    const roles = this.props.statuses.statuses;

    return [{ id: "", value: "" }, ...roles].map((item) => {
      return {
        id: item.id,
        value: item.token
      };
    });
  }

  onClickSubmit() {
    const status = this.state.status;
    status.id == uuid();
    this.props.upsertStatus(this.state.status);
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

    return (
      <React.Fragment>
        <DropDownList
          label={tran.translate("Status type")}
          valueOptions={this.getDropDownValues()}
          value={this.state.status.status_id}
          onChange={this.tokenandler.bind(this)}
          field="type"
          validation={this.state.validation}
        />
        <TextBox
          onChange={(event) => {
            this.setState({ status: { ...this.state.status, status_order: event.target.value } });
          }}
          placeholder={phTrans.translate("Order")}
          isRequired={true}
          label={tran.translate("Status order")}
          value={this.state.status.status_order}
          field="code"
          validation={this.state.validation}
        />
        <Checkbox
          label={phTrans.translate("Is closing")}
          value={this.state.status.is_closed}
          onChange={(event) => {
            this.setState({ status: { ...this.state.status, is_closed: event.target.checked } });
          }}
        ></Checkbox>
        <TranslateCompnent
          setTranslate={(translate) => {
            this.setState({ status: { ...this.state.status, translation: translate } });
          }}
          translation={this.state.status.translation}
        ></TranslateCompnent>
        <ButtonLoader
          size={"md"}
          color={"primary"}
          onClick={this.onClickSubmit.bind(this)}
          value={tran.translate("SUBMIT")}
        />{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    config: state.ConfigReducer,
    statuses: state.StatusListReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatuses: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Status.GET_GLOBAL_STATUSES, dto));
    },
    upsertStatus: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Status.UPSERT_STATUS, dto));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusesNew));
