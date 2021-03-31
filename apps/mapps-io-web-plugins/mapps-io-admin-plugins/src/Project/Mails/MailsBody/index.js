/*
    ./client/components/App.jsx
*/

import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { Col, Container, Row, Label } from "reactstrap";
//import DictionaryEdit from './Scenes/Edit/index.jsx';
import { connect } from "react-redux";
import { QueryList } from "justshare-shared";
import { Switch, Route, Link } from "react-router-dom";
import { TextArea } from "mapps-io-base-plugins/src/Components/index.js";
import Iframe from "react-iframe";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";

const mailTemp = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <xsl:variable name="color" select="/color" />
        <xsl:variable name="base_url" select="/base_url" />
        <xsl:variable name="mail_template_link" select="/mail_template_link" />
        <xsl:variable name="logo" select="/logo" />

          <mjml>
            <mj-head>
               <mj-attributes>
                <mj-text padding="0" />
                <mj-class name="brd" border="1px solid {color}" />
                <mj-class name="color" color=" #a10f2b" />
                <mj-class name="bgcolor" background-color=" {color}" />

                <mj-all font-family="Helvetica" />
              </mj-attributes>
                <mj-style>
        .divider
        {
            height:1px;
              background-image: -webkit-linear-gradient(left, #fff, <xsl:value-of select="color" />, #fff); 
              background-image: -moz-linear-gradient(left, #fff,  <xsl:value-of select="color" />, #fff);  
              background-image: -ms-linear-gradient(left, #fff, <xsl:value-of select="color" />, #fff);  
              background-image: -o-linear-gradient(left, #fff,  <xsl:value-of select="color" />, #fff); 
            }
        .mj-link:hover { color: #ddd !important; }    
              
        </mj-style>
            </mj-head>
            <mj-body background-color="#eee">
                <mj-section padding="0px" full-width="full-width" background-color="{color}">
                    <mj-column padding="0px"></mj-column>
                    <mj-column padding="0px">
                        <mj-navbar base-url="{$base_url}" hamburger="hamburger" padding-top="5px" ico-color="#fff">
                            <mj-navbar-link padding="0px" padding-top="5px" padding-bottom="5px" padding-right="10px" padding-left="10px" href="/" color="#fff">#TRAN_MAIL_HOME_LINK_LABEL#</mj-navbar-link>
                            <mj-navbar-link padding="0px" padding-top="5px" padding-bottom="5px" padding-right="10px" padding-left="10px" href="/search" color="#fff">#TRAN_MAIL_SEARCH_LINK_LABEL#</mj-navbar-link>
                            <mj-navbar-link padding="0px" padding-top="5px" padding-bottom="5px" padding-right="10px" padding-left="10px" href="/" color="#fff">#TRAN_MAIL_ABOUT_LINK_LABEL#</mj-navbar-link>
                        </mj-navbar>
                    </mj-column>
                </mj-section>
            <mj-wrapper padding="0px" >

                <mj-section padding="0px" padding-top="10px" background-color="#fff" full-width="full-width">
                    <mj-column>
                        <mj-image src="{logo}" alt="OnePage" width="80px" padding-bottom="0px" padding-top="10px"></mj-image>
                    </mj-column>
                </mj-section>
                <mj-section padding="0px" background-color="#fff" full-width="full-width"></mj-section>
                <mj-section full-width="full-width" background-color="#fff">
                    <mj-column css-class="divider"></mj-column>
                </mj-section>
               #body#
                <mj-section full-width="full-width" background-color="#fff">
                    <mj-column css-class="divider"></mj-column>
                </mj-section>
                <mj-section full-width="full-width" background-color="#fff">
                    <mj-column>
                        <mj-social font-size="15px" icon-size="30px" mode="horizontal">
                            <mj-social-element name="facebook" href="https://facebook.com/justshare.it"></mj-social-element>
                            <mj-social-element name="twitter" href="https://twitter.com/justshare.it"></mj-social-element>
                        </mj-social>
                    </mj-column>
                </mj-section>
                </mj-wrapper>
                <mj-section padding="0px" full-width="full-width" background-color="{color}">
                    <mj-column></mj-column>
                    <mj-column></mj-column>
                   
                    <mj-column>
                        <mj-navbar base-url="https://www.mapps.io" hamburger="" padding-top="5px" ico-color="#fff">
                            <mj-navbar-link padding="0px" padding-top="5px" padding-bottom="5px" href="/" color="#ccc">
                                <span>powered by</span>
                                <span id="apptruth" style="color:rgb(229,146,40)"> mapps.io </span>
                            </mj-navbar-link>
                        </mj-navbar>
                    </mj-column>
                </mj-section>
            </mj-body>
        </mjml>
    </xsl:template>
</xsl:stylesheet>`;

const body = `<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   <xsl:template match="/">
      <xsl:variable name="url" select="/body/href" />
      <xsl:variable name="uid" select="/body/uid" />

<mj-wrapper  padding-left="10px" padding-right="10px"  background-color="#fff" padding="0px" full-width="full-width"> 
               <mj-section full-width="full-width" background-color="#fff" padding="0px">
                  <mj-column vertical-align="middle"  mj-class="brd" padding="3px">
                     <mj-image css-class=""  src="https://www.justshare.it/assets/remove_user_logo.jpg" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0px"></mj-image>
                  </mj-column>
               </mj-section>
               <mj-section background-color="#fff" full-width="full-width">
                  <mj-column width="100%" vertical-align="middle">
                     <mj-text align="center" color="#666" font-size="14px" padding-bottom="10px" font-family="Helvetica" >Это до свидания?</mj-text>
                     <mj-text font-family="Helvetica"  align="center" color="#666" font-size="14px" padding-bottom="10px">
      Наш сервис снова будет ждать регистрации.</mj-text>
                     <mj-text font-family="Helvetica"  align="center" color="#666" font-size="14px" padding-bottom="10px">
      Увидимся.</mj-text>
                  </mj-column>
               </mj-section>
            </mj-wrapper>
   </xsl:template>
</xsl:stylesheet> `;
class MailsBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.userTypes = [];
    this.state.isLoading = true;
    this.state.result = "";
    this.state.mailTemplate = mailTemp;
    this.state.mailBody = body;
  }
  componentDidMount() {}
  onClick() {
    this.props
      .compileMjml({
        templateXml: this.state.mailTemplate,
        payloadTemplateXml: {
          color: this.props.config.project.theme_color,
          base_url: this.props.config.project.base_url,
          logo: "http://localhost:8080/" + "assets/favicon.svg"
        },
        payloadBodyXml: {
          href: this.props.config.project.base_url + "/authorization",
          uid: this.props.config.project.base_url
        },
        mailBody: this.state.mailBody
      })
      .then((succ) => {
        this.setState({
          result: succ.data
        });
      });
  }
  render() {
    const iframe = '<iframe id="output_iframe1" width="540" height="450"></iframe>';

    return (
      <CSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
      >
        <div>
          <div className="row" id="output_iframe1">
            <Iframe
              style={{ border: "0px" }}
              className="col-9 g-pa-0 g-ma-0 g-brd-0"
              width="100%"
              height="500px"
              src={
                "data:text/html;charset=utf-8," +
                escape(this.state.result.html ? this.state.result.html : "")
              }
            ></Iframe>
            <Iframe
              style={{ border: "0px" }}
              className="col-3 g-pa-0 g-ma-0 g-brd-0"
              width="100%"
              height="500px"
              src={
                "data:text/html;charset=utf-8," +
                escape(this.state.result.html ? this.state.result.html : "")
              }
            ></Iframe>
          </div>
          <button onClick={this.onClick.bind(this)}>Run</button>

          <Row>
            <Editor
              value={JSON.stringify(
                {
                  color: this.props.config.project.theme_color,
                  base_url: this.props.config.project.base_url,
                  logo: this.props.config.project.base_url + "assets/favicon.svg"
                },
                null,
                4
              )}
              onValueChange={(code) => this.setState({ mailBody: code })}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12
              }}
              highlight={(code) => highlight(code, languages.js)}
              className="col-6"
            />
            <Editor
              value={JSON.stringify(
                {
                  href: this.props.config.project.base_url + "/authorization",
                  uid: this.props.config.project.base_url
                },
                null,
                4
              )}
              onValueChange={(code) => this.setState({ mailBody: code })}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12
              }}
              highlight={(code) => highlight(code, languages.js)}
              className="col-6"
            />
          </Row>
          <Row>
            <Editor
              value={this.state.mailTemplate}
              onValueChange={(code) => this.setState({ mailTemplate: code })}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12
              }}
              highlight={(code) => highlight(code, languages.xml)}
              className="col-6"
            />
            <Editor
              value={this.state.mailBody}
              onValueChange={(code) => this.setState({ mailBody: code })}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12
              }}
              highlight={(code) => highlight(code, languages.xml)}
              className="col-6"
            />
          </Row>
        </div>
      </CSSTransitionGroup>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    config: state.ConfigReducer,
    codeList: state.DictionaryReducer,
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    compileMjml: (dto) => {
      return dispatch(new BaseService().commandThunt(QueryList.Common.MJML_COMPILE, dto));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailsBody);
