import { Typography } from "@material-ui/core";
import { CommandList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  ButtonLoader,
  Checkbox,
  TextBox,
  TranslateCompnent
} from "mapps-io-base-plugins/src/Components/index.js";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";

class EditStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {
        translation: {}
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      return true;
    } else if (this.state.status != nextState.status) {
      return true;
    } else if (this.props.statuses.statuses_project != nextProps.statuses.statuses_project) {
      return true;
    } else if (this.props.statuses.statuses != nextProps.statuses.statuses) {
      return true;
    }

    return false;
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.id != this.props.match.params.id ||
      this.props.statuses.statuses_project != prevProps.statuses.statuses_project
    ) {
      this.props.statuses.statuses_project.forEach((item) => {
        if (item.id == this.props.match.params.id) {
          this.setState({
            status: item,
            translation: item.translation
          });
        }
      });
    }
  }
  componentDidMount() {
    this.props.statuses.statuses_project.forEach((item) => {
      if (item.id == this.props.match.params.id) {
        this.setState({
          status: item,
          translation: item.translation
        });
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
    this.props.upsertStatus(this.state.status);
  }
  render() {
    const tran = Translator(this.props.codeList.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeList.data.PLACEHOLDER, this.props.lang);

    const token = this.props.statuses.statuses.filter(
      (i) => i.id == this.state.status.status_id
    )[0];
    return (
      <React.Fragment>
        <Typography
          style={{
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "1px solid #999"
          }}
          variant="h5"
          component="h1"
        >
          {token && token.token}
        </Typography>

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
          label={phTrans.translate("Status is closing")}
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
      return dispatch(new BaseService().queryThunt(CommandList.Status.UPSERT_STATUS, dto));
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditStatus));
