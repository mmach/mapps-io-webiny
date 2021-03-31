/*
    ./client/components/App.jsx
*/

import { CssBaseline, makeStyles, Toolbar } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./styles.scss";
import UserTypesEdit from "./UserTypesEdit";
import UserTypesList from "./UserTypesList";
import UserTypesNew from "./UserTypesNew";

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

function UserTypes() {
  const classes = useStyles();
  const Route = React.useMemo(()=>mappsPlugins.byName('mapps-item-basic-route').component);
  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
      >
        <Toolbar />
        <div>
          <UserTypesList></UserTypesList>
        </div>
      </Drawer>
      <Route
        path="/mapps/users/settings/types/new"
        render={({ props }) => <UserTypesNew {...props} />}
      />
      <Route
        path="/mapps/users/settings/types/edit/:id"
        render={({ props }) => <UserTypesEdit {...props} />}
      />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTypes));
