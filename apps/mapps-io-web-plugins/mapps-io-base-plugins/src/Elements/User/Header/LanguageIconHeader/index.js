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
import LanguageIcon from "@material-ui/icons/Language";
import { NavItem, NavMenu } from "@mui-treasury/components/menu/navigation";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";
import { CommandList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseService } from "../../../../App/index.js";
import { usePrivilege } from "../../../../Hooks/usePrivilege.js";
import { DIALOG_ALERT_ACTIONS, NOTIFICATIONS_ACTIONS } from "./../../../../Components/index.js";
import { LANGUAGE_ACTIONS } from "./../../../../Reducers/index";

function LanguageIconHeader(props) {
    const anchorRef = React.useRef(null);
    const [opened, setOpen] = React.useState(false);
    const [language,setLang] = React.useState('')
    const hasAccess=usePrivilege('mapps-layout-menu-header-language')

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
    React.useEffect(() => {
        switch (props.lang) {
            case "us":
              setLang(tran.translate("LANG_ENGLISH_LABEL"));
                break;
            case "pl":
              setLang(tran.translate("LANG_POLISH_LABEL"));
                break;
            case "de":
              setLang(tran.translate("LANG_DEAUTSCH_LABEL"));
                break;
            case "ru":
              setLang(tran.translate("LANG_RUSSIA_LABEL"));
                break;
            case "fr":
              setLang(tran.translate("LANG_FRANCE_LABEL"));
                break;
            case "es":
              setLang(tran.translate("LANG_SPAIN_LABEL"));
                break;
            case "no":
              setLang(tran.translate("LANG_NORWEGIAN_LABEL"));
                break;
            case "zh_cn":
              setLang(tran.translate("LANG_CHINESS_LABEL"));
                break;
            case "token":
              setLang(tran.translate("token"));
                break;

            default:
                return "";
        }
    },[props.lang]);
    function setLanguageHandler(event) {
        const lang = event.currentTarget.getAttribute("data-tag");
        if (props.auth.is_logged) {
            localStorage.setItem("lang", lang);
            props.setUserLanguage(lang).then(() => {
                props.setLanguage(lang);
            });
        } else {
            localStorage.setItem("lang", lang);
            props.setLanguage(lang);
        }
    }

    return hasAccess && (
        <Grid item>
            <IconButton
                ref={anchorRef}
                aria-controls={opened ? "language" : undefined}
                aria-haspopup="true"
                onClick={onClick}
            >
                <Tooltip title={language.toUpperCase()} placement="left">
                    <LanguageIcon />
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
                        <Paper>
                            <NavMenu useStyles={usePlainNavigationMenuStyles}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={props.opened}
                                        id={"language"}
                                        onKeyDown={onClose}
                                    >
                                        {props.config.languages.includes("pl") ? (
                                            <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                                <NavItem
                                                    data-tag="pl"
                                                    onClick={setLanguageHandler}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "12px",
                                                        letterSpacing: ".07143rem",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    {tran.translate("LANG_POLISH_LABEL")}
                                                </NavItem>
                                            </MenuItem>
                                        ) : (
                                            <span></span>
                                        )}
                                        {props.config.languages.includes("us") ? (
                                            <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                                <NavItem
                                                    data-tag="us"
                                                    onClick={setLanguageHandler}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "12px",
                                                        letterSpacing: ".07143rem",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    {tran.translate("LANG_ENGLISH_LABEL")}
                                                </NavItem>
                                            </MenuItem>
                                        ) : (
                                            <span></span>
                                        )}
                                        {props.config.languages.includes("ru") ? (
                                            <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                                <NavItem
                                                    data-tag="ru"
                                                    onClick={setLanguageHandler}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "12px",
                                                        letterSpacing: ".07143rem",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    {tran.translate("LANG_RUSSIA_LABEL")}
                                                </NavItem>
                                            </MenuItem>
                                        ) : (
                                            <span></span>
                                        )}
                                        {props.config.languages.includes("de") ? (
                                            <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                                <NavItem
                                                    data-tag="de"
                                                    onClick={setLanguageHandler}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "12px",
                                                        letterSpacing: ".07143rem",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    {tran.translate("LANG_DEAUTSCH_LABEL")}
                                                </NavItem>
                                            </MenuItem>
                                        ) : (
                                            <span></span>
                                        )}
                                        {props.config.languages.includes("fr") ? (
                                            <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                                <NavItem
                                                    data-tag="fr"
                                                    onClick={setLanguageHandler}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "12px",
                                                        letterSpacing: ".07143rem",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    {tran.translate("LANG_FRANCE_LABEL")}
                                                </NavItem>
                                            </MenuItem>
                                        ) : (
                                            <span></span>
                                        )}
                                        {props.config.languages.includes("es") ? (
                                            <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                                <NavItem
                                                    data-tag="es"
                                                    onClick={setLanguageHandler}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "12px",
                                                        letterSpacing: ".07143rem",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    {tran.translate("LANG_SPAIN_LABEL")}
                                                </NavItem>
                                            </MenuItem>
                                        ) : (
                                            <span></span>
                                        )}
                                        {props.config.languages.includes("no") ? (
                                            <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                                <NavItem
                                                    data-tag="no"
                                                    onClick={setLanguageHandler}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "12px",
                                                        letterSpacing: ".07143rem",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    {tran.translate("LANG_NORWEGIAN_LABEL")}
                                                </NavItem>
                                            </MenuItem>
                                        ) : (
                                            <span></span>
                                        )}
                                        {props.config.languages.includes("zh_cn") ? (
                                            <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                                <NavItem
                                                    data-tag="zh_cn"
                                                    onClick={setLanguageHandler}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "12px",
                                                        letterSpacing: ".07143rem",
                                                        textTransform: "uppercase"
                                                    }}
                                                >
                                                    {tran.translate("LANG_CHINESS_LABEL")}
                                                </NavItem>
                                            </MenuItem>
                                        ) : (
                                            <span></span>
                                        )}
                                        <MenuItem onClick={onClose} style={{ padding: "0px" }}>
                                            <NavItem
                                                data-tag="token"
                                                onClick={setLanguageHandler}
                                                style={{
                                                    textDecoration: "none",
                                                    fontSize: "12px",
                                                    letterSpacing: ".07143rem",
                                                    textTransform: "uppercase"
                                                }}
                                            >
                                                {tran.translate("TOKEN")}
                                            </NavItem>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </NavMenu>
                        </Paper>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(LanguageIconHeader)));
