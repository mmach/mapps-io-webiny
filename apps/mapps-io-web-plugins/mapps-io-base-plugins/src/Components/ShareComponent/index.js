/*
    ./client/components/App.js
*/

import { Grid, Typography, TextField, IconButton } from "@material-ui/core";
import { Translator } from "justshare-shared";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
class ShareComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    return (
      <Grid container>
        <Grid container>
          <Typography variant={"h5"}>{tran.translate("SHARECOMPONENTS_COPIED_HEADER")}</Typography>
        </Grid>
        <Grid container style={{ placeContent: "space-around" }}>
          <Grid item>
            <EmailShareButton
              className="g-px-5"
              subject={this.props.title}
              quote={this.props.title}
              url={this.props.link}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </Grid>
          <Grid item>
            <FacebookShareButton className="g-px-5" quote={this.props.title} url={this.props.link}>
              {" "}
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Grid>
          <Grid item>
            <TwitterShareButton className="g-px-5" quote={this.props.title} url={this.props.link}>
              {" "}
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Grid>
          <Grid item>
            <WhatsappShareButton className="g-px-5" quote={this.props.title} url={this.props.link}>
              {" "}
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Grid>
          <Grid item>
            <FacebookMessengerShareButton
              className="g-px-5"
              appId={"2894998510712408"}
              quote={this.props.title}
              url={this.props.link}
            >
              {" "}
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: "20px" }}>
          <TextField
            disabled="false"
            value={this.props.link}
            label={tran.translate("SHARECOMPONENTS_COPIED_TEXT")}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid container>
          <Grid item>
            <CopyToClipboard text={this.props.link} onCopy={() => this.setState({ copied: true })}>
              <IconButton style={{ marginTop: "-3px" }}>
                <FileCopyIcon />
              </IconButton>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.LanguageReducer,
    codeDict: state.DictionaryReducer,
    auth: state.AuthReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareComponent);
