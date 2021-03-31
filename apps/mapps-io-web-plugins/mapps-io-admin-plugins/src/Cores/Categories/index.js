import { Card, Grid } from "@material-ui/core";
import React from "react";
/*
    ./client/components/App.jsx
*/
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import AddCategory from "./Scenes/AddCategory/index.js";
//import DictionaryEdit from './Scenes/Edit/index.jsx';
import CategoryTree from "./Scenes/CategoryTree/index.js";
import EditCategory from "./Scenes/EditCategory/index.js";


function Categories() {
  const Route = React.useMemo(()=>mappsPlugins.byName('mapps-item-basic-route').component);

  return (
      <Grid container style={{ padding: "10px" }}>
        <Grid item xs="4">
          <CategoryTree />
        </Grid>
        <Grid item xs="8">
          <Route
            exact={true}
            path={"/mapps/categories/categories/add/:status/:parentId"}
            render={(props) => {
              return (
                <Card style={{ padding: "10px" }}>
                  <AddCategory {...props}></AddCategory>
                </Card>
              );
            }}
          />
          <Route
            exact={true}
            path={"/mapps/categories/categories/edit/:id"}
            render={(props) => {
              return <EditCategory {...props}></EditCategory>;
            }}
          />
        </Grid>
      </Grid>
  );
}
export default React.memo(Categories);
