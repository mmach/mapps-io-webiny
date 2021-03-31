import { Grid, IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { mappsPlugins } from "../../../../..";
import MenuIcon from "@material-ui/icons/Menu";
import VariantOne from './variantOne.js'
export default function Variant2(MenuQuery, props, clickImageHandler, MenuComponent) {
    function openDrawe() {
        props.openDrawer(true, VariantOne(MenuQuery, props, clickImageHandler, MenuComponent), "left");
    }
    return (
        <Grid item>
            <Grid container style={{ padding: "0px" }}>
                <IconButton onClick={openDrawe}>
                    <MenuIcon />
                </IconButton>
                <IconButton onClick={clickImageHandler}>
                    <Avatar
                        alt={props.auth.user.name}
                        src={
                            window.env.BLOB_URL +
                            "/blob/" +
                            (props.auth.user.blob_profile &&
                                props.auth.user.blob_profile.blob_min_id)
                        }
                    />
                </IconButton>
            </Grid>
        </Grid>
    );
}
