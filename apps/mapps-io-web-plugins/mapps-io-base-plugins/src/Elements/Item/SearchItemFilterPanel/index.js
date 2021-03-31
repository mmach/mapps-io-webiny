/*
    ./client/components/App.js
*/

import { Badge, CircularProgress, Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "rheostat/initialize";
//import { useWorker } from "@koale/useworker";
//const WebworkerPromise = require("webworker-promise");
//const worker = new WebworkerPromise(new Worker("../../../Workers/process.worker.js"));
import worker from "workerize-loader?inline!./../../../Workers/worker.js";
import { BaseService } from "../../../App/index.js";
import { LIGHTBOX_ACTIONS, TextBoxDebounce } from "../../../Components/index.js";
import { mappsPlugins } from "../../../index.js";
import CategoryOptionSearchMapper from "../CategoryOptionTempMapper/CategoryOptionSearchMapper.js";
//import MAP_SEARCH_ACTIONS from "../SearchMap/actions.js";
import SEARCH_ITEM_RESULT_ACTIONS from "../SearchItemResultsView/actions.js";
import FITLER_SEARCH_ACTIONS from "./actions.js";
import CreatedDateSearch from "./createdDateSearch.js";
window.webWorkers = window.webWorkers ? window.webWorkers : worker();

function SearchItemFilterPanel(props) {
    const [aggs, setAggs] = useState({});
    const [categoryLoading, setCategoryLoadingState] = useState(false);
    const [catOptions, setCatOptionState] = useState([]);
    const [categoryOptionsTypeQuery, setCategoryOptionsTypeQueryState] = useState(
        props.filterSearchReducer.categoryOptionsType
    );
    const [searchFilter, setSearchFilter] = useState({});
    const getViewPlugins = React.useMemo(
        () => mappsPlugins.byType("mapps-item-search-container-results"),
        []
    );
    const filterViewPlugin = React.useMemo(() =>
        mappsPlugins.byName("mapps-item-search-filter-init-engine")
    );
    const categoryFilterPlugin = React.useMemo(() =>
        mappsPlugins.byName(props.mappsSettings.mappsCategoryNamePlugin)
    );
    useEffect(() => {
        setSearchFilter(props.mappsSettings);
    }, [props.mappsSettings]);
    useEffect(() => {
        setAggs(props.filterSearchReducer.aggs);
    }, [props.filterSearchReducer.aggs]);

    useEffect(() => {
        if (props.filterSearchReducer.categoryOptionsType.length == 0) {
            props.getCategoryOptionsType().then((succ) => {
                setCategoryOptionsTypeQueryState(succ.data);
            });
        }
    }, []);

    useEffect(() => {
        setCatOptionState(props.filterSearchReducer.catOptions);
    }, [props.filterSearchReducer.catOptions]);

    function setCategory(category) {
        const searchObj = { version: props.filterSearchReducer.search.version };

        searchObj.category_id = category.category.id;

        props.setSearchParams({
            ...searchObj,
            version: props.filterSearchReducer.search.version + 1
        });

        // props.showAbovePin(showAbovePin);
    }

    function onLoading(isLoading, catList) {
        if (isLoading == false && catList.length == 1) {
            if (catList[0].category_parent[0].category == "_ROOT") {
                setCategory({ category: catList[0] });
            }
        }
        if (isLoading == false) {
            props.setCategories(catList);
        }
        setCategoryLoadingState(isLoading);
    }

    function setTags(event) {
        const searchObj = { version: props.filterSearchReducer.search.version };

        const tag = event.currentTarget.getAttribute("data-tag");

        if (searchObj.tag == undefined || searchObj.tag.length == 0) {
            searchObj.tag = [];
        }
        if (
            searchObj.tag.filter((item) => {
                return item == tag;
            }).length > 0
        ) {
            searchObj.tag = searchObj.tag.filter((item) => {
                return item != tag;
            });
        } else {
            searchObj.tag.push(tag);
        }
        props.setSearchParams({
            ...searchObj,
            version: props.filterSearchReducer.search.version + 1
        });
    }

    function freetextChange(val) {
        const value = val;
        const obj = { version: props.filterSearchReducer.search.version };
        if (val != obj.freetext) {
            obj.freetext = value;

            props.setSearchParams({ ...obj, version: obj.version + 1 });
        }
    }

  

    const tran = Translator(props.codeDict.data.LABEL, props.lang);

    return (
        <Grid>
            {filterViewPlugin.render({ mappsSettings: searchFilter })}
            <Grid container style={{ justifyContent: "center" }}>
                {getViewPlugins
                    .filter((i) => {
                        return (
                            props.mappsSettings[i.mappsKey] &&
                            props.mappsSettings[i.mappsKey].isActive == true
                        );
                    })
                    .map((i) => i.searchButtonRender({ mappsSettings: searchFilter }))}
            </Grid>
            {getViewPlugins
                .filter((i) => i.mappsKey == props.filterSearchReducer.search.view)
                .map((i) => i.searchFilterRender({ mappsSettings: searchFilter }))}

           
            {props.mappsSettings && props.mappsSettings.useFreetext && (
                <Grid container>
                    <TextBoxDebounce
                        label={tran.translate("SEARCH_FREETEXT")}
                        value={props.filterSearchReducer.search.freetext}
                        onChange={freetextChange}
                        validation={[]}
                        debounce={500}
                    />
                </Grid>
            )}
            {categoryFilterPlugin &&
                categoryFilterPlugin.render({
                    onLoading: onLoading,
                    category_id: props.filterSearchReducer.search.category_id,
                    onClick: setCategory,
                    isLoading: props.filterSearchReducer.loading,
                    aggs: aggs,
                    categoryList: props.filterSearchReducer.categories
                })}
            
            {props.mappsSettings && props.mappsSettings.useCreatedDate && <CreatedDateSearch />}
            {catOptions != undefined &&
                catOptions.length > 0 &&
                categoryOptionsTypeQuery.length > 0 &&
                catOptions
                    .filter((item) => {
                        return item.category_link[0].is_searchable != undefined
                            ? item.category_link[0].is_searchable
                            : item.is_searchable;
                    })
                    .sort((a, b) => {
                        return Number(a.order_search) > Number(b.order_search) ? 1 : -1;
                    })
                    .map((item) => {
                        if (aggs) {
                            return (
                                <CategoryOptionSearchMapper
                                    getCategoryOptionsTypeQuery={categoryOptionsTypeQuery}
                                    cat_option_id={item.id}
                                    catOption={item}
                                    catOptions={catOptions}
                                />
                            );
                        }
                    })}

            {props.mappsSettings &&
                props.mappsSettings.useTags &&
                aggs.tags &&
                categoryLoading == false &&
                props.filterSearchReducer.loading == false && (
                    <div >
                        {aggs.tags.buckets.map((item) => {
                            if (
                                props.filterSearchReducer.search.tag != undefined &&
                                props.filterSearchReducer.search.tag.filter((tag) => {
                                    return tag == item.key;
                                }).length == 1
                            ) {
                                return (
                                    <Badge
                                        color="primary"
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right"
                                        }}
                                        badgeContent={
                                            props.isLoading == true ? (
                                                <span style={{ padding: 1 }}>
                                                    <CircularProgress
                                                        color={item.color}
                                                        thickness={2}
                                                        height="10px"
                                                        size="10px"
                                                        text=" "
                                                    />
                                                </span>
                                            ) : (
                                                <span>{item.doc_count}</span>
                                            )
                                        }
                                    >
                                        <Chip
                                            data-tag={item.key}
                                            onClick={setTags}
                                            label={item.key}
                                            style={{ cursor: "pointer !important" }}
                                            className="  list-group-item list-group-item-action  g-bg-gray-light-v2 g-color-gray-dark-v3 g-bg-gray justify-content-between u-link-v5 g-cursor-pointer g-py-2  g-pl-7--hover "
                                        ></Chip>
                                    </Badge>
                                );
                            }
                            return (
                                <Badge
                                    key={item.key}
                                    color="primary"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right"
                                    }}
                                    badgeContent={
                                        props.isLoading == true ? (
                                            <span style={{ padding: 1 }}>
                                                <CircularProgress
                                                    color={item.color}
                                                    thickness={2}
                                                    height="10px"
                                                    size="10px"
                                                    text=" "
                                                />
                                            </span>
                                        ) : (
                                            <span>{item.doc_count}</span>
                                        )
                                    }
                                >
                                    <Chip
                                        data-tag={item.key}
                                        onClick={setTags}
                                        label={item.key}
                                        style={{ cursor: "pointer !important" }}
                                    ></Chip>
                                </Badge>
                            );
                        })}
                    </div>
                )}
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchItemFilterPanel));
