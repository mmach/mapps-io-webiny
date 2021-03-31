import { Box, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
/*
    ./client/components/App.jsx
*/
import {
  CommandList,
  MailPartsDTO,
  MailSendersDTO,
  MailTypesDTO,
  MailTypesProjectsDTO,
  QueryList,
  Translator
} from "justshare-shared";
import React from "react";
import AceEditor from "react-ace";
import Iframe from "react-iframe";
//import DictionaryEdit from './Scenes/Edit/index.jsx';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  ButtonLoader,
  DropDownList,
  MODAL_ACTIONS,
  TranslateCompnent
} from "mapps-io-base-plugins/src/Components/index.js";
import MailsTypeBodyModal from "./MailsTypeBodyModal";
import MailsTypeTemplateModal from "./MailsTypeTemplateModal";

require("ace-builds/src-noconflict/mode-json");
require("ace-builds/src-noconflict/mode-xml");
require("ace-builds/src-noconflict/theme-monokai");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class MailsTypes extends React.Component {
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
    this.state.templateXml = { ...new MailPartsDTO(), id: uuid() };
    this.state.templateBodyXml = { ...new MailPartsDTO(), id: uuid() };
    this.state.globalLoading = false;
    this.state.compileLoading = false;
    this.state.currentTab = "desktop";
    this.state.result = {};
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.id != this.props.match.params.id ||
      this.props.mailList.mail_types != prevProps.mailList.mail_types
    ) {
      this.props.mailList.mail_types.forEach((item) => {
        if (item.id == this.props.match.params.id) {
          this.setState({
            mailtype: item,
            mailtypeGlobal: item.mailtype ? item.mailtype : this.state.mailtypeGlobal,
            mailSenders: item.mailsender ? item.mailsender : this.state.mailSenders,
            templateXml: item.template ? item.template : this.state.templateXml,
            templateBodyXml: item.body ? item.body : this.state.templateBodyXml,
            result: {}
          });
          setTimeout(() => {
            this.previewMails();
          }, 1000);
        }
      });
    }
  }
  componentDidMount() {
    this.props.mailList.mail_types.forEach((item) => {
      if (item.id == this.props.match.params.id) {
        this.setState({
          mailtype: item,
          mailtypeGlobal: item.mailtype ? item.mailtype : this.state.mailtypeGlobal,
          mailSenders: item.mailsender ? item.mailsender : this.state.mailSenders,
          templateXml: item.template ? item.template : this.state.templateXml,
          templateBodyXml: item.body ? item.body : this.state.templateBodyXml
        });
        setTimeout(() => {
          this.previewMails();
        }, 1000);
      }
    });
  }

  getDropDownValues() {
    return [{ id: "", value: "" }, ...this.props.mailList.mail_types_global].map((item) => {
      return {
        id: item.id,
        value: item.token ? item.token : item.value
      };
    });
  }
  getDropDownSenders() {
    return [{ id: "", value: "" }, ...this.props.mailList.mail_senders].map((item) => {
      return {
        id: item.id,
        value: item.email ? item.email : item.value
      };
    });
  }
  changeMailGlobal(event) {
    this.props.mailList.mail_types_global.forEach((item) => {
      if (item.id == event.target.value) {
        this.setState({
          mailtypeGlobal: item
        });
      }
    });
  }

  saveNewTemplateBody() {
    this.props.upsertMailsTemplate(this.state.templateBodyXml);
  }

  changeSendersGlobal(event) {
    this.props.mailList.mail_senders.forEach((item) => {
      if (item.id == event.target.value) {
        this.setState({
          mailSenders: item
        });
      }
    });
  }

  saveMailBody() {
    this.setState({
      globalLoading: true
    });
    const obj = {
      ...this.state.mailtype,
      mailsender_id: this.state.mailSenders.id,
      mail_body_id: this.state.templateBodyXml.id,
      mail_template_id: this.state.templateXml.id,
      mailtype_id: this.state.mailtypeGlobal.id
    };

    this.props.upsertMailType(obj).then(() => {
      this.props.getMail().then(() => {
        this.setState({
          globalLoading: false
        });
        this.props.history.push("/mapps/mails/templates/edit/" + this.state.mailtype.id);
      });
    });
  }

  previewMails() {
    try {
      const emailsTemplate = Translator(this.props.codeList.data.EMAIL, this.props.lang);
      let templateBody = this.state.templateBodyXml.body;
      let template = this.state.templateXml.body;
      let templateTranslate = Array.from(
        new Set(this.state.templateBodyXml.body.match(/(#TRAN_)\w*#/g))
      );
      if (templateTranslate.length > 0) {
        templateTranslate.forEach((item) => {
          const translate = emailsTemplate.translate(item);
          templateBody = templateBody.replace(new RegExp(item, "g"), translate);
        });
      }
      templateTranslate = Array.from(new Set(this.state.templateXml.body.match(/(#TRAN_)\w*#/g)));
      if (templateTranslate.length > 0) {
        templateTranslate.forEach((item) => {
          const translate = emailsTemplate.translate(item);
          template = template.replace(new RegExp(item, "g"), translate);
        });
      }
      this.setState({
        compileLoading: true
      });
      this.props
        .compileMjml({
          templateXml: template,
          payloadTemplateXml: JSON.parse(this.state.mailtypeGlobal.templatePayload),
          payloadBodyXml: JSON.parse(this.state.mailtypeGlobal.bodyPayload),
          mailBody: templateBody
        })
        .then(
          (succ) => {
            this.setState({
              compileLoading: false,

              result: succ.data
            });
          },
          () => {
            this.setState({
              compileLoading: false
            });
          }
        );
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    }
  }
  setTemplateBodyXml(model) {
    this.setState({
      templateBodyXml: model
    });
    setTimeout(() => {
      this.previewMails();
    }, 1000);
  }
  setTemplateXml(model) {
    this.setState({
      templateXml: model
    });
    setTimeout(() => {
      this.previewMails();
    }, 1000);
  }

  zoomBody() {
    const body = (
      <MailsTypeBodyModal
        body={this.state.templateBodyXml}
        submit={this.setTemplateBodyXml.bind(this)}
      />
    );

    this.props.openModal(true, body);
  }
  zoomTemplate() {
    const body = (
      <MailsTypeTemplateModal
        body={this.state.templateXml}
        submit={this.setTemplateXml.bind(this)}
      />
    );

    this.props.openModal(true, body);
  }

  zoomPayload(event) {
    const source = event.currentTarget.dataset.key;
    const mailTypeGlobal = { ...this.state.mailtypeGlobal };

    const body = (
      <AceEditor
        mode={"json"}
        theme="monokai"
        value={(this.state.mailtypeGlobal && this.state.mailtypeGlobal[source]
          ? this.state.mailtypeGlobal[source]
          : ""
        ).toString()}
        onChange={(code) => {
          mailTypeGlobal[source] = code;
          this.setState({
            mailtypeGlobal: { ...mailTypeGlobal }
          });
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

  changeTab(event, newTab) {
    this.setState({ currentTab: newTab });
  }

  render() {
    const tran = Translator(this.props.codeList.data.LABEL, this.props.lang);

    return (
      <Grid container>
        <Grid item container xs="5">
          <Grid item xs="12">
            <DropDownList
              label={tran.translate("MAILTYPE_SENDER")}
              valueOptions={this.getDropDownSenders.bind(this)()}
              value={this.state.mailSenders.id}
              onChange={this.changeSendersGlobal.bind(this)}
              field="type"
              validation={this.state.validation}
            />
          </Grid>
          <Grid item xs="12">
            <DropDownList
              label={tran.translate("MAILTYPE_TYPE")}
              valueOptions={this.getDropDownValues.bind(this)()}
              value={this.state.mailtypeGlobal.id}
              onChange={this.changeMailGlobal.bind(this)}
              field="type"
              validation={this.state.validation}
            />
          </Grid>
          <Grid item xs="12">
            <TranslateCompnent
              setTranslate={(translate) => {
                this.setState({ mailtype: { ...this.state.mailtype, translation: translate } });
              }}
              translation={this.state.mailtype.translation}
            ></TranslateCompnent>
          </Grid>
          <Grid item xs="6">
            <ButtonLoader
              data-key={"templatePayload"}
              onClick={this.zoomPayload.bind(this)}
              size={"md"}
              value={tran.translate("Global Payload")}
              isLoading={this.state.globalLoading}
            />
          </Grid>

          <Grid item xs="6">
            <ButtonLoader
              data-key={"bodyPayload"}
              onClick={this.zoomPayload.bind(this)}
              size={"md"}
              value={tran.translate("Body payload ")}
              isLoading={this.state.globalLoading}
            />
          </Grid>

          <Grid item xs="6">
            <ButtonLoader
              onClick={this.zoomTemplate.bind(this)}
              size={"md"}
              color={"secondary"}
              value={tran.translate("Main template")}
              isLoading={this.state.globalLoading}
            />{" "}
          </Grid>

          <Grid item xs="6">
            <ButtonLoader
              onClick={this.zoomBody.bind(this)}
              size={"md"}
              color={"secondary"}
              value={tran.translate("Body template ")}
              isLoading={this.state.globalLoading}
            />
          </Grid>
          <Grid item xs="12">
            <ButtonLoader
              color={"#00FF00"}
              onClick={this.previewMails.bind(this)}
              size={"md"}
              value={tran.translate("MAILTYPE_PREVIEW")}
              isLoading={this.state.compileLoading}
            />
          </Grid>
          <Grid item xs="12">
            <ButtonLoader
              onClick={this.saveMailBody.bind(this)}
              size={"md"}
              color={"primary"}
              value={tran.translate("MAILTYPE_SAVE")}
              isLoading={this.state.globalLoading}
            />
          </Grid>
        </Grid>
        <Grid item xs="7" style={{ backgroundColor: "#555" }}>
          <Paper>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={this.state.currentTab}
              onChange={this.changeTab.bind(this)}
              aria-label="wrapped label tabs example"
            >
              <Tab icon={<DesktopWindowsIcon />} value="desktop" />
              <Tab icon={<PhoneAndroidIcon />} value="mobile" />
            </Tabs>
          </Paper>
          <TabPanel value={this.state.currentTab} index="desktop">
            <Paper style={{ padding: "5px" }}>
              <Iframe
                style={{ border: "0px" }}
                width="100%"
                height="600px"
                src={
                  "data:text/html;utf-8," +
                  encodeURIComponent(this.state.result.html ? this.state.result.html : "")
                }
              ></Iframe>
            </Paper>
          </TabPanel>
          <TabPanel value={this.state.currentTab} index="mobile">
            <Grid justify="center" container style={{ padding: "30px" }}>
              <Grid xs="7">
                <Paper style={{ padding: "5px" }}>
                  <Iframe
                    style={{ border: "0px" }}
                    width="100%"
                    height="600px"
                    src={
                      "data:text/html;utf-8," +
                      encodeURIComponent(this.state.result.html ? this.state.result.html : "")
                    }
                  ></Iframe>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
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
      dispatch(new BaseService().commandThunt(CommandList.Mail.UPSERT_MAIL_PART, dto));
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailsTypes));
