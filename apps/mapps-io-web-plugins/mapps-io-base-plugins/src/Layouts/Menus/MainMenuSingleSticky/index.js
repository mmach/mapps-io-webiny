import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { NavItem, NavMenu } from "@mui-treasury/components/menu/navigation";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";
import Image from "material-ui-image";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { mappsPlugins } from "../../..";
import { FadeIn } from "../../../Components";

function ButtonNested(props) {
    const Link = React.useMemo(() => mappsPlugins.byName("mapps-item-basic-link").comopnent);

    
    const [open, setOpen] = React.useState(false);
    const item = props.data;
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    if (Array.isArray(item.children)) {
        return (
            <React.Fragment key={item.id}>
                <Button
                    style={{
                        padding: "0px"
                    }}
                    size="small"
                    ref={anchorRef}
                    aria-controls={open ? item.id : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <NavItem
                        style={{
                            textDecoration: "none",
                            fontSize: "14px",
                            letterSpacing: ".07143rem",
                            padding: "3px 20px"
                        }}
                        key={item.id}
                    >
                        {item.title}
                    </NavItem>
                </Button>

                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    style={{ zIndex: "1000" }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id={item.id}
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {item.children.map((chitem, chindex) => {
                                            return (
                                                <MenuItem
                                                    onClick={handleClose}
                                                    key={chitem.id + chindex}
                                                    style={{
                                                        padding: "0px"
                                                    }}
                                                >
                                                    {" "}
                                                    <NavItem
                                                        to={
                                                            chitem.url || chitem.path || chitem.href
                                                        }
                                                        as={Link}
                                                        style={{
                                                            textDecoration: "none",
                                                            fontSize: "12px",
                                                            letterSpacing: ".07143rem",
                                                            textTransform: "uppercase"
                                                        }}
                                                    >
                                                        {" "}
                                                        {chitem.title}
                                                    </NavItem>
                                                </MenuItem>
                                            );
                                        })}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>
        );
    }

    return (
        <Button
            style={{
                padding: "3px 15px",
                marginRight: "10px"
            }}
        >
            <NavItem
                style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    letterSpacing: ".07143rem",
                    textTransform: "uppercase",
                    padding: "0px"
                }}
                key={item.id}
                to={item.url || item.path || item.href}
                as={Link}
            >
                {item.title}
            </NavItem>
        </Button>
    );
}

const MainMenuStickySmallRender = props => {
    const Link = React.useMemo(() => mappsPlugins.byName("mapps-item-basic-link").component);
    const topMenuItems = React.useMemo(() => mappsPlugins.byType("mapps-layout-menu-icons"));
    const Logo = React.useMemo(() => mappsPlugins.byName("mapps-layout-logo-main-desktop").component);

    if (!props.data) {
        return null;
    }
    return (
        <React.Fragment>
            <CssBaseline />

            <Grid
                style={{
                    position: "sticky",
                    top: "0px",
                    zIndex: 1000,
                    borderBottom: "1px solid #999",
                    height: "85px",
                    alignContent: "flex-end"
                }}
                container
            >
                <Grid item xs="1" style={{display:'flex',alignItems:'center'}}>
                    <Link to={"/"}>
                       <Logo/>
                    </Link>
                </Grid>

                <Grid
                    item
                    xs="11"
                    style={{
                        display: "flex",
                        flexFlow: "row-reverse",
                        flexDirection: "column"
                    }}
                    container
                >
                    <Grid
                        container
                        item
                        xs="12"
                        style={{
                            display: "flex",
                            flexFlow: "row-reverse",
                            color: "white",
                            paddingRight: "10px",
                            paddingTop: "2px",
                            marginRight: "3px"
                        }}
                    >
                        {topMenuItems
                            .sort((a, b) => (a.order > b.order ? 1 : -1))
                            .map((i, key) => {
                                const Component = i.component;
                                return <Component variant="icon1" key={key}></Component>;
                            })}
                    </Grid>
                    <Grid item xs="12" style={{ justifyContent: "flex-end", marginRight: "10px" }}>
                        <NavMenu
                            useStyles={usePlainNavigationMenuStyles}
                            style={{ justifyContent: "flex-end" }}
                        >
                            {props.data.items.map(i => {
                                return (
                                    <FadeIn key={i.id}>
                                        <ButtonNested data={i}></ButtonNested>
                                    </FadeIn>
                                );
                            })}
                            {props.data.items.length == 0 && (
                                <Button>
                                    <NavItem
                                        style={{
                                            textDecoration: "none",
                                            fontSize: "14px",
                                            letterSpacing: ".07143rem",
                                            textTransform: "uppercase"
                                        }}
                                    ></NavItem>
                                </Button>
                            )}
                        </NavMenu>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        config: state.ConfigReducer
    };
};

const mapDispatchToProps = () => {
    return;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenuStickySmallRender));
