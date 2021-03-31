/*
    ./client/components/App.js
*/

import { Badge, FormControl, FormLabel, Grid, IconButton } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import GroupWorkOutlinedIcon from "@material-ui/icons/GroupWorkOutlined";
import RemoveIcon from "@material-ui/icons/Remove";
import { Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import FITLER_SEARCH_ACTIONS from "../SearchItemFilterPanel/actions.js";
import useGeolocation from "react-hook-geolocation";

function MapSearchFilter(props) {
  //this.ref = null;
  //this.state = {};
  const [isActive, setActive] = React.useState(false);
  const [geo, setGeo] = React.useState({});
  useGeolocation({}, (value) => {
    if (
      geo.latitude != value.latitude ||
      (geo.longitude != value.longitude && props.filterSearchReducer.search.autoGeoSet != true)
    ) {
      setGeo(value);
    }
  });

  React.useEffect(() => {
    if (
      geo.latitude &&
      geo.longitude &&
      (geo.latitude != props.filterSearchReducer.search.lat ||
        geo.longitude != props.filterSearchReducer.search.lon) &&
      props.filterSearchReducer.search.autoGeoSet != true
    ) {

      const obj =   { version: props.filterSearchReducer.search.version };
      obj.lat = geo.latitude;
      obj.lon = geo.longitude;
      obj.autoGeoSet = true;
      props.setSearchParams({ ...obj, version: obj.version + 1 });
    }
  }, [geo]);

  React.useEffect(() => {
    if (props.filterSearchReducer.search.view == props.mappsKey) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [props.filterSearchReducer.search.view]);

  function zoomIn() {
    const distance = props.filterSearchReducer.search.distance;
    let rad = "";
    //console.log(props.filterSearchReducer.)
    if (distance.indexOf("m") > 0 && distance.indexOf("km") < 1) {
      rad = Number(distance.split("m")[0]) + 100;
      rad = rad + "m";
    }
    if (distance.indexOf("km") > 0) {
      rad = Number(distance.split("km")[0]) + 1;

      rad = rad + "km";
    }
    const obj =   { version: props.filterSearchReducer.search.version };
    obj.distance = rad;
    //  setSearchState({ ...obj });
    props.setSearchParams({ ...obj, version: obj.version + 1 });
  }
  function zoomOut() {
    const distance = props.filterSearchReducer.search.distance;
    let rad = "";
    if (distance.indexOf("m") > 0 && distance.indexOf("km") < 1) {
      rad = Number(distance.split("m")[0]) - 100;
      if (rad == 0) {
        rad = 100;
      }
      rad = rad + "m";
    }
    if (distance.indexOf("km") > 0) {
      rad = Number(distance.split("km")[0]) - 1;
      if (rad == 0) {
        rad = "900m";
      } else {
        rad = rad + "km";
      }
    }
    const obj =  { version: props.filterSearchReducer.search.version };
    obj.distance = rad;
    // setSearchState({ ...obj });
    props.setSearchParams({ ...obj, version: undefined });
  }

  function groupingOut() {
    const distance = props.filterSearchReducer.search.grouping;
    let rad = "";
    //console.log(props.filterSearchReducer.)
    if (distance.indexOf("m") > 0 && distance.indexOf("km") < 1) {
      rad = Number(distance.split("m")[0]) + 5;
      rad = rad + "m";
    }
    if (distance.indexOf("km") > 0) {
      rad = Number(distance.split("km")[0]) + 1;

      rad = rad + "km";
    }
    const obj =   { version: props.filterSearchReducer.search.version };
    obj.grouping = rad;
    //setSearchState({ ...obj });
    props.setSearchParams({ ...obj, version: undefined });
  }
  function groupingIn() {
    const distance = props.filterSearchReducer.search.grouping;
    let rad = "";
    if (distance.indexOf("m") > 0 && distance.indexOf("km") < 1) {
      rad = Number(distance.split("m")[0]) - 5;
      if (rad == 0) {
        rad = 100;
      }
      rad = rad + "m";
    }
    if (distance.indexOf("km") > 0) {
      rad = Number(distance.split("km")[0]) - 1;
      if (rad == 0) {
        rad = "900m";
      } else {
        rad = rad + "km";
      }
    }
    const obj = { version: props.filterSearchReducer.search.version };
    obj.grouping = rad;

    props.setSearchParams({ ...obj, version: obj.version });
  }

  const tran = Translator(props.codeDict.data.LABEL, props.lang);

  return (
    <Collapse in={isActive}>
      <FormControl component="fieldset" style={{ width: "100%", paddingBottom: 10 }}>
        <FormLabel component="legend"> {tran.translate("SEARCH_GROUPING")}</FormLabel>

        <Grid container style={{ alignItems: "center" }}>
          <Grid item xs="2" style={{ textAlign: "center" }}>
            <IconButton onClick={groupingIn}>
              <RemoveIcon />
            </IconButton>
          </Grid>

          <Grid item xs="8" container style={{ justifyContent: "center", flexDirection: "column" }}>
            <Grid item style={{ textAlign: "center" }}>
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                badgeContent={props.filterSearchReducer.search.grouping}
                color="primary"
              >
                <GroupWorkOutlinedIcon style={{ fontSize: "1.8em" }} />
              </Badge>
            </Grid>
          </Grid>
          <Grid item xs="2" style={{ textAlign: "center" }}>
            <IconButton onClick={groupingOut}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </FormControl>
      <FormControl component="fieldset" style={{ width: "100%", paddingBottom: 10 }}>
        <FormLabel component="legend"> {tran.translate("SEARCH_EXPLORE_RADIUS")}</FormLabel>

        <Grid container style={{ alignItems: "center" }}>
          <Grid item xs="2" style={{ textAlign: "center" }}>
            <IconButton onClick={zoomOut}>
              <RemoveIcon />
            </IconButton>
          </Grid>

          <Grid item xs="8" container style={{ justifyContent: "center", flexDirection: "column" }}>
            <Grid item style={{ textAlign: "center" }}>
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                badgeContent={props.filterSearchReducer.search.distance}
                color="primary"
              >
                <ExploreOutlinedIcon style={{ fontSize: "1.8em" }} />
              </Badge>
            </Grid>
          </Grid>
          <Grid item xs="2" style={{ textAlign: "center" }}>
            <IconButton onClick={zoomIn}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </FormControl>
    </Collapse>
  );
}

const mapStateToProps = (state) => {
  return {
    lang: state.LanguageReducer,
    filterSearchReducer: state.FilterSearchReducer,
    codeDict: state.DictionaryReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchParams: (search) => {
      return dispatch({
        type: FITLER_SEARCH_ACTIONS.SET_SEARCH_PARAMS,
        dto: {
          search: search
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MapSearchFilter));
