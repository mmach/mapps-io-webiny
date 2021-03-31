import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import { FadeIn } from "mapps-io-base-plugins/src/Components/index.js";
import DictionaryEdit from "./Scenes/Edit/index.js";
import DictionaryList from "./Scenes/List/index.js";

export default function Dictionary() {
  const Route = React.useMemo(()=>mappsPlugins.byName('mapps-item-basic-route').component);

  return (
      <FadeIn>
        <Grid container>
          <Grid xs="3">
            <Paper style={{ padding: "20px" }}>
              <DictionaryList />
            </Paper>
          </Grid>
          <Grid xs="9">
            <Paper style={{ padding: "10px" }}>
              <Route
                path="/mapps/languages/dictionaries/edit"
                render={() => <DictionaryEdit></DictionaryEdit>}
              />
            </Paper>
          </Grid>
        </Grid>
      </FadeIn>
  );
}
