/*
    ./client/components/App.jsx
*/

import { CssBaseline, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddStatus from "./AddStatus";
import StatusGlobalList from "./StatusGlobalList";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: 300,
        flexShrink: 0
    },
    drawerPaper: {
        width: 300,
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

function StatusesGlobal() {
    const classes = useStyles();
    const Route = React.useMemo(()=>mappsPlugins.byName('mapps-item-basic-route').component);

    return (
        <Grid container>
            <CssBaseline />
            <Grid item xs="3">
                <Grid container>
                    <Paper className={classes.drawer}>
                        <StatusGlobalList></StatusGlobalList>
                    </Paper>
                </Grid>
            </Grid>
            <Grid xs="9" style={{ padding: "10px" }}>
                <Paper style={{ padding: "20px" }}>
                 
                    <Route
                        path="/mapps/status/global/new"
                        render={({ props }) => <AddStatus {...props} />}
                    />
                      <Route
                        path="/mapps/status/global/edit/:id"
                        render={({ props }) => <AddStatus {...props} />}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusesGlobal));
