import { FormControl, FormLabel, Grid, IconButton } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import BarChartIcon from "@material-ui/icons/BarChart";
import ClearIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
//import { debounce } from "@material-ui/core";
import debounce from "lodash/debounce";
import React from "react";
import { connect } from "react-redux";
import HistogramSlider from "../../../../../Components/HistogramSlider/HistogramSlider.js";
import { TextBoxDebounce } from "../../../../../Components/index.js";
import FITLER_SEARCH_ACTIONS from "../../../SearchItemFilterPanel/actions.js";

function CategoryOptionSearchSingle(props) {
    const [optionFilter, setFilter] = React.useState(onFilterInit());

    const [min, setMinValue] = React.useState(undefined);
    const [max, setMaxValue] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const [showDiagram, setShowDiagram] = React.useState(false);
    const [date, setDate] = React.useState([]);
    const [value, setValue] = React.useState([0, 1]);
    const [isAbove, setIsAbove] = React.useState(false);

    const debounceFunc = React.useMemo(
        () =>
            debounce((cr, callback) => {
                callback(cr);
            }, 1000),

        [props.onChange]
    );

    React.useEffect(() => {
        if (max || min) {
            debounceFunc({ min: min, max: max }, (cr) => {
                const obj = {
                    catOptions: {
                        ...props.filterSearchReducer.search.catOptions
                    }
                };
                obj.catOptions[props.catOptionId + "_SINGLE"] = [cr];
                props.setSearchParams({ ...obj, version: obj.version + 1 });
            });
        }
    }, [min, max]);
    React.useEffect(() => {
        const val = onFilterInit();
        if (optionFilter != val) {
            setFilter(val);
        }
        setShowDiagram(false);
    }, [props.filterSearchReducer.search.catOptions]);

    React.useEffect(() => {
        setLoading(props.filterSearchReducer.loading);
    }, [props.filterSearchReducer.loading]);
    React.useEffect(() => {
        if (props.filterSearchReducer.aggs && props.filterSearchReducer.aggs[props.catOptionId]) {
            // const aggs = props.filterSearchReducer.aggs[props.catOptionId];
            // const result = Object.keys(aggs)
            //  .sort((a, b) => (aggs[a].doc_count > aggs[b].doc_count ? -1 : 1))
            //  .filter((i) => i != "doc_count");

            setShowDiagram(false);

            //const values = aggs[result[0]].hist_values;
            // if (values) {
            // const minValue = values.value[0][2];
            //   const maxValue = values.value[values.value.length - 1][3];
            //    setMaxValue(maxValue);
            //   setMinValue(minValue);
            // }
            try {
                const hist = getArrayHist();
                setDate(hist.date);
                setValue([0, hist.date.length - 1]);
            } catch (er) {
                // eslint-disable-next-line no-console
                console.log(er);
            }
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

    // resetSingle() {
    //   this.props.onReset(this.props.catOptionId + "_SINGLE_DEP");
    // }

    function getArrayHist() {
        const date =
            props.filterSearchReducer.aggs[props.catOptionId].catOption.hist_values.value.length > 0
                ? props.filterSearchReducer.aggs[props.catOptionId].catOption.hist_values.value.map(
                      (item) => {
                          return { id: item[0], value: item[2], counter: item[1] };
                      }
                  )
                : [{ id: -1, value: 0, counter: 0 }];

        return {
            date: date
        };
    }

    function setMin(event) {
        const val = event ? event : undefined;
        setMinValue(val);
        if (val || max) {
            //   debounceFunc(event, max);
        }
    }
    function resetSingle() {
        const obj = {
            catOptions: {
                ...props.filterSearchReducer.search.catOptions,
                [props.catOptionId + "_SINGLE"]: undefined
            }
        };
        setMinValue(undefined);
        setMaxValue(undefined);
        props.setSearchParams({ ...obj, version: obj.version + 1 });
    }
    function setMax(event) {
        const val = event ? event : undefined;

        setMaxValue(val);
        if (val || min) {
            //debounceFunc(min, event);
        }
    }

    function setFromHist(value) {
        setShowDiagram(false);

        setValue(value);

        setMinValue(date[value[0]].value);
        setMaxValue(date[value[1]].value);
        //debounceFunc(date[value[0]].value, date[value[1]].value);
    }
    //     const link = this.props.catOption.category_link[0];
    //  let catOption = this.props.catOptions.filter(item => { return item.id == this.props.catOptionId })[0];

    try {
        return (
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid item xs="9" style={{ paddingTop: 12, paddingBottom: 12 }}>
                        <FormLabel component="legend">
                            {props.catOption["name_" + props.lang]}
                        </FormLabel>
                    </Grid>
                    <Grid item xs="3" style={{ textAlign: "right" }}>
                        {optionFilter.length > 0 && (
                            <IconButton onClick={resetSingle}>
                                <ClearIcon style={{ fontSize: 20 }} />
                            </IconButton>
                        )}
                        {props.catOption.category_link[0].can_above_pin != undefined &&
                            (props.catOption.category_link[0].can_above_pin ||
                                props.catOption.can_above_pin) == true && (
                                <IconButton onClick={setAbovePin}>
                                    <VisibilityIcon
                                        color={isAbove ? "primary" : "default"}
                                        style={{ fontSize: 20 }}
                                    />
                                </IconButton>
                            )}
                    </Grid>
                </Grid>

                <Grid container item style={{ alignItems: "center" }}>
                    <Grid item xs="5" style={{ marginLeft: 2, marginRight: 2 }}>
                        <TextBoxDebounce
                            debounce={100}
                            label={"Min"}
                            value={min}
                            onChange={setMin}
                            validation={[]}
                        ></TextBoxDebounce>
                    </Grid>
                    <Grid item xs="5" style={{ marginLeft: 2, marginRight: 2 }}>
                        <TextBoxDebounce
                            debounce={100}
                            label={"Max"}
                            value={max}
                            onChange={setMax}
                            validation={[]}
                        ></TextBoxDebounce>
                    </Grid>

                    <Grid item xs="1" style={{ marginLeft: 2, marginRight: 2 }}>
                        {loading == false && (
                            <IconButton
                                onClick={() => {
                                    setShowDiagram(!showDiagram);
                                }}
                            >
                                <BarChartIcon color={showDiagram ? "primary" : "default"} />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
                <Collapse in={showDiagram}>
                    <Grid style={{ paddingTop: 10, paddingBottom: 10, height: "calc(5vh + 20px)" }}>
                        {showDiagram && (
                            <HistogramSlider
                                colors={{
                                    in: "#D7D8D8",
                                    out: "#EEEEEE"
                                }}
                                label={
                                    <Grid
                                        container
                                        style={{ justifyContent: "space-between", paddingTop: 10 }}
                                    >
                                        <Grid item>{date[value[0]].value}</Grid>
                                        <Grid item>{date[value[1]].value}</Grid>
                                    </Grid>
                                }
                                min={date[0].id}
                                max={date[date.length - 1].id}
                                step={date[date.length - 1] - date[0] / 100}
                                value={value}
                                distance={date[date.length - 1] - date[0]}
                                data={date.map((item) => {
                                    return item.counter * 1000;
                                })}
                                onChange={setFromHist}
                                onMove={(val) => {
                                    setValue(val);
                                }}
                            />
                        )}
                    </Grid>
                </Collapse>
            </FormControl>
        );
    } catch (err) {
        return <span></span>;
    }
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
        setAbovePin: (cats) => {
            return dispatch({
                type: FITLER_SEARCH_ACTIONS.SET_CAT_ABOVE_PIN,
                dto: cats
            });
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CategoryOptionSearchSingle));
