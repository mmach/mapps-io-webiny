/*
    ./client/components/App.js
*/

import { Grid, IconButton } from "@material-ui/core";
//import ITEM_SEARCH_ACTIONS from "../ItemSearch/actions.js";
import MapIcon from "@material-ui/icons/Map";
import React from "react";
import { connect } from "react-redux";
import FITLER_SEARCH_ACTIONS from "../SearchItemFilterPanel/actions";
//import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions.js";
import "./style.scss";

//impo

function MapSearchButton(props) {
  //this.ref = null;
  //this.state = {};
  const [isActive, setActive] = React.useState(false);
  React.useEffect(() => {
    if (isActive == true && props.filterSearchReducer.search.distance=='all') {
      const obj = { version: props.filterSearchReducer.search.version  };
      obj.grouping = "1m";
      obj.page = 0;
      obj.size = 600;
      obj.distance = "3km";
      obj.view = props.mappsKey;
      props.setSearchParams({ ...obj, version: obj.version + 1 });
    }
  }, [isActive]);
  React.useEffect(() => {

    if (props.filterSearchReducer.search.view == props.mappsKey) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [props.filterSearchReducer.search.view]);

  function onMapView() {
    setActive(true);
  }
  return (
    <Grid item>
      <IconButton onClick={onMapView}>
        <MapIcon color={isActive ? "primary" : "default"} />
      </IconButton>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    lang: state.LanguageReducer,
    filterSearchReducer: state.FilterSearchReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MapSearchButton));
