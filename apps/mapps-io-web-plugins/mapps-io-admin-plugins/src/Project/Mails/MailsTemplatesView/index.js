/*
    ./client/components/App.jsx
*/

import { CssBaseline, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MailsListTemplates from "../MailsListTemplates";
import MailsType from "../MailsType";
import "./styles.scss";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    height: "100%"
  },
  drawerContainer: {
    overflow: "auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function MailsTemplatesView() {
  const classes = useStyles();
  const Route = React.useMemo(()=>mappsPlugins.byName('mapps-item-basic-route').component);

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container>
        <Grid item xs="2">
          <Paper className={classes.drawer}>
            <div>
              <MailsListTemplates></MailsListTemplates>
            </div>
          </Paper>
        </Grid>
        <Grid xs="10" style={{ padding: "10px" }}>
          <Paper style={{ padding: "20px" }}>
            <Route
              path="/mapps/mails/templates/new"
              render={({ props }) => <MailsType {...props} />}
            />
            <Route
              path="/mapps/mails/templates/edit/:id"
              render={({ props }) => <MailsType {...props} />}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailsTemplatesView));
