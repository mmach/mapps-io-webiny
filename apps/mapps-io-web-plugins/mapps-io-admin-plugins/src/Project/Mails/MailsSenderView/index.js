/*
    ./client/components/App.jsx
*/

import { CssBaseline, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MailsListSender from "../MailsListSender";
import MailsSender from "../MailsSender";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import "./styles.scss";

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

function MailsSenderView() {
  const classes = useStyles();
  const Route = React.useMemo(()=>mappsPlugins.byName('mapps-item-basic-route').component);

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container>
        <Grid item xs="2">
          <Paper className={classes.drawer}>
            <div>
              <MailsListSender></MailsListSender>
            </div>
          </Paper>
        </Grid>
        <Grid xs="10" style={{ padding: "10px" }}>
          <Paper style={{ padding: "20px" }}>
            <Route
              path="/mapps/mails/accounts/new"
              render={({ props }) => <MailsSender {...props} />}
            />
            <Route
              path="/mapps/mails/accounts/edit/:id"
              render={({ props }) => <MailsSender {...props} />}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailsSenderView));
