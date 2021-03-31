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
import { QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import BodyLoader from "../Loader/BodyLoader/index.js";
import BaseService from "./../../App/Architecture/baseServices.js";

class CategoryFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.categoriesList = [];
        this.state.isLoading = true;
        if (this.props.onLoading != undefined) {
            this.props.onLoading(true, this.state.categoriesList);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.category_id != nextProps.category_id) {
            return true;
        }
        if (this.state.isLoading != nextState.isLoading) {
            return true;
        }
        if (this.state.categoriesList != nextState.categoriesList) {
            return true;
        }
        if (this.props.aggs != nextProps.aggs) {
            return true;
        }
        if (this.props.isLoading != nextProps.isLoading) {
            return true;
        }
        return false;
    }
    componentDidUpdate(prevProps) {
        if (this.props.category_id != prevProps.category_id) {
            this.setState({
                isLoading: true,
                categoriesList: []
            });
            this.props
                .getCategories({
                    parent: this.props.category_id ? this.props.category_id : "_ROOT"
                })
                .then((succ) => {
                    this.setState({
                        isLoading: false,
                        categoriesList: succ.data
                    });
                    if (this.props.onLoading != undefined) {
                        this.props.onLoading(false, this.state.categoriesList, true);
                    }
                });
        }
    }
    showSettings(event) {
        event.preventDefault();
    }
    componentDidMount() {
        this.props
            .getCategories({ parent: this.props.category_id ? this.props.category_id : "_ROOT" })
            .then((succ) => {
                /* succ.data = succ.data.map((item,index) => {
                 item.color=array[index%19]
                 return item
             });*/

                // this.props.colorSet ? this.props.colorSet(succ.data) : "";
                this.setState({
                    isLoading: false,
                    categoriesList: succ.data
                });
                if (this.props.onLoading != undefined) {
                    this.props.onLoading(false, this.state.categoriesList, true);
                }
            });
    }

    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    }

    getCategories(event) {
        this.setState({
            isLoading: true
        });
        if (this.props.onLoading != undefined) {
            this.props.onLoading(true);
        }
        const cat_id = event.currentTarget.getAttribute("data-tag");
        this.props.getCategories({ parent: cat_id }).then((succ) => {
            this.setState({
                isLoading: false
            });
            const category = succ.data[0].category_parent[0];
            if (cat_id != category.id) {
                this.props.onClick({ category: succ.data[0] });
            } else {
                this.props.onClick({ category: category });
            }
            if (this.props.onLoading != undefined) {
                this.props.onLoading(false, this.state.categoriesList);
            }
            this.setState({
                categoriesList: [...succ.data]
            });
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <BodyLoader
                    zIndex={3}
                    height="20px"
                    size="20px"
                    text=" "
                    progress={this.props.loader.BODY_PROGRESS}
                />
            );
        }
        return (
            <Grid container>
                <NavMenu style={{ width: "100%" }} useStyles={usePlainNavigationMenuStyles}>
                    <Grid
                        container
                        className={this.props.tblClass}
                        style={{ flexDirection: "column", fontSize: "14px", cursor: "pointer" }}
                    >
                        {this.state.categoriesList[0].category_parent.map((item) => {
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
                                    onClick={this.getCategories.bind(this)}
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
                        {this.props.withCurrent &&
                            this.state.categoriesList[0].category_parent.map((item) => {
                                if (item.category == "_ROOT") {
                                    return <span key={item.category}></span>;
                                }
                                return (
                                    <Grid
                                        item
                                        contaimer
                                        key={item.id}
                                        data-tag={item.id}
                                        onClick={this.getCategories.bind(this)}
                                        className={this.props.currentClass}
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
                                                {item["category_" + this.props.lang]}
                                            </NavItem>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        {this.state.categoriesList
                            .filter((item) => {
                                return item.category_children.length > 0;
                            })
                            .map((item) => {
                                let counter = 0;
                                if (this.props.aggs && this.props.aggs.categories != undefined) {
                                    const result = this.props.aggs.categories.buckets.filter(
                                        (cat) => {
                                            return cat.key == item.id;
                                        }
                                    );
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
                                        onClick={this.getCategories.bind(this)}
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
                                                    {item["category_" + this.props.lang]}
                                                </NavItem>
                                            </Grid>
                                            {this.props.aggs && counter > -1 && (
                                                <Grid item xs="2">
                                                    <Badge
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "right"
                                                        }}
                                                        badgeContent={
                                                            this.props.isLoading == true ? (
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
                        {this.state.categoriesList
                            .filter((item) => {
                                return item.category_children.length == 0;
                            })
                            .map((item) => {
                                let counter = 0;
                                if (this.props.aggs && this.props.aggs.categories != undefined) {
                                    const result = this.props.aggs.categories.buckets.filter(
                                        (cat) => {
                                            return cat.key == item.id;
                                        }
                                    );
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
                                        onClick={this.getCategories.bind(this)}
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
                                                    {item["category_" + this.props.lang]}
                                                </NavItem>
                                            </Grid>

                                            {this.props.aggs && counter > -1 && (
                                                <Grid item xs="2">
                                                    <Badge
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "right"
                                                        }}
                                                        badgeContent={
                                                            this.props.isLoading == true ? (
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
