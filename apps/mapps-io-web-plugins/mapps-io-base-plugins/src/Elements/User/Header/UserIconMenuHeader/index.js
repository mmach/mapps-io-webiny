/*
    ./client/components/App.js
*/

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Tooltip from "@material-ui/core/Tooltip";
import { NavItem, NavMenu } from "@mui-treasury/components/menu/navigation";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";
import { CommandList, Enums, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseService } from "../../../../App/index.js";
import { usePrivilege } from "../../../../Hooks/usePrivilege.js";
import { mappsPlugins } from "../../../../index.js";
import { DIALOG_ALERT_ACTIONS, NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";
import { LANGUAGE_ACTIONS } from "./../../../../Reducers/index";

function UserIconMenuHeader(props) {
    const anchorRef = React.useRef(null);
    const [opened, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const LinkPlugin = React.useMemo(() => mappsPlugins.byName("mapps-item-basic-link").component);
    const tran = Translator(props.codeDict.data.LABEL, props.lang);
    const MenuQuery = React.useMemo(() => mappsPlugins.byName("mapps-menu-link-query").component);
    const hasAccess = React.useMemo(() => usePrivilege("mapps-layout-menu-header-user"));
    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    function onClick() {
        setOpen(!opened);
    }
    function onClose() {
        setOpen(false);
    }
    function logOut() {
        props.openDialog(
            true,
            <React.Fragment>
                <DialogTitle id="alert-dialog-slide-title">
                    {Translator(props.codeDict.data.LABEL, props.lang).translate(
                        "LOGOUT_CONFIRM_HEADER"
                    )}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {Translator(props.codeDict.data.LABEL, props.lang).translate(
                            "LOGOUT_USER_TEXT_HEADER"
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setLoading(true);
                            setOpen(false);

                            props.logOut().then(() => {
                                setLoading(false);

                                window.localStorage.removeItem("token");
                                window.localStorage.removeItem("refresh_token");

                                props.closeDialog();
                                props.setNotification(
                                    Enums.CODE.SUCCESS_GLOBAL,
                                    Translator(
                                        props.codeDict.data.SUCCESS_GLOBAL,
                                        props.lang
                                    ).translate("LOGGED_OUT_SUCCESS")
                                );
                                props.history.push("/");
                            });
                        }}
                        color="primary"
                    >
                        {Translator(props.codeDict.data.LABEL, props.lang).translate("YES_LABEL")}
                    </Button>
                    <Button
                        onClick={() => {
                            setLoading(false);

                            props.closeDialog();
                        }}
                        color="primary"
                    >
                        {Translator(props.codeDict.data.LABEL, props.lang).translate("NO_LABEL")}
                    </Button>
                </DialogActions>
            </React.Fragment>,
            () => {
                setLoading(false);
            }
        );
    }

    return hasAccess && (
        <Grid item>
            <IconButton
                ref={anchorRef}
                aria-controls={opened ? "user" : undefined}
                aria-haspopup="true"
                onClick={onClick}
            >
                <Tooltip title={props.auth.user.name.toUpperCase()}>
                    <Avatar
                        style={{ height: "24px", width: "24px" }}
                        alt="Remy Sharp"
                        src={
                            window.env.BLOB_URL +
                            "/blob/" +
                            (props.auth.user.blob_profile &&
                                props.auth.user.blob_profile.blob_min_id)
                        }
                    />
                </Tooltip>
            </IconButton>

            <Popper
                open={opened}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement={"bottom-end"}
                style={{
                    zIndex: "1001"
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom"
                        }}
                    >
                        <MenuQuery
                            slug="user-logged-menu"
                            component={menuProps => (
                                <Paper>
                                    <Grid container style={{ padding: "5px" }}>
                                        <Grid>
                                            <Avatar
                                                alt={props.auth.user.name}
                                                src={
                                                    window.env.BLOB_URL +
                                                    "/blob/" +
                                                    (props.auth.user.blob_profile &&
                                                        props.auth.user.blob_profile.blob_min_id)
                                                }
                                            />
                                        </Grid>
                                        <Grid style={{ alignSelf: "center", paddingLeft: "5px" }}>
                                            {props.auth.user.name.toUpperCase()}
                                        </Grid>
                                    </Grid>
                                    <NavMenu useStyles={usePlainNavigationMenuStyles}>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={opened}
                                                id={"user"}
                                                onKeyDown={onClose}
                                            >
                                                {menuProps.data.items &&
                                                    menuProps.data.items.map((i, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            onClick={onClose}
                                                            style={{ padding: "0px" }}
                                                        >
                                                            <NavItem
                                                                to={i.path}
                                                                as={LinkPlugin}
                                                                style={{
                                                                    textDecoration: "none",
                                                                    fontSize: "12px",
                                                                    letterSpacing: ".07143rem",
                                                                    textTransform: "uppercase",
                                                                    width: "100%"
                                                                }}
                                                            >
                                                                {tran.translate(i.title)}
                                                            </NavItem>
                                                        </MenuItem>
                                                    ))}

                                                <MenuItem
                                                    onClick={logOut}
                                                    style={{ padding: "0px" }}
                                                >
                                                    <NavItem
                                                        data-tag="pl"
                                                        style={{
                                                            textDecoration: "none",
                                                            fontSize: "12px",
                                                            letterSpacing: ".07143rem",
                                                            textTransform: "uppercase",
                                                            width: "100%"
                                                        }}
                                                    >
                                                        {tran.translate("USER_LOGOUT_BUTTON")}
                                                    </NavItem>
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </NavMenu>
                                </Paper>
                            )}
                        />
                    </Grow>
                )}
            </Popper>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        config: state.ConfigReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUserLanguage: language => {
            return dispatch(
                new BaseService().commandThunt(
                    CommandList.User.SET_LANGUAGE,
                    { language: language },
                    localStorage.token
                )
            );
        },

        setLanguage: lang => {
            dispatch({
                type: LANGUAGE_ACTIONS.SET_LANGUAGE,
                lang: lang
            });
        },
        openDialog: (open, body, onClose) => {
            dispatch({
                type: DIALOG_ALERT_ACTIONS.OPEN_DIALOG,
                dto: {
                    open: open,
                    body: body,
                    onClose: onClose
                }
            });
        },
        closeDialog: () => {
            dispatch({
                type: DIALOG_ALERT_ACTIONS.OPEN_DIALOG,
                dto: {}
            });
        },
        logOut: () => {
            return dispatch(new BaseService().commandThunt(CommandList.User.LOG_OUT, {}));
        },
        setNotification: (type, message) => {
            dispatch({
                type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
                notification: { message: message, type: type }
            });
        }
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(React.memo(UserIconMenuHeader))
);
