/*
    ./client/components/App.js
*/

import axios from "axios";
import { CommandList, QueryList, SearchItemDTO } from "justshare-shared";
import debounce from "lodash/debounce";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "rheostat/initialize";
import { isUuid, uuid } from "uuidv4";
//import { useWorker } from "@koale/useworker";
//const WebworkerPromise = require("webworker-promise");
//const worker = new WebworkerPromise(new Worker("../../../Workers/process.worker.js"));
import worker from "workerize-loader?inline!./../../../Workers/worker.js";
import { BaseService } from "../../../App/index.js";
import { LIGHTBOX_ACTIONS } from "../../../Components/index.js";
//import MAP_SEARCH_ACTIONS from "../SearchMap/actions.js";
import SEARCH_ITEM_RESULT_ACTIONS from "../SearchItemResultsView/actions.js";
import FITLER_SEARCH_ACTIONS from "./actions.js";

window.webWorkers = window.webWorkers ? window.webWorkers : worker();

function SearchItemInitFilterPanel(props) {
    const parsed = queryString.parse(location.search);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [external_config, setExternalConfigState] = useState(
        props.external_config
            ? props.external_config
            : { useURL: false, search: { distance: "all", lat: 0, lon: 0, category_id: "_ROOT" } }
    );

    const [search, setSearchState] = useState({
        ...new SearchItemDTO(),
        id: null,
        category_id: parsed.category_id != undefined ? parsed.category_id : "_ROOT",
        lat: 0,
        lon: 0,
        version: 0,
        unrefresh: {
            zoom: 13
        }
    });

    const [catOptions, setCatOptionState] = useState([]);
    const [isActiveInstance, setIsActiveInstance] = useState(false);

    const [instanceId] = useState(uuid());

    const getItems = React.useMemo(
        () =>
            debounce(async (request, callback) => {
                await callback(request);
            }, 2000),

        []
    );
    useEffect(() => {
        if (
            props.filterSearchReducer.currentInstances.filter(
                (i) => i.id == instanceId && i.is_main == true
            ).length > 0
        ) {
            isActiveInstance == false && setIsActiveInstance(true);
        } else {
            isActiveInstance == true && setIsActiveInstance(false);
        }
    }, [props.filterSearchReducer.currentInstances]);

    useEffect(() => {
        if (isActiveInstance == false) {
            return;
        }
        props.setCatOptions(catOptions);
    }, [catOptions]);
    useEffect(() => {
        props.onMount(instanceId);
    }, [instanceId]);
    useEffect(() => {
        if (isActiveInstance == false) {
            return;
        }
        let searchObj = { version: props.filterSearchReducer.search.version };
        //   props.onInitSearch();
        props.onInitFilterSearch();
        Object.keys(props.mappsSettings).map((i) => {
            if (props.mappsSettings[i].isMain == true) {
                searchObj.view = i;
            }
        });
        if (external_config.useURL == true) {
            const parsed = queryString.parse(location.search);
            parsed.tag = parsed.tag ? JSON.parse(parsed.tag) : undefined;
            parsed.catOptions =
                parsed.catOptions != undefined &&
                parsed.catOptions != "" &&
                parsed.catOptions != "{}"
                    ? JSON.parse(parsed.catOptions)
                    : undefined;
           
            searchObj = loadFunc(parsed, props);
            // props.setSearchParams({
            //     ...searchObj,
            //     version: searchObj.version + 1
            // });
        } else {
            searchObj = loadFunc(external_config.search, props);
            // props.setSearchParams({
            //-     ...searchObj,
            //     version: searchObj.version + 1
            // });
        }

        Object.keys(props.mappsSettings).map((i) => {
            if (props.mappsSettings[i].isMain == true) {
                searchObj.view = i;
            }
        });

        // if (!searchObj.lat && !searchObj.lon) {
        if (
            props.auth.user &&
            !(props.auth.user.latitude == 0 && props.auth.user.longigute == 0) &&
            props.auth.user.latitude
        ) {
            props.setSearchParams({
                ...searchObj,
                lat: props.auth.user.latitude,
                lon: props.auth.user.longitude,
                version: searchObj.version + 2
            });
        } else {
            axios.get("https://ipapi.co/json/").then((response) => {
                const data = response.data;
                props.setSearchParams({
                    ...searchObj,
                    lat: data.latitude,
                    lon: data.longitude,
                    version: searchObj.version + 2
                });
            });
        }
        //  } else {
        //     props.setSearchParams({
        //         ...searchObj,

        //        version: 1
        //     });
        //}

        //loadFunc(props)
    }, [isActiveInstance, props.mappsSettings]);
    useEffect(() => {
        if (isActiveInstance == false) {
            return;
        }
        const coIds = [];
        catOptions.forEach((i) => {
            if (i.category_link[0].is_on_pin_map == true) {
                coIds.push(i.id);
            }
        });
        props.setAbovePin(coIds);
    }, [catOptions, isActiveInstance]);

    useEffect(() => {
        return () => {
            props.onUnmount(instanceId);
        };
    }, []);
    useEffect(() => {
        const func = async () => {
            if (
                props.filterSearchReducer.search.lat != undefined &&
                props.filterSearchReducer.search.version > search.version
            ) {
                let catOpt = catOptions;
                if (props.filterSearchReducer.search.category_id != search.category_id) {
                    const catOptResult = await props.getCategoryOptions(
                        props.filterSearchReducer.search.category_id
                    );
                    catOpt = catOptResult.data;
                    setCatOptionState(catOptResult.data);
                }
                const result = loadFunc(props.filterSearchReducer.search, props);

                setSearchState(result);
                if (result.lat != undefined) {
                    getItems(
                        {
                            search: props.filterSearchReducer.search,
                            catOpt: catOpt
                        },
                        async (request) => {
                            const succ = await props.getItems(request.search);

                            const searchResult = succ.data;
                            const pairs = getValueFromURL(props.filterSearchReducer);
                            window.webWorkers
                                .ProcessItemWorker({
                                    items: searchResult.items,
                                    catOpt: request.catOpt,
                                    pairs: pairs,
                                    dimensions: props.config.dimensions,
                                    lang: props.lang
                                })
                                .then((response) => {
                                    props.itemProcessed(response);
                                })
                                .catch((error) => {
                                    // eslint-disable-next-line no-console
                                    console.log(error);
                                });
                        }
                    );
                }
            }
        };
        if (isActiveInstance == false) {
            return;
        }
        func();
    }, [props.filterSearchReducer.search, props.filterSearchReducer.aggs, isActiveInstance]);

    function getValueFromURL(coSearch) {
        const pairs = [];
        if (coSearch && coSearch.search && coSearch.search.catOptions) {
            Object.keys(coSearch.search.catOptions).forEach((itemSearch) => {
                coSearch.search.catOptions[itemSearch] &&
                    coSearch.search.catOptions[itemSearch].forEach((searchcoTemp) => {
                        Object.keys(searchcoTemp).forEach((st) => {
                            if (isUuid(st)) {
                                let val = "";
                                if (searchcoTemp[st] instanceof Date) {
                                    val = searchcoTemp[st].toLocaleDateString();
                                } else {
                                    val = searchcoTemp[st];
                                }
                                pairs.push({
                                    id: st,
                                    val: val
                                });
                            }
                        });
                    });
            });
        }
        return pairs;
    }
    function loadFunc(parsed, props) {
        //const parsed = queryString.parse(location.search);
        const searchObj = { version: props.filterSearchReducer.search.version };
        if (searchObj.distance != "all") {
            searchObj.distance = parsed.distance ? parsed.distance : "1km";
        }
        searchObj.grouping = parsed.grouping ? parsed.grouping : "1m";
        searchObj.lat = parsed.lat ? parsed.lat : props.filterSearchReducer.search.lat; //(props.auth.user != null ? props.auth.user.latitude : 0);
        searchObj.lon = parsed.lon ? parsed.lon : props.filterSearchReducer.search.lon; //(props.auth.user != null ? props.auth.user.longitude : 0);
        searchObj.freetext = parsed.freetext;
        searchObj.category_id = parsed.category_id;
        searchObj.size = parsed.size == 0 ? 600 : parsed.size;
        searchObj.page = parsed.page == undefined ? 0 : parsed.page;
        searchObj.user_id = parsed.user_id == undefined ? undefined : parsed.user_id;
        searchObj.tag = parsed.tag && parsed.tag.length > 0 ? parsed.tag : undefined;
        searchObj.startDate =
            parsed.startDate != undefined && parsed.startDate != "" ? parsed.startDate : undefined;
        searchObj.endDate =
            parsed.endDate != undefined && parsed.endDate != "" ? parsed.endDate : undefined;
        searchObj.createdInterval =
            parsed.createdInterval != undefined && parsed.createdInterval != ""
                ? parsed.createdInterval
                : undefined;
        searchObj.catOptions =
            parsed.catOptions != undefined && parsed.catOptions != ""
                ? parsed.catOptions
                : undefined;
        // console.log('SEARCH')
        //console.log(search);
        // const stringified = queryString.stringify(search, { sort: false });
        //props.history.push('/search?' + stringified);

        // if (!actionAccess(ActionsList.ITEM_SEARCH_DISTANCE)) {
        //    searchObj.distance = "all";
        //}
        if (external_config.useURL == true) {
            const toParse = Object.assign({}, searchObj);
            toParse.tag = JSON.stringify(toParse.tag);
            toParse.catOptions = JSON.stringify(toParse.catOptions);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const stringified = queryString.stringify(toParse, { sort: false });
            //    props.history.push("~/?" + stringified);
        }

        return searchObj;
    }

    // trigger={category.category == undefined ? tran.translate('CATEGORY_CHOOSE_CATEGORY_LABEL') : tran.translate('CATEGORY_FILTER_LABEL') + ": " + category["category_" + props.lang]} >
    return <span></span>;
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        loader: state.LoaderReducer,
        filterSearchReducer: state.FilterSearchReducer,
        config: state.ConfigReducer
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

        onMount: (id) => {
            return dispatch({
                type: FITLER_SEARCH_ACTIONS.MOUNT_INSTANCE_OF_ENGINE,
                dto: id
            });
        },
        onUnmount: (id) => {
            return dispatch({
                type: FITLER_SEARCH_ACTIONS.UNMOUNT_INSTANCE_OF_ENGINE,
                dto: id
            });
        },
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
        setCatOptions: (catOptions) => {
            return dispatch({
                type: FITLER_SEARCH_ACTIONS.SET_CATEGORY_OPTIONS,
                dto: catOptions
            });
        },
        getCategoryOptionsType: () => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {})
            );
        },
        getUserInfo: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, dto, null));
        },

        itemProcessed: (items) => {
            return dispatch({
                type: SEARCH_ITEM_RESULT_ACTIONS.ITEM_PROCESSED,
                dto: items
            });
        }
    };
};

/*export default withRouter(
    geolocated({
        positionOptions: {
            enableHighAccuracy: false
        },
        userDecisionTimeout: 5000
    })(connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchItemInitFilterPanel)))
);*/

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchItemInitFilterPanel))
);
