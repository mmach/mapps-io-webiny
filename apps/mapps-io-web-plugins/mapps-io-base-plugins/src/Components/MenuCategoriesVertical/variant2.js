import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { NavItem, NavMenu } from "@mui-treasury/components/menu/navigation";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";
import { Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { mappsPlugins } from "../..";

const MenuVariant2 = React.memo(function MagCategoryMenu(props) {
    const LinkPlugin = React.useMemo(() => mappsPlugins.byName("mapps-item-basic-link").component);
    const [opened, setOpened] = React.useState(props.opened && false);

    const tran = Translator(props.codeDict.data.LABEL, props.lang);
    function handleClose(event) {
        props.handleClose && props.handleClose(event);
        setOpened(!opened);
    }
    function onClose(event) {
        props.onClose && props.onClose(event);
        setOpened(!opened);
    }
    return (
        <NavMenu useStyles={usePlainNavigationMenuStyles}>
            <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={opened} id={props.menuSlug} onKeyDown={onClose} style={{width:'100%'}}>
                    {props.data &&
                        props.data.items &&
                        props.data.items.map((i, index) => {
                            if (Array.isArray(i.children)) {
                                return (
                                    <>
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
                                                    fontSize: "13px",
                                                    letterSpacing: ".07143rem",
                                                    textTransform: "uppercase",
                                                    width: "100%",
                                                    cursor: "default",
                                                    color: "#333"
                                                }}
                                            >
                                                {tran.translate(i.title)}
                                            </NavItem>
                                        </MenuItem>
                                        {i.children.map((chitem, itemIndex) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    onClick={onClose}
                                                    style={{ padding: "0px" }}
                                                >
                                                    <NavItem
                                                        key={itemIndex}
                                                        to={chitem.path}
                                                        as={LinkPlugin}
                                                        style={{
                                                            textDecoration: "none",
                                                            fontSize: "12px",
                                                            letterSpacing: ".07143rem",
                                                            textTransform: "uppercase",
                                                            width: "100%",
                                                            paddingLeft: "30px"
                                                        }}
                                                    >
                                                        {tran.translate(chitem.title)}
                                                    </NavItem>
                                                </MenuItem>
                                            );
                                        })}
                                    </>
                                );
                            } else {
                                return (
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
                                );
                            }
                        })}
                </MenuList>
            </ClickAwayListener>
        </NavMenu>
    );
});

const mapStateToProps = state => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuVariant2);
