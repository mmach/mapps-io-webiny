/*
    ./client/components/App.jsx
*/

import React from "react";
import CategoryOptionTempMapper from "./Components/CategoryOptionTempMapper/CategoryOptionTempMapper.js";
import CategoryOptionsListByType from "./Scenes/CategoryOptionsListByType/index.js";
import { FadeIn } from "mapps-io-base-plugins/src/Components/index.js";
import { Grid, Paper } from "@material-ui/core";

export default class CategoryOptions extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
        <FadeIn>
          <Grid container>
            <Grid xs="3">
              <Paper style={{ padding: "20px" }}>
                <CategoryOptionsListByType />
              </Paper>
            </Grid>
            <Grid xs="9">
              <Paper style={{ padding: "10px" }}>
                <CategoryOptionTempMapper />
              </Paper>
            </Grid>
          </Grid>
        </FadeIn>
    );
  }
}
