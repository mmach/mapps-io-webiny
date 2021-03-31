import {
  FormControl,
  FormControlLabel, FormLabel, Grid,

  IconButton
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Translator } from "justshare-shared";
import debounce from "lodash/debounce";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import DayPickerInputComponent from "../../../../../Components/FormComponent/Components/DayPickerInputComponent/index.js";
import FITLER_SEARCH_ACTIONS from "../../../SearchItemFilterPanel/actions.js";

function CategoryOptionSearchNotBetween(props) {
  const [optionFilter, setFilter] = React.useState(onFilterInit());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const [min, setMinValue] = React.useState("");
  const [max, setMaxValue] = React.useState("");
  const [reset, setReset] = React.useState(false);
  //this.state.min = this.state.optionFilter.filter((item) => {
  //  return item["min"];
  //})[0]
  //  ? new Date(
  //      this.props.optionFilter.filter((item) => {
  //        return item["min"];
  //       })[0]["min"]
  //    )
  //  : "";

  //this.state.max = this.state.optionFilter.filter((item) => {
  //  return item["max"];
  //})[0]
  //  ? new Date(
  //      this.state.optionFilter.filter((item) => {
  //        return item["max"];
  //      })[0]["max"]
  //    )
  //  : "";

  React.useEffect(() => {
    const val = onFilterInit();
    if (optionFilter != val) {
      setFilter(val);
      if (val.length > 0) {
        // const minValue = val[0]["min"];
        // const maxValue = val[0]["max"];
        //  setMinValue(minValue);
        //  setMaxValue(maxValue);
      }
    }
  }, [props.filterSearchReducer.search.catOptions]);

  React.useEffect(() => {
    setLoading(props.filterSearchReducer.loading);
  }, [props.filterSearchReducer.loading]);

  const debounceFilter = debounce((minVal, maxVal) => {
    const datesFilter = {};
    datesFilter["min"] = moment(minVal).format("yyyy-MM-DD");
    datesFilter["max"] = moment(maxVal).format("yyyy-MM-DD");
    datesFilter[
      props.catOption.cat_opt_temp.filter((item) => {
        return item.order == 1;
      })[0].id
    ] = moment(minVal).format("yyyy-MM-DD");
    datesFilter[
      props.catOption.cat_opt_temp.filter((item) => {
        return item.order == 2;
      })[0].id
    ] = moment(maxVal).format("yyyy-MM-DD");

    const obj = {
      catOptions: {
        ...props.filterSearchReducer.search.catOptions
      }
    };
    obj.catOptions[props.catOptionId + "_NOT_BETWEEN"] = [datesFilter];
    props.setSearchParams({ ...obj, version: obj.version + 1 });

    // this.props.onChange(this.props.catOption.id + "_NOT_BETWEEN", [datesFilter]);
  }, 200);

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

  function resetSingle() {
    const obj = {
      catOptions: {
        ...props.filterSearchReducer.search.catOptions,
        [props.catOptionId + "_NOT_BETWEEN"]: undefined
      }
    };
    setMinValue("");
    setMaxValue("");
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1);
    props.setSearchParams({ ...obj, version: obj.version + 1 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function toDateString(date) {
    return (
      date &&
      date.getFullYear().toString() +
        "-" +
        ((date.getMonth() + 1).toString().length == 1
          ? "0" + (date.getMonth() + 1).toString()
          : (date.getMonth() + 1).toString()) +
        "-" +
        (date.getDate().toString().length == 1
          ? "0" + date.getDate().toString()
          : date.getDate().toString())
    );
  }
  function startHandler(event) {
    let date = undefined;

    date = event;
    setMinValue(date);

    if (max) {
      debounceFilter(date, max);
    }
  }
  function finishHandler(event) {
    //    console.log('co sie kurwa tu dzieje')
    let date = undefined;

    date = event;

    setMaxValue(date);
    if (min) {
      debounceFilter(min, date);
    }
  }
  const tran = Translator(props.codeDict.data.LABEL, props.lang);
  return (
    <FormControl component="fieldset" style={{ width: "100%", paddingBottom: 10 }}>
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
              <IconButton>
                <VisibilityIcon style={{ fontSize: 20 }} />
              </IconButton>
            )}
        </Grid>
      </Grid>
      <Grid container item style={{ paddingTop: 10 }}>
        <Grid item xs="12" lg="6">
          {reset == false && (
            <FormControlLabel
              style={{ marginLeft: 2, marginRight: 2 }}
              control={
                <DayPickerInputComponent
                  dateFormat="dd-MM-yyyy"
                  showTimeSelect={false}
                  minDate={new Date()}
                  noLabel
                  label={tran.translate("NOT_BETWEEN_START_DATE_LABEL")}
                  fixedHeight
                  selectsStart
                  startDate={min ? min : new Date()}
                  endDate={max}
                  monthsShown={1}
                  value={min}
                  onChange={startHandler}
                  field="birthDate"
                  validation={[]}
                />
              }
            />
          )}
        </Grid>
        <Grid item xs="12" lg="6">
          {reset == false && (
            <FormControlLabel
              style={{ marginLeft: 2, marginRight: 2 }}
              control={
                <DayPickerInputComponent
                  dateFormat="dd-MM-yyyy"
                  showTimeSelect={false}
                  minDate={min ? min : new Date()}
                  noLabel
                  label={tran.translate("NOT_BETWEEN_END_DATE_LABEL")}
                  fixedHeight
                  selectsEnd
                  startDate={min ? min : new Date()}
                  endDate={max}
                  monthsShown={1}
                  value={max}
                  onChange={finishHandler}
                  field="birthDate"
                  validation={[]}
                />
              }
            />
          )}
        </Grid>
      </Grid>
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(CategoryOptionSearchNotBetween));
