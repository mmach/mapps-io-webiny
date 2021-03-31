

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import BarChartIcon from "@material-ui/icons/BarChart";
import ClearIcon from "@material-ui/icons/Clear";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React, { useState } from "react";
import { connect } from "react-redux";
import "rheostat/initialize";
import { BaseService } from "../../../App/index.js";
import HistogramSlider from "../../../Components/HistogramSlider/HistogramSlider.js";
//import MAP_SEARCH_ACTIONS from "../SearchMap/actions.js";
//import ITEM_SEARCH_ACTIONS from "../ItemSearch/actions.js";
import { DayPickerInputComponent, LIGHTBOX_ACTIONS } from "../../../Components/index.js";
import FITLER_SEARCH_ACTIONS from "./actions.js";

function CreatedDateSearch(props) {
    const [dataHistValue, setDataHistValueState] = useState(undefined);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dateDayHist, setDateDayHistState] = useState([]);
    const [showDiagram, setShowDiagram] = useState(false);
    const [min, setMin] = useState(new Date(new Date().setMonth(new Date().getMonth() - 3)));
    const [max, setMax] = useState(new Date());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [manMin, setMinMan] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [manMax, setMaxMan] = useState(false);
    const [loading, setLoading] = React.useState(false);

    const [date, setDate] = useState(
        props.filterSearchReducer.aggs.data_day_histogram != undefined
            ? props.filterSearchReducer.aggs.data_day_histogram.buckets.length > 0
                ? props.filterSearchReducer.aggs.data_day_histogram.buckets.map((item, index) => {
                      return {
                          id: index,
                          value: item.key_as_string,
                          counter: item.doc_count
                      };
                  })
                : [
                      { id: -1, value: 0, counter: 0 },
                      { id: -1, value: 0, counter: 0 }
                  ]
            : [
                  { id: -1, value: 0, counter: 0 },
                  { id: -1, value: 0, counter: 0 }
              ]
    );
    const [value, setValue] = useState(
        dataHistValue
            ? [dataHistValue[0], dataHistValue[1]]
            : [0, date.length > 1 ? date.length - 1 : 1]
    );
    React.useEffect(() => {
        setLoading(props.filterSearchReducer.loading);
    }, [props.filterSearchReducer.loading]);
    React.useEffect(() => {
        const val =
            props.filterSearchReducer.aggs.data_day_histogram != undefined
                ? props.filterSearchReducer.aggs.data_day_histogram.buckets.length > 0
                    ? props.filterSearchReducer.aggs.data_day_histogram.buckets.map(
                          (item, index) => {
                              return {
                                  id: index,
                                  value: item.key_as_string,
                                  counter: item.doc_count
                              };
                          }
                      )
                    : [
                          {
                              id: -1,
                              value: new Date(new Date().setMonth(new Date().getMonth() - 3)),
                              counter: 0
                          },
                          { id: -1, value: new Date(), counter: 0 }
                      ]
                : [
                      {
                          id: -1,
                          value: new Date(new Date().setMonth(new Date().getMonth() - 3)),
                          counter: 0
                      },
                      { id: -1, value: new Date(), counter: 0 }
                  ];

        setDate(val);
        setValue([0, val.length > 1 ? val.length - 1 : 1]);
        if (val[0].id >= 0) {
            setMin(val[0].value);
            setMax(val[val.length - 1].value);
        }
    }, [props.filterSearchReducer.aggs.data_day_histogram]);
    const tran = Translator(props.codeDict.data.LABEL, props.lang);
    function startHandler(event) {
        let date = undefined;

        date = event;
        setMinMan(true);
        setMin(date);
        props.setSearchParams({
            createdInterval: props.filterSearchReducer.aggs.data_day_histogram.interval,
            startDate: date,
            endDate: max,
            version: props.filterSearchReducer.search.version + 1
        });
    }
    function finishHandler(event) {
        //    console.log('co sie kurwa tu dzieje')
        let date = undefined;

        date = event;
        setMaxMan(true);

        setMax(date);
        props.setSearchParams({
            createdInterval: props.filterSearchReducer.aggs.data_day_histogram.interval,
            startDate: min,
            endDate: date,
            version: props.filterSearchReducer.search.version + 1
        });
    }
    function resetDate() {
        setShowDiagram(false);
        props.setSearchParams({
            createdInterval: undefined,
            startDate: undefined,
            endDate: undefined,
            version: props.filterSearchReducer.search.version + 1
        });
    }
    function setCurrentDateLimit(value) {
        setShowDiagram(false);

        setDataHistValueState(value);
        setValue(value);

        setMin(date[value[0]].value);
        setMax(date[value[1]].value);
        props.setSearchParams({
            createdInterval: props.filterSearchReducer.aggs.data_day_histogram.interval,
            startDate: date[value[0]].value,
            endDate: date[value[1]].value,
            version: props.filterSearchReducer.search.version + 1
        });
    }
    return (
        <FormControl component="fieldset" style={{ width: "100%", paddingBottom: 10 }}>
            <Grid container style={{ alignItems: "center" }}>
                <Grid item xs="9" style={{ paddingTop: 12, paddingBottom: 12 }}>
                    <FormLabel component="legend">{"Created Date"}</FormLabel>
                </Grid>
                <Grid item xs="3" style={{ textAlign: "right" }}>
                    {props.filterSearchReducer.search.createdInterval && (
                        <IconButton onClick={resetDate}>
                            <ClearIcon style={{ fontSize: 20 }} />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
            <Grid container item style={{ paddingTop: 10 }}>
                <Grid item xs="5" lg="5">
                    <FormControlLabel
                        style={{ marginLeft: 2, marginRight: 2 }}
                        control={
                            <DayPickerInputComponent
                                dateFormat="dd-MM-yyyy"
                                showTimeSelect={false}
                                noLabel
                                label={tran.translate("NOT_BETWEEN_START_DATE_LABEL")}
                                fixedHeight
                                selectsStart
                                startDate={min}
                                endDate={max}
                                monthsShown={1}
                                value={min}
                                onChange={startHandler}
                                field="birthDate"
                                validation={[]}
                            />
                        }
                    />
                </Grid>
                <Grid item xs="5" lg="5">
                    <FormControlLabel
                        style={{ marginLeft: 2, marginRight: 2 }}
                        control={
                            <DayPickerInputComponent
                                dateFormat="dd-MM-yyyy"
                                showTimeSelect={false}
                                noLabel
                                label={tran.translate("NOT_BETWEEN_END_DATE_LABEL")}
                                fixedHeight
                                selectsEnd
                                startDate={min ? min : new Date()}
                                endDate={new Date()}
                                monthsShown={1}
                                value={max}
                                onChange={finishHandler}
                                field="birthDate"
                                validation={[]}
                            />
                        }
                    />
                </Grid>
                {loading == false && (
                    <Grid item xs="1" style={{ marginLeft: 2, marginRight: 2 }}>
                        <IconButton onClick={() => setShowDiagram(!showDiagram)}>
                            <BarChartIcon color={showDiagram ? "primary" : "default"} />
                        </IconButton>
                    </Grid>
                )}
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
                                    <Grid item>
                                        {new Date(date[value[0]].value).toLocaleString()}
                                    </Grid>
                                    <Grid item>
                                        {new Date(date[value[1]].value).toLocaleString()}
                                    </Grid>
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
                            onChange={setCurrentDateLimit}
                            onMove={(val) => {
                                setValue(val);
                            }}
                        />
                    )}
                </Grid>
            </Collapse>
        </FormControl>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        loader: state.LoaderReducer,
        filterSearchReducer: state.FilterSearchReducer,
        config: state.ConfigReducer,
        mapSearchReducer: state.MapSearchReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openLightbox: (activeImage, images) => {
            return dispatch({
                type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
                dto: {
                    images: images,
                    activeImage: activeImage
                }
            });
        },
        setCategories: (categories) => {
            return dispatch({
                type: FITLER_SEARCH_ACTIONS.SET_CATEGORIES_SEARCH,
                dto: {
                    categories: categories
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
       
        onInitFilterSearch: (categories) => {
            return dispatch({
                type: FITLER_SEARCH_ACTIONS.ON_INIT_SEARCH,
                dto: {
                    categories: categories
                }
            });
        },
        //   onInitSearch: (categories) => {
        //       return dispatch({
        //           type: ITEM_SEARCH_ACTIONS.ON_INIT_ITEM_SEARCH,
        //           dto: {
        //               categories: categories
        //            }
        //        });
        // },
        getCategories: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, dto)
            );
        },
        getItems: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Item.SEARCH_ITEM, dto));
        },
        createNewItem: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Item.NEW_ITEM, dto));
        },
        getUserImages: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null)
            );
        },
        getCategoryOptions: (category_id) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, {
                    id: category_id
                })
            );
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getCategoryOptionsType: (id) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {})
            );
        },
        getUserInfo: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, dto, null));
        }

        // itemProcessed: (items) => {
        //     return dispatch({
        //         type: ITEM_SEARCH_ACTIONS.ITEM_PROCESSED,
        //         dto: items
        //     });
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CreatedDateSearch));
