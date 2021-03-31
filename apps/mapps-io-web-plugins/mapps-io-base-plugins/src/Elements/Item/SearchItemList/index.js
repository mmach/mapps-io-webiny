/*
    ./client/components/App.js
*/

import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { mappsPlugins } from "../../../index.js";
import FITLER_SEARCH_ACTIONS from "../SearchItemFilterPanel/actions.js";
import "./style.scss";

function SearchItemList(props) {
  const [items, setItems] = React.useState([]);
  const elementRender = React.useMemo(() =>
    mappsPlugins.byType("mapps-item-search-container-results-list-element")
  );
  const paginationRender = React.useMemo(
    () => mappsPlugins.byName(props.mappsSettings.mappsNamePaginationPlugin)
  );
  React.useEffect(() => {
    setItems([...props.itemSearchReducer.items]);
  }, [props.itemSearchReducer.items]);

  return (
    <Grid className="list_results" item container style={{ width: "100%", height: "100%" }}>
      {paginationRender && paginationRender.render()}
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {elementRender[0] && elementRender[0].render({ item })}
          </React.Fragment>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    loader: state.LoaderReducer,
    itemSearchReducer: state.SearchItemResultsViewReducer,
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchItemList));
