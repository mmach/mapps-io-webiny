/*
    ./client/components/App.jsx
*/

import { CssBaseline, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditStatus from "./EditStatus";
import StatusesNew from "./StatusesNew";
import StatusList from "./StatusList";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: 200,
    flexShrink: 0
  },
  drawerPaper: {
    width: 200,
    zIndex: 3
  },
  drawerContainer: {
    overflow: "auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function Statuses() {
  const classes = useStyles();
  const Route = React.useMemo(()=>mappsPlugins.byName('mapps-item-basic-route').component);

  return (
    <Grid container>
      <CssBaseline />
      <Grid item xs="2">
        <Grid container>
          <Paper className={classes.drawer}>
            <StatusList></StatusList>
          </Paper>
        </Grid>
      </Grid>
      <Grid xs="10" style={{ padding: "10px" }}>
        <Paper style={{ padding: "20px" }}>
          <Route
            path="/mapps/status/project/edit/:id"
            render={({ props }) => <EditStatus {...props} />}
          />
          <Route
            path="/mapps/status/project/new"
            render={({ props }) => <StatusesNew {...props} />}
          />
        </Paper>
      </Grid>
    </Grid>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Statuses));
