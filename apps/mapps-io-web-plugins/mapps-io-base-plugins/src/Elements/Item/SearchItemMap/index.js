/*
    ./client/components/App.js
*/

import { Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import RoomIcon from "@material-ui/icons/Room";
import { CommandList, QueryList } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { BaseService } from "../../../App/index.js";
import { mappsPlugins } from "../../../index.js";
import FITLER_SEARCH_ACTIONS from "../SearchItemFilterPanel/actions.js";
import MAP_SEARCH_ACTIONS from "./actions.js";

function SearchItemMap(props) {
  const [positionOn, setPositionOnState] = React.useState(false);
  const mapContainerView = React.useMemo(() =>
    mappsPlugins.byName("mapps-item-search-container-view-map-container")
  );
  function setPositionOn() {
    setPositionOnState(!positionOn);
  }

  function setPositionClick(event) {
    if (positionOn == false) {
      return;
    }
    setPositionOnState(false);

    const obj = { version: props.filterSearchReducer.search.version };

    obj.lat = event[0];
    obj.lon = event[1];
    props.setSearchParams({ ...obj, version: obj.version + 1 });
  }
  return (
    <Grid item container style={{ width: "100%", height: "100%" }}>
      {mapContainerView.render({
        setPositionButton: positionOn,
        setPositionClick: setPositionClick,
        mappsSettings: props.mappsSettings
      })}
      {props.mappsSettings.useSetPositionBtn && (
        <Fab
          color={positionOn == true ? "primary" : "default"}
          onClick={setPositionOn}
          aria-label="add"
          style={{
            position: "absolute",
            zIndex: 500,
            right:  props.mappsSettings.setPositionBtn && props.mappsSettings.setPositionBtn.right,
            top: props.mappsSettings.setPositionBtn && props.mappsSettings.setPositionBtn.top,
            bottom: props.mappsSettings.setPositionBtn  && props.mappsSettings.setPositionBtn.bottom,
            left: props.mappsSettings.setPositionBtn  && props.mappsSettings.setPositionBtn.left
          }}
        >
          <RoomIcon />
        </Fab>
      )}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    loader: state.LoaderReducer,
    itemSearchReducer: state.ItemSearchReducer,
    filterSearchReducer: state.FilterSearchReducer,
    mapSearchReducer: state.SearchMapReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentElement: (currentElement) => {
      return dispatch({
        type: MAP_SEARCH_ACTIONS.SET_CURRENT_ELEMENT,
        dto: {
          currentElement: currentElement
        }
      });
    },
    setSearchParams: (search) => {
      return dispatch({
        type: FITLER_SEARCH_ACTIONS.SET_SEARCH_PARAMS,
        dto: {
          search: search
        }
      });
    },
   
    onMapInit: (dto) => {
      return dispatch({
        type: MAP_SEARCH_ACTIONS.ON_MAP_INIT,
        currentPosition: dto.currentPosition
      });
    },

    createNewItem: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Item.NEW_ITEM, dto));
    },
    getUserImages: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchItemMap));
