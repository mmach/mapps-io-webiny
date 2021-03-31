/*
    ./client/components/App.jsx
*/

import { CssBaseline, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import GlobalMailsType from "../GlobalMailsType";
import MailsListGlobal from "../MailsListGlobal";
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
    height:'100%'
  },
  drawerContainer: {
    overflow: "auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function MailGlobal() {
  const classes = useStyles();
  const Route = React.useMemo(()=>mappsPlugins.byName('mapps-item-basic-route').component);

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container>
        <Grid item xs="2">
          <Paper
            className={classes.drawer}
           >
            <div>
              <MailsListGlobal></MailsListGlobal>
            </div>
          </Paper>
        </Grid>
        <Grid xs="10" style={{padding:'10px'}}>
          <Paper style={{padding:'20px'}}>
            <Route
              path="/mapps/mails/global/new"
              render={({ props }) => <GlobalMailsType {...props} />}
            />
               <Route
              path="/mapps/mails/global/edit/:id"
              render={({ props }) => <GlobalMailsType {...props} />}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailGlobal));
