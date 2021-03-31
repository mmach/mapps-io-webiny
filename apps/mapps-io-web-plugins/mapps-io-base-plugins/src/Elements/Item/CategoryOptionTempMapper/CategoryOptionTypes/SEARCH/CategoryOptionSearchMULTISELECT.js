import { FormControl, FormLabel, Grid, IconButton, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import ClearIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import debounce from "lodash/debounce";
import React from "react";
import { connect } from "react-redux";
import { isUuid } from "uuidv4";
import FITLER_SEARCH_ACTIONS from "../../../SearchItemFilterPanel/actions";

function CategoryOptionSearchSELECT(props) {
  const [optionFilter, setFilter] = React.useState(onFilterInit());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = React.useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(optionFilter && optionFilter);
  const [aggs, setAggs] = React.useState([]);
  const [isAbove, setIsAbove] = React.useState(false);
  const debounceFunc = React.useMemo(
    () =>
      debounce((cr, callback) => {
        callback(cr);
      }, 1000),

    [props.onChange]
  );

  React.useEffect(() => {
    if (currentValue[0] && isUuid(currentValue[0].id)) {
      debounceFunc(currentValue, (cr) => {
        const obj = {
          catOptions: {
            ...props.filterSearchReducer.search.catOptions
          }
        };

        obj.catOptions[props.catOptionId + "_MULTI_SELECT"] = cr;
        props.setSearchParams({ ...obj, version: obj.version + 1 });
      });
    } else if(props.filterSearchReducer.search.catOptions && props.filterSearchReducer.search.catOptions[props.catOptionId + "_MULTI_SELECT"]!=undefined) {
      debounceFunc(currentValue, () => {
        const obj = {
          catOptions: {
            ...props.filterSearchReducer.search.catOptions
          }
        };

        obj.catOptions[props.catOptionId + "_MULTI_SELECT"] = undefined;
        props.setSearchParams({ ...obj, version: obj.version + 1 });
      });
    }
  }, [currentValue]);

  React.useEffect(() => {
    const val = onFilterInit();
    if (optionFilter != val) {
      setFilter(val);
    }
  }, [props.filterSearchReducer.search.catOptions]);

  React.useEffect(() => {
    setLoading(props.filterSearchReducer.loading);
  }, [props.filterSearchReducer.loading]);

  React.useEffect(() => {
    if (props.filterSearchReducer.aggs && props.filterSearchReducer.aggs.select) {
      const aggsVal = props.catOption.cat_opt_temp.map((i) => {
        const aggsBuck = props.filterSearchReducer.aggs.select.buckets.filter(
          (buck) => buck.key == i.id
        )[0];
        return { id: i.id, agg: aggsBuck ? aggsBuck.doc_count : 0 };
      });

      setAggs(aggsVal);
    }
  }, [props.filterSearchReducer.aggs]);

  React.useEffect(() => {
    const above = props.filterSearchReducer.catAbovePin;
    if (above.filter((i) => i == props.catOptionId).length > 0) {
      setIsAbove(true);
    } else {
      setIsAbove(false);
    }
  }, [props.filterSearchReducer.catAbovePin]);
  function setAbovePin() {
    const above = props.filterSearchReducer.catAbovePin;
    if (above.filter((i) => i == props.catOptionId).length == 0) {
      props.setAbovePin([...above, props.catOptionId]);
    } else {
      props.setAbovePin([...above.filter((i) => i != props.catOptionId)]);
    }
  }

  function onFilterInit() {
    let name = "";

    const catOptionsFilter = props.filterSearchReducer.search.catOptions || {};
    name = Object.keys(catOptionsFilter).filter((i) => {
      return i.startsWith(props.catOptionId);
    });
    name = name || "";
    let filter = [];

    if (catOptionsFilter[name] != undefined && catOptionsFilter[name] != "") {
      filter = catOptionsFilter[name];
    } else {
      return [];
    }
    return filter;
  }

  function onClick(event) {
    const optionId = event.target.value;
    if (currentValue.filter((i) => i.id == optionId).length > 0) {
      setCurrentValue(currentValue.filter((i) => i.id != optionId));
    } else {
      setCurrentValue([...currentValue, { id: optionId }]);
    }
    setAggs([]);
  }
  function resetSingle() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const obj = {
      catOptions: {
        ...props.filterSearchReducer.search.catOptions,
        [props.catOptionId + "_MULTI_SELECT"]: undefined
      }
    };
    setCurrentValue([]);
    setId(undefined);
    // props.setSearchParams({ ...obj, version: obj.version + 1 });
  }
  return (
    <FormControl component="fieldset" style={{ width: "100%" }}>
      <Grid container style={{ alignItems: "center" }}>
        <Grid item xs="9" style={{ paddingTop: 12, paddingBottom: 12 }}>
          <FormLabel component="legend">{props.catOption["name_" + props.lang]}</FormLabel>
        </Grid>
        <Grid item xs="3" style={{ textAlign: "right" }}>
          {optionFilter.length > 0 && (
            <IconButton onClick={resetSingle}>
              <ClearIcon style={{ fontSize: 20 }} />
            </IconButton>
          )}
          {props.catOption.category_link[0].can_above_pin != undefined &&
            (props.catOption.category_link[0].can_above_pin || props.catOption.can_above_pin) ==
              true && (
              <IconButton onClick={setAbovePin}>
                <VisibilityIcon color={isAbove ? "primary" : "default"} style={{ fontSize: 20 }} />
              </IconButton>
            )}
        </Grid>
      </Grid>

      <RadioGroup>
        {props.catOption.cat_opt_temp.map((item) => {
          const agg = aggs.filter((i) => i.id == item.id)[0];
          const bucket = agg ? agg.agg : 0;
          const isActive =
            currentValue.filter((filt) => {
              return filt.id == item.id;
            }).length > 0;
          return (
            <Grid
              key={item.id}
              container
              style={{ alignItems: "center", paddingLeft: 2, paddingRight: 2 }}
            >
              <Grid item xs="10">
                <FormControlLabel
                  value={item.id}
                  control={<Checkbox checked={isActive} onChange={onClick} />}
                  label={item["value_" + props.lang]}
                />
              </Grid>
              {bucket > 0 && (
                <Grid xs="2" item style={{ textAlign: "right" }}>
                  <Typography variant={"subtitle2"}>{bucket}</Typography>
                </Grid>
              )}
            </Grid>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    filterSearchReducer: state.FilterSearchReducer

    //  catOptions: state.EditCategoryReducer
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
    },
    setAbovePin: (cats) => {
      return dispatch({
        type: FITLER_SEARCH_ACTIONS.SET_CAT_ABOVE_PIN,
        dto: cats
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CategoryOptionSearchSELECT));
