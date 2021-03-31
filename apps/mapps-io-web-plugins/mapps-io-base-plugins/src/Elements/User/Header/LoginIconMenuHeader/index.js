/*
    ./client/components/App.js
*/

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Tooltip from "@material-ui/core/Tooltip";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { NavItem, NavMenu } from "@mui-treasury/components/menu/navigation";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";
import { CommandList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseService } from "../../../../App/index.js";
import { usePrivilege } from "../../../../Hooks/usePrivilege.js";
import { mappsPlugins } from "../../../../index.js";
import { DIALOG_ALERT_ACTIONS, NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";
import { LANGUAGE_ACTIONS } from "./../../../../Reducers/index";

function LoginIconMenuHeader(props) {
    const anchorRef = React.useRef(null);
    const [opened, setOpen] = React.useState(false);
    const LinkPlugin = React.useMemo(() => mappsPlugins.byName("mapps-item-basic-link").component);
    const MenuQuery = React.useMemo(() => mappsPlugins.byName("mapps-menu-link-query").component);
    const hasAccess = usePrivilege("mapps-layout-menu-header-login");

    const tran = Translator(props.codeDict.data.LABEL, props.lang);

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
    return (
        hasAccess && (
            <Grid item>
                <IconButton
                    ref={anchorRef}
                    aria-controls={opened ? "login" : undefined}
                    aria-haspopup="true"
                    onClick={onClick}
                >
                    <Tooltip
                        placement="left"
                        title={tran.translate("LABEL_LINK_SIGN_LINK").toUpperCase()}
                    >
                        <PersonOutlineIcon />
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
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <MenuQuery
                                slug="login-user-menu"
                                component={props => (
                                    <Paper>
                                        <NavMenu useStyles={usePlainNavigationMenuStyles}>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={opened}
                                                    id={"login"}
                                                    onKeyDown={onClose}
                                                >
                                                    {props.data.items &&
                                                        props.data.items.map((i, index) => (
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
        )
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
    connect(mapStateToProps, mapDispatchToProps)(React.memo(LoginIconMenuHeader))
);
