/*
    ./client/components/App.js
*/

import { Avatar, Badge, CircularProgress, Grid } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import KeyboardReturnOutlinedIcon from "@material-ui/icons/KeyboardReturnOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RefreshIcon from "@material-ui/icons/Refresh";
import { NavItem, NavMenu } from "@mui-treasury/components/menu/navigation";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";
import { QueryList } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import BaseService from "./../../App/Architecture/baseServices.js";

function CategoryFilter(props) {
    const [categoriesList, setCategoryList] = React.useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAggsLoading, setIsAggsLoading] = React.useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentCategory, setCurrentCategory] = React.useState(true);
    const [aggs, setAggs] = React.useState({});

    React.useEffect(() => {
        if (categoriesList.length == 0 && props.categoryList && props.categoryList.length > 0) {
            setCategoryList(props.categoryList);
        } else {
            setIsLoading(true);
            props
                .getCategories({
                    parent: props.category_id ? props.category_id : "_ROOT"
                })
                .then((succ) => {
                    setIsLoading(false);
                    setCategoryList(succ.data);

                    if (props.onLoading != undefined) {
                        props.onLoading(false, succ.data, true);
                    }
                });
        }
    }, [props.category_id]);

    React.useEffect(() => {
        setAggs(props.aggs);
    }, [props.aggs]);

    React.useEffect(() => {
        setIsAggsLoading(props.isLoading);
    }, [props.isLoading]);

    function getCategories(event) {
        setIsLoading(true);

        const cat_id = event.currentTarget.getAttribute("data-tag");
        props.getCategories({ parent: cat_id }).then((succ) => {
            setIsLoading(false);

            const category = succ.data[0].category_parent[0];
            if (cat_id != category.id) {
                props.onClick({ category: succ.data[0] });
            } else {
                props.onClick({ category: category });
            }
            if (props.onLoading != undefined) {
                props.onLoading(false, succ.data);
            }
            setCategoryList(succ.data);
        });
    }

    return (
        <Grid container>
            <NavMenu style={{ width: "100%" }} useStyles={usePlainNavigationMenuStyles}>
                <Grid
                    container
                    style={{ flexDirection: "column", fontSize: "14px", cursor: "pointer" }}
                >
                    {categoriesList[0] &&
                        categoriesList[0].category_parent.map((item) => {
                            if (item.category == "_ROOT") {
                                return <span key={item.category}></span>;
                            }
                            return (
                                <Grid
                                    item
                                    container
                                    key={item.id}
                                    data-tag={
                                        (item.category_parent != undefined
                                            ? item.category_parent.length
                                            : 0) > 0
                                            ? item.category_parent[0].id
                                            : "_ROOT"
                                    }
                                    onClick={getCategories}
                                    style={{ display: "flex", flexWrap: "nowrap" }}
                                >
                                    <Grid
                                        item
                                        style={{
                                            alignSelf: "center",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {" "}
                                        <KeyboardReturnOutlinedIcon style={{ width: "17px" }} />
                                    </Grid>
                                    <Grid item style={{ alignItems: "center" }}>
                                        <NavItem style={{ letterSpacing: "1.2px" }}>...</NavItem>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    {props.withCurrent &&
                        categoriesList[0] &&
                        categoriesList[0].category_parent.map((item) => {
                            if (item.category == "_ROOT") {
                                return <span key={item.category}></span>;
                            }
                            return (
                                <Grid
                                    item
                                    contaimer
                                    key={item.id}
                                    data-tag={item.id}
                                    onClick={getCategories}
                                    style={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                        cursor: "pointer"
                                    }}
                                >
                                    <Grid
                                        item
                                        style={{
                                            alignSelf: "center",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {" "}
                                        <RefreshIcon style={{ width: "17px" }} />
                                    </Grid>
                                    <Grid item style={{ alignItems: "center" }}>
                                        <NavItem style={{ letterSpacing: "1.2px" }}>
                                            {item["category_" + props.lang]}
                                        </NavItem>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    {categoriesList
                        .filter((item) => {
                            return item.category_children.length > 0;
                        })
                        .map((item) => {
                            let counter = 0;
                            if (aggs && aggs.categories != undefined) {
                                const result = aggs.categories.buckets.filter((cat) => {
                                    return cat.key == item.id;
                                });
                                if (result.length == 1) {
                                    counter = result[0].doc_count;
                                }
                            }
                            return (
                                <Grid
                                    item
                                    container
                                    key={item.category}
                                    data-tag={item.id}
                                    onClick={getCategories}
                                    style={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                        cursor: "pointer"
                                    }}
                                    className="link_active list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer   g-pl-7--hover "
                                >
                                    <Grid
                                        item
                                        style={{
                                            alignSelf: "center",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <ArrowForwardIosIcon style={{ width: "13px" }} />
                                    </Grid>
                                    <Grid item container style={{ alignItems: "center" }}>
                                        <Grid item xs="10">
                                            <NavItem style={{ letterSpacing: "1.2px" }}>
                                                {item["category_" + props.lang]}
                                            </NavItem>
                                        </Grid>
                                        {aggs && counter > -1 && (
                                            <Grid item xs="2">
                                                <Badge
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "right"
                                                    }}
                                                    badgeContent={
                                                        isAggsLoading == true ? (
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
                                                            <span>{counter}</span>
                                                        )
                                                    }
                                                    color={"primary"}
                                                >
                                                    <Avatar
                                                        style={{
                                                            borderColor: item.color,
                                                            border: "2px",
                                                            padding: "5px",

                                                            borderStyle: "dotted",

                                                            maxWidth: "30px",
                                                            maxHeight: "30px"
                                                        }}
                                                        src={
                                                            window.env.BLOB_URL +
                                                            "/blob/" +
                                                            item.icon_blob.blob_id
                                                        }
                                                    ></Avatar>
                                                </Badge>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            );
                        })}
                    {categoriesList
                        .filter((item) => {
                            return item.category_children.length == 0;
                        })
                        .map((item) => {
                            let counter = 0;
                            if (aggs && aggs.categories != undefined) {
                                const result = aggs.categories.buckets.filter((cat) => {
                                    return cat.key == item.id;
                                });
                                if (result.length == 1) {
                                    counter = result[0].doc_count;
                                }
                            }
                            return (
                                <Grid
                                    item
                                    container
                                    key={item.category}
                                    data-tag={item.id}
                                    style={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                        cursor: "pointer"
                                    }}
                                    onClick={getCategories}
                                >
                                    <Grid
                                        item
                                        style={{
                                            alignSelf: "center",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <MoreVertIcon
                                            style={{
                                                width: "17px"
                                            }}
                                        />
                                    </Grid>
                                    <Grid item container style={{ alignItems: "center" }}>
                                        <Grid item xs="10">
                                            <NavItem style={{ letterSpacing: "1.2px" }}>
                                                {item["category_" + props.lang]}
                                            </NavItem>
                                        </Grid>

                                        {aggs && counter > -1 && (
                                            <Grid item xs="2">
                                                <Badge
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "right"
                                                    }}
                                                    badgeContent={
                                                        isAggsLoading == true ? (
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
                                                            <span>{counter}</span>
                                                        )
                                                    }
                                                    color={"primary"}
                                                >
                                                    <Avatar
                                                        style={{
                                                            borderColor: item.color,
                                                            border: "2px",
                                                            padding: "5px",
                                                            borderStyle: "dotted",

                                                            maxWidth: "30px",
                                                            maxHeight: "30px"
                                                        }}
                                                        src={
                                                            window.env.BLOB_URL +
                                                            "/blob/" +
                                                            item.icon_blob.blob_id
                                                        }
                                                    ></Avatar>
                                                </Badge>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            );
                        })}
                </Grid>
            </NavMenu>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        loader: state.LoaderReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, dto)
            );
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CategoryFilter));
