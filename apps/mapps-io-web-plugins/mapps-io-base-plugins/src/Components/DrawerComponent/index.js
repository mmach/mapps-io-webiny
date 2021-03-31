/*
    ./client/components/App.js
*/

import { Grid, IconButton } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { connect } from "react-redux";
import { mappsPlugins } from "../../index.js";
import DRAWER_ACTIONS from "./actions.js";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: "20px"
    }
}));
function DrawerComponent(props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, setState] = React.useState(false);
    const Logo = React.useMemo(
        () => mappsPlugins.byName("mapps-layout-logo-main-mobile").component
    );
    React.useEffect(() => {
        setState(props.drawer.open);
    }, [props.drawer.open]);

    const classes = useStyles();

    const toggleDrawer = open => event => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        if (open == true) {
            props.changeAction(true);
        } else {
            props.closeWindow();
        }
    };
    const body = (
        <SwipeableDrawer
            open={props.drawer.open}
            anchor={props.drawer.anchor}
            className={classes.modal}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={props.drawer.open}>
                <Grid container style={{ flexDirection: "column" }}>
                    <Grid
                        item
                        container
                        style={{
                            display: "flex",
                            alignItems: "center",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "rgba(255,255,255,0.8)",
                            zIndex: 2,
                            borderBottom: "1px solid #ddd"
                        }}
                    >
                        <Grid item xs="6">
                            <Logo disableSpinner={true} disableTransition={true} />
                        </Grid>
                        <Grid
                            item
                            xs="6"
                            style={{
                                display: "flex",
                                flexFlow: "row-reverse",
                                alignSelf: "center",
                                paddingRight: "5px"
                            }}
                        >
                            <IconButton onClick={toggleDrawer(false)}>
                                <CloseIcon />
                            </IconButton>
                            {props.drawer.menu &&
                                props.drawer.menu
                                    .sort((a, b) => (a.order > b.order ? 1 : -1))
                                    .map((i, key) => {
                                        const Component = i.component;
                                        return <Component variant="icon1" key={key}></Component>;
                                    })}
                        </Grid>
                    </Grid>
                    <Grid item>{props.drawer.body}</Grid>
                </Grid>
            </Fade>
        </SwipeableDrawer>
    );

    return body;
}

const mapStateToProps = state => {
    return {
        drawer: state.DrawerComponentReducer,
        config: state.ConfigReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeAction: (open, action) => {
            dispatch({
                type: DRAWER_ACTIONS.OPEN_DRAWER,
                dto: {
                    open: open,
                    action: action
                }
            });
        },
        closeWindow: () => {
            dispatch({
                type: DRAWER_ACTIONS.CLOSE_DRAWER,
                dto: {
                    open: false
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
