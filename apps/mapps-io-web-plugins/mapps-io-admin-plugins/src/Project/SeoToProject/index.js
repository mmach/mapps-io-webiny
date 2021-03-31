import { Container, Grid, Paper, Typography } from "@material-ui/core";
/*
    ./client/components/App.jsx
*/

import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { ButtonLoader, TextBox,BodyLoader,Checkbox } from "mapps-io-base-plugins/src/Components/index.js";

class SeoToProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.seo = {};
    this.state.seo.id = uuid();
    this.state.isLoadnig=true;
  }

  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {

    this.props.getSeo({}).then((succ) => {
      this.setState({
        seo: succ.data[0] ? succ.data[0] : { ...this.state.seo },
        isLoadnig:false
    });

    });
  }
  submitHanlder() {
    this.props.upsertSeo(this.state.seo);
  }
  facebookType(event) {
    this.setState({ seo: { ...this.state.seo, fb_type: event.target.value } });
  }
  render() {
    const tran = Translator(this.props.codeList.data.LABEL, this.props.lang);
    if (this.state.isLoadnig) {
        return (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ height: "92vh", display: "flex" }}
          >
            <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
          </Grid>
        );
      }
    return (
      <React.Fragment>
        <Container fixed id="actionProject">
          <Grid
            style={{ width: "100%", height: "100%" }}
            container
            direction="column"
            justify="center"
          >
            <Paper
              style={{
                padding: "20px",
                width: "auto",
                minWidth: "700px",
                justifyContent: "center",
                display: "flex"
              }}
            >
              <Grid xs="8" direction="column" justify={"center"} container>
                <Typography
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #999"
                  }}
                  variant="h5"
                  component="h1"
                >
                  {tran.translate("OPEN GRAPH")}
                </Typography>

                <TextBox
                  label={tran.translate("Facebook AppId")}
                  value={this.state.seo.fb_app_id}
                  onChange={(event) => {
                    this.setState({
                      seo: { ...this.state.seo, fb_app_id: event.target.value }
                    });
                  }}
                ></TextBox>
                <TextBox
                  label={tran.translate("URL")}
                  value={this.state.seo.fb_url}
                  onChange={(event) => {
                    this.setState({ seo: { ...this.state.seo, fb_url: event.target.value } });
                  }}
                ></TextBox>
                <TextBox
                  label={tran.translate("Title")}
                  value={this.state.seo.fb_title}
                  onChange={(event) => {
                    this.setState({ seo: { ...this.state.seo, fb_title: event.target.value } });
                  }}
                ></TextBox>
                <TextBox
                  label={tran.translate("Type")}
                  value={this.state.seo.fb_type}
                  onChange={this.facebookType}
                ></TextBox>
                <TextBox
                  label={tran.translate("image")}
                  value={this.state.seo.fb_image}
                  onChange={(event) => {
                    this.setState({ seo: { ...this.state.seo, fb_image: event.target.value } });
                  }}
                ></TextBox>
                <TextBox
                  label={tran.translate("description")}
                  value={this.state.seo.fb_description}
                  onChange={(event) => {
                    this.setState({
                      seo: { ...this.state.seo, fb_description: event.target.value }
                    });
                  }}
                ></TextBox>
                <TextBox
                  label={tran.translate("image")}
                  value={this.state.seo.fb_site_name}
                  onChange={(event) => {
                    this.setState({
                      seo: { ...this.state.seo, fb_site_name: event.target.value }
                    });
                  }}
                ></TextBox>
                <Checkbox
                  label={tran.translate("Sietmap generator")}
                  value={this.state.seo.sitemap_gen}
                  onChange={(event) => {
                    this.setState({
                      seo: { ...this.state.seo, sitemap_gen: event.target.checked }
                    });
                  }}
                ></Checkbox>

                <ButtonLoader
                  onClick={this.submitHanlder.bind(this)}
                  size={"md"}
                  color={"primary"}
                  value={tran.translate("ACTION_BUTTON_SAVE")}
                  isLoading={this.state.newLoading}
                />
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeList: state.DictionaryReducer,
    lang: state.LanguageReducer,
    mailList: state.MailsListReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertSeo: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Seo.UPSERT_SEO, dto));
    },
    getSeo: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Seo.GET_SEO, dto));
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SeoToProject));
