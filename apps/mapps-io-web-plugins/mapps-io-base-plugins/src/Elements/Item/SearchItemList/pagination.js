/*
    ./client/components/App.js
*/

import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { connect } from "react-redux";
import { DropDownList } from "../../../Components/index.js";
import FITLER_SEARCH_ACTIONS from "../SearchItemFilterPanel/actions.js";
import "./style.scss";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      selected: {
        backgroundColor: "transparent"
      }
    }
  })
);

function SearchItemPagination(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(props.filterSearchReducer.search.page + 1);
  const [size, setSize] = React.useState(props.filterSearchReducer.search.size);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    setTotal(props.itemSearchReducer.total);
  }, [props.itemSearchReducer.total]);

  const handleChange = (event, value) => {
    setPage(value);
    const obj =   { version: props.filterSearchReducer.search.version };
    obj.page = value - 1;
    props.setSearchParams({ ...obj, version: obj.version + 1 });
  };
  function onChange(event) {
    setSize(event.target.value);
    const obj =   { version: props.filterSearchReducer.search.version };

    obj.page = 0;
    obj.size = event.target.value;
    props.setSearchParams({ ...obj, version: obj.version + 1 });
  }
  function getDropDownValues() {
    return [20, 40, 60, 100].map((item) => {
      return {
        id: item,
        value: item
      };
    });
  }

  return (
    <Grid item container>
      <Grid item></Grid>
      <Grid item xs="11" style={{ alignSelf: "center" }}>
        <Pagination
          className={classes.root}
          count={Math.ceil(total / size)}
          page={page}
          onChange={handleChange}
          style={{ display: "flex", justifyContent: "flex-end" }}
        />
      </Grid>
      <Grid item style={{flex:'auto'}}>
        <DropDownList
          label={""}
          valueOptions={getDropDownValues()}
          value={size}
          onChange={onChange} //this.typeHandler.bind(this)}
          validation={[]}
          variant={"standard"}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    loader: state.LoaderReducer,
    filterSearchReducer: state.FilterSearchReducer,
    itemSearchReducer: state.SearchItemResultsViewReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchItemPagination));
