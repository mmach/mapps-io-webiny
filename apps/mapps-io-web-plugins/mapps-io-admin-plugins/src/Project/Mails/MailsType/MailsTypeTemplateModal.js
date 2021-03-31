import { Grid } from "@material-ui/core";
/*
    ./client/components/App.jsx
*/
import {
  CommandList,
  MailSendersDTO,
  MailTypesDTO,
  MailTypesProjectsDTO,
  QueryList,
  Translator
} from "justshare-shared";
import React from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { ButtonLoader, DropDownList, MODAL_ACTIONS, TextBox } from "mapps-io-base-plugins/src/Components/index.js";

require("ace-builds/src-noconflict/mode-json");
require("ace-builds/src-noconflict/mode-html");
require("ace-builds/src-noconflict/theme-monokai");

class MailsTypeBodyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.mailtype = { ...new MailTypesProjectsDTO() };
    this.state.mailtype.translation = {
      id: uuid()
    };
    this.state.globalLoading = false;
    this.state.mailtypeGlobal = { ...new MailTypesDTO() };
    this.state.mailSenders = { ...new MailSendersDTO() };
    this.state.templateXml = this.props.body;
    this.state.globalLoading = false;
    this.state.compileLoading = false;

    this.state.result = {};
  }
  shouldComponentUpdate() {
    return true;
  }

  getDropdownTemplatesList() {
    return [
      { id: "", value: "", type: "TEMPLATE" },
      { id: "DEFAULT", value: "DEFAULT", type: "TEMPLATE" },
      ...this.props.mailList.mail_parts
    ]
      .filter((item) => {
        return item.type == "TEMPLATE";
      })
      .map((item) => {
        return {
          id: item.id,
          value: item.name ? item.name : item.value
        };
      });
  }
  saveNewTemplate() {
    this.props.upsertMailsTemplate(this.state.templateXml).then(() => {
      this.props.getMailsParts();
      this.props.submit(this.state.templateXml);
    });
  }

  changeMailTemplate(event) {
    if (event.target.value == "DEFAULT") {
      this.setState({
        templateXml: {
          ...this.state.templateXml,
          id: uuid(),
          body: this.state.mailtypeGlobal.templateBody,
          type: "TEMPLATE",
          name: "DEFAULT"
        }
      });
      return;
    }
    this.props.mailList.mail_parts.forEach((item) => {
      if (item.id == event.target.value) {
        this.setState({
          templateXml: item
        });
      }
    });
  }

  render() {
    const tran = Translator(this.props.codeList.data.LABEL, this.props.lang);

    return (
      <Grid container style={{ width: "90vw", height: "90vh" }}>
        <Grid container item style={{ height: "10%" }}>
          <Grid item xs="5">
            <DropDownList
              label={tran.translate("MAILTYPE_TEMPLATE_BODY_XSLT")}
              valueOptions={this.getDropdownTemplatesList.bind(this)()}
              value={this.state.templateXml.id}
              onChange={this.changeMailTemplate.bind(this)}
              validation={this.state.validation}
            />
          </Grid>
          <Grid item xs="5">
            <TextBox
              label={tran.translate("MAIL_SENDER_NAME_ACTIONS")}
              value={this.state.templateXml.name}
              onChange={(event) => {
                this.setState({
                  templateXml: { ...this.state.templateXml, name: event.target.value }
                });
              }}
            ></TextBox>
          </Grid>
        </Grid>
        <Grid item style={{ height: "85%" }}>
          <AceEditor
            mode={"html"}
            theme="monokai"
            value={(this.state.templateXml && this.state.templateXml.body
              ? this.state.templateXml.body
              : ""
            ).toString()}
            onChange={(code) => {
              this.setState({ templateXml: { ...this.state.templateXml, body: code } });
            }}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,

              width: "90vw",
              height: "100%"
            }}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
        </Grid>
        <Grid item xs="1" style={{ height: "5%" }}>
          <ButtonLoader
            onClick={this.saveNewTemplate.bind(this)}
            color={"primary"}
            value={tran.translate("MAILTYPE_TEMPLATE_SAVE")}
            isLoading={this.state.globalLoading}
          />
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    config: state.ConfigReducer,
    codeList: state.DictionaryReducer,
    lang: state.LanguageReducer,
    mailList: state.MailsListReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (open, body) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          body: body
        }
      });
    },
    upsertMailType: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Mail.UPSERT_MAIL_TYPE_PROJECT, dto)
      );
    },
    getMailsGlobal: (dto) => {
      dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_TYPE, dto));
    },
    upsertMailsTemplate: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Mail.UPSERT_MAIL_PART, dto));
    },
    compileMjml: (dto) => {
      return dispatch(new BaseService().commandThunt(QueryList.Common.MJML_COMPILE, dto));
    },
    getMailsParts: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_PART, dto));
    },
    getMail: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_TYPE_PROJECT, dto));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailsTypeBodyModal));
