import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { mappsPlugins } from "../../../index.js";

const FooterCollapseRender = (props) => {
    const FooterNormal = React.useMemo(
        ()=>mappsPlugins.byName("mapps-layout-footer-base-desktop").component
    );
    if (!props.data) {
        return null;
    }
    const [open, setOpen] = React.useState(false);
    const item = props.data;
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <React.Fragment>
            <Grid ref={anchorRef} container style={{ justifyContent: "center", height: "35px" }}>
                <Grid item style={{ alignSelf: "center" }}>
                    <IconButton
                        size="small"
                        aria-controls={open ? item.id : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        {open != true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                </Grid>
            </Grid>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement={"top-start"}
                style={{ zIndex: "1000" }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom"
                        }}
                    >
                        <div style={{ width: "100vw", padding: "0px", marginLeft: "5px" }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <FooterNormal {...props} />
                            </ClickAwayListener>
                        </div>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        config: state.ConfigReducer,
        lang: state.LanguageReducer
    };
};

const mapDispatchToProps = () => {
    return;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterCollapseRender));
