import { Grid, IconButton,Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";

export default function Variant1(MenuQuery, props, clickImageHandler, MenuComponent) {
    return <Grid item>
  
      <MenuQuery
        slug={props.mappsSettings.menuSlug}
        component={menuProps => (
          <>
            <Grid container style={{ padding: "5px" }}>
              <Grid>
                <IconButton onClick={clickImageHandler}>
                  <Avatar
                    alt={props.auth.user.name}
                    src={window.env.BLOB_URL +
                      "/blob/" +
                      (props.auth.user.blob_profile &&
                        props.auth.user.blob_profile.blob_min_id)} />
                </IconButton>
              </Grid>
              <Grid style={{ alignSelf: "center", paddingLeft: "5px" }}>
                <Typography comopnent={"h1"} variant={"subtitle1"}>{props.auth.user.name.toUpperCase()}</Typography>
              </Grid>
            </Grid>
            <MenuComponent menuSlug={props.mappsSettings.menuSlug} {...menuProps}></MenuComponent>
          </>
        )} />
    </Grid>;
  }
  