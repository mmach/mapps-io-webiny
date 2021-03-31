/*
    ./client/components/App.jsx
*/

import { Grid, Typography } from "@material-ui/core";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import AceEditor from "react-ace";
import { CommandList, MailTypesDTO, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { ButtonLoader, MODAL_ACTIONS, TextArea, TextBox } from "mapps-io-base-plugins/src/Components/index.js";
require("ace-builds/src-noconflict/mode-json");
require("ace-builds/src-noconflict/mode-html");
require("ace-builds/src-noconflict/theme-monokai");

class GlobalMailsType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.mailtype = { ...new MailTypesDTO() };
    this.state.globalLoading = false;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      return true;
    } else if (this.state.mailtype != nextState.mailtype) {
      return true;
    } else if (this.props.mailList.mail_types_global != nextProps.mailList.mail_types_global) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.id != this.props.match.params.id ||
      this.props.mailList.mail_types_global != prevProps.mailList.mail_types_global
    ) {
      this.props.mailList.mail_types_global.forEach((item) => {
        if (item.id == this.props.match.params.id) {
          this.setState({
            mailtype: item
          });
        }
      });
    }
  }
  componentDidMount() {
    this.props.mailList.mail_types_global.forEach((item) => {
      if (item.id == this.props.match.params.id) {
        this.setState({
          mailtype: item
        });
      }
    });
  }

  submitNewGlobalMailTypeHanlder() {
    this.setState({
      globalLoading: true
    });

    this.props.upsertMailType(this.state.mailtype).then(() => {
      this.props.getMailsGlobal();
      this.setState({
        globalLoading: false
      });
    });
  }

  zoomPayload(event) {
    const source = event.currentTarget.dataset.key;

    const body = (
      <AceEditor
        mode={source.match("Payload") ? "json" : "html"}
        theme="monokai"
        value={(this.state.mailtype[source] ? this.state.mailtype[source] : "").toString()}
        onChange={(code) => {
          const state = this.state.mailtype;
          state[source] = code;
          this.setState({ mailtype: { ...state } });
        }}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,

          width: "90vw",
          height: "90vh"
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
    );
    this.props.openModal(true, body);
  }
  render() {
    const tran = Translator(this.props.codeList.data.LABEL, this.props.lang);

    return (
      <React.Fragment>
        <Container>
          <Typography
            style={{
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "1px solid #999"
            }}
            variant="h5"
            component="h1"
          >
            {tran.translate("MAILTYPE_HEADER")}
          </Typography>

          <Grid item>
            <TextBox
              label={tran.translate("MAIL_MAILTYPE_TOKEN_ACTIONS")}
              value={this.state.mailtype.token}
              onChange={(event) => {
                this.setState({
                  mailtype: { ...this.state.mailtype, token: event.target.value.toUpperCase() }
                });
              }}
            />
            <TextArea
              label={tran.translate("MAILTYPE_TOKEN_DESCRIPTION_ACTIONS")}
              value={this.state.mailtype.description}
              onChange={(event) => {
                this.setState({
                  mailtype: { ...this.state.mailtype, description: event.target.value }
                });
              }}
            ></TextArea>
            <Grid container space="2">
              <Grid item xs="6" style={{ paddingRight: "2px" }}>
                <Typography
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #999"
                  }}
                  variant="h6"
                  component="h2"
                >
                  <ButtonLoader
                    data-key={"templatePayload"}
                    onClick={this.zoomPayload.bind(this)}
                    value={<ZoomOutMapIcon></ZoomOutMapIcon>}
                    isLoading={false}
                  />
                  {tran.translate("MAILTYPE_TEMPLATE_PAYLOAD")}(JSON)
                </Typography>

                <AceEditor
                  mode="json"
                  theme="monokai"
                  value={(this.state.mailtype.templatePayload
                    ? this.state.mailtype.templatePayload
                    : ""
                  ).toString()}
                  onChange={(code) => {
                    this.setState({ mailtype: { ...this.state.mailtype, templatePayload: code } });
                  }}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    borderColor: "#888",
                    width: "100%"
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
              <Grid item xs="6" style={{ paddingLeft: "2px" }}>
                <Typography
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #999"
                  }}
                  variant="h6"
                  component="h2"
                >
                  <ButtonLoader
                    data-key={"bodyPayload"}
                    onClick={this.zoomPayload.bind(this)}
                    value={<ZoomOutMapIcon></ZoomOutMapIcon>}
                    isLoading={false}
                  />
                  {tran.translate("MAILTYPE_BODY_PAYLOAD")}(JSON)
                </Typography>

                <AceEditor
                  mode="json"
                  theme="monokai"
                  value={(this.state.mailtype.bodyPayload
                    ? this.state.mailtype.bodyPayload
                    : ""
                  ).toString()}
                  onChange={(code) => {
                    this.setState({ mailtype: { ...this.state.mailtype, bodyPayload: code } });
                  }}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,

                    width: "100%"
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
            </Grid>
            <Grid container space="2" style={{ marginTop: "20px" }}>
              <Grid item xs="6" style={{ paddingRight: "2px" }}>
                <Typography
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #999"
                  }}
                  variant="h6"
                  component="h2"
                >
                  <ButtonLoader
                    data-key={"templateBody"}
                    onClick={this.zoomPayload.bind(this)}
                    value={<ZoomOutMapIcon></ZoomOutMapIcon>}
                    isLoading={false}
                  />
                  {tran.translate("MAILTYPE_BODY_PAYLOAD")}(MJML+XML)
                </Typography>

                <AceEditor
                  mode="xml"
                  theme="monokai"
                  value={(this.state.mailtype.templateBody
                    ? this.state.mailtype.templateBody
                    : ""
                  ).toString()}
                  onChange={(code) => {
                    this.setState({ mailtype: { ...this.state.mailtype, templateBody: code } });
                  }}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,

                    width: "100%"
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
              <Grid item xs="6" style={{ paddingLeft: "2px" }}>
                <Typography
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #999"
                  }}
                  variant="h6"
                  component="h2"
                >
                  <ButtonLoader
                    data-key={"body"}
                    onClick={this.zoomPayload.bind(this)}
                    value={<ZoomOutMapIcon></ZoomOutMapIcon>}
                    isLoading={false}
                  />
                  {tran.translate("MAILTYPE_BODY")}(XSLT+MJML)
                </Typography>

                <AceEditor
                  mode="xml"
                  theme="monokai"
                  value={(this.state.mailtype.body ? this.state.mailtype.body : "").toString()}
                  onChange={(code) => {
                    this.setState({ mailtype: { ...this.state.mailtype, body: code } });
                  }}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,

                    width: "100%"
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
            </Grid>
          </Grid>

          <ButtonLoader
            onClick={this.submitNewGlobalMailTypeHanlder.bind(this)}
            size={"md"}
            color={"primary"}
            value={tran.translate("ACTION_BUTTON_SAVE")}
            isLoading={this.state.globalLoading}
          />
        </Container>
      </React.Fragment>
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
      return dispatch(new BaseService().commandThunt(CommandList.Mail.UPSERTE_MAIL_TYPE, dto));
    },
    getMailsGlobal: (dto) => {
      dispatch(new BaseService().queryThunt(QueryList.Mail.GET_MAIL_TYPE, dto));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalMailsType));
