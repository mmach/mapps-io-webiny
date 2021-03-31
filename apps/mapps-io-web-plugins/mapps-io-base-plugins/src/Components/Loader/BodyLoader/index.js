import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";

export default function BodyLoader(props) {
    return (
        <Grid direction="column" justify="center" alignItems="center" spacing={10}>
            <Grid
                item
                spacing={10}
                style={{ margin: "15px", display: "flex", justifyContent: "center" }}
            >
                <CircularProgress
                    color={props.color ? props.color : "primary"}
                    thickness={props.thickness ? props.thickness : 2}
                    size={props.size ? props.size : "40px"}
                />
            </Grid>
            <Grid item style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
                <span style={{ letterSpacing: 2, fontSize: 12 }}>
                    {" "}
                    {props.text ? props.text : "LOADING..."}
                </span>
            </Grid>
        </Grid>
    );
}
