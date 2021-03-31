/*
    ./client/components/App.jsx
*/

import { CommandList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { ButtonLoader, TextBox } from "mapps-io-base-plugins/src/Components/index.js";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";

class AddStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {}
    };
  }

  tokenandler(event) {
    this.setState({
      status: {
        ...this.state.status,
        status_id: event.target.value
      }
    });
  }

  onClickSubmit() {
    const state = this.state.status;
    state.id = uuid();
    this.props.upsertStatus(state);
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
  render() {
    const tran = Translator(this.props.codeList.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeList.data.PLACEHOLDER, this.props.lang);

    return (
      <React.Fragment>
        <TextBox
          placeholder={phTrans.translate("Status token")}
          onChange={(event) => {
            this.setState({ status: { ...this.state.status, token: event.target.value } });
          }}
          isRequired={true}
          label={tran.translate("TOKEN")}
          value={this.state.status.status_order}
          field="code"
          validation={this.state.validation}
        />
        <ButtonLoader
          size={"md"}
          onClick={this.onClickSubmit.bind(this)}
          className={
            "btn u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
          }
          value={tran.translate("Submit")}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeList: state.DictionaryReducer,
    lang: state.LanguageReducer,
    statuses: state.StatusListReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertStatus: (dto) => {
      return dispatch(new BaseService().queryThunt(CommandList.Status.UPSERT_STATUS_GLOBAL, dto));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddStatus);
