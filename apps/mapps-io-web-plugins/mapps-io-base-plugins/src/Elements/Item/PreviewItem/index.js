/*
    ./client/components/App.js
*/

import { Chip, Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN03TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n03";
import { BuildItem, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
//import { ONP, isDIM } from '../../../App/Architecture/onp.js';
import { isUuid } from "uuidv4";
import { BaseService } from "../../../App/index.js";
import { BodyLoader, LIGHTBOX_ACTIONS, MODAL_ACTIONS } from "../../../Components/index.js";
import PreviewItemOptions from "../PreviewItemOptions/index.js";
//import CategoryOptionIMAGE_SHOW from "./../../../Categories/Components/CategoryOptionTypes/PREVIEW/CategoryOptionIMAGE_SHOW.js";

class PreviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.state.item = this.props.item ? this.props.item : {};
        this.state.isLoading = true;
        this.state.isOpen = false;
        this.state.comopnent = undefined;
        this.state.actions = [];
        this.state.catOptions = [];
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.item_id != undefined && nextProps.item_id != this.props.item_id) {
            return true;
        }
        if (this.state.isLoading != nextState.isLoading) {
            return true;
        }
        if (this.state.isOpen != nextState.isOpen) {
            return true;
        }
        return false;
    }
    componentDidMount() {
        this.setState({
            isOpen: false
        });
        if (this.props.item_id) {
            //    console.log(this.props.item_id)
            this.props.getItem(this.props.item_id).then((succ) => {
                Promise.all([
                    this.props.getActions({ category_id: succ.data.category_id }),
                    this.props.getCategoryOptions(succ.data.category_id)
                ]).then((succ2) => {
                    //     console.log(succ2);
                    const pairs = this.getValueFromURL(this.props.filterSearchReducer);
                    BuildItem(
                        succ.data,
                        succ2[1].data,
                        pairs,
                        this.props.config.dimensions,
                        this.props.lang
                    );

                    this.setState({
                        actions: succ2[0].data,
                        catOptions: succ2[1].data,
                        item: succ.data,
                        isLoading: false
                    });
                });
            });
        } else {
            Promise.all([
                this.props.getActions({ category_id: this.state.item.category_id }),
                this.props.getCategoryOptions(this.state.item.category_id)
            ]).then((succ2) => {
                const pairs = this.getValueFromURL(this.props.filterSearchReducer);
                BuildItem(
                    this.state.item,
                    succ2[1].data,
                    pairs,
                    this.props.config.dimensions,
                    this.props.lang
                );

                this.setState({
                    actions: succ2[0].data,
                    catOptions: succ2[1].data,
                    item: { ...this.state.item },
                    isLoading: false
                });
            });
        }
    }
    getValueFromURL(coSearch) {
        const pairs = [];
        if (coSearch && coSearch.search && coSearch.search.catOptions) {
            Object.keys(coSearch.search.catOptions).forEach((itemSearch) => {
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
                        //SINGLE ELEMENTS IS NOT HANDLED
                    });
                });
            });
        }
        return pairs;
    }
    componentDidUpdate(prevProp, prevState) {
        if (prevState.isLoading != this.state.isLoading) {
            return;
        }
        if (prevState.isOpen != this.state.isOpen) {
            return;
        }
        this.setState({
            isOpen: false,
            isLoading: true
        });
        if (prevProp.item_id != this.props.item_id) {
            this.props.getItem(this.props.item_id).then((succ) => {
                Promise.all([
                    this.props.getActions({ category_id: succ.data.category_id }),
                    this.props.getCategoryOptions(succ.data.category_id)
                ]).then((succ2) => {
                    const pairs = this.getValueFromURL(this.props.filterSearchReducer);
                    BuildItem(
                        succ.data,
                        succ2[1].data,
                        pairs,
                        this.props.config.dimensions,
                        this.props.lang
                    );

                    this.setState({
                        actions: succ2[0].data,
                        catOptions: succ2[1].data,
                        item: succ.data,
                        isLoading: false
                    });
                });
            });
        }
    }

    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    }
    openImage() {
        this.props.openLightbox(this.props.auth.user.blob_profile, this.props.userAccount.images);
    }

    isOpenMenu(state) {
        if (state.isOpen == false) {
            this.setState({
                isOpen: false,
                component: ""
            });
        } else {
            this.setState({
                isOpen: true
            });
        }
    }
    closeMenu() {
        this.setState({
            isOpen: false,
            component: ""
        });
    }
    gotoUser() {
        this.setState({
            isOpen: true,
            component: "USER_ACCOUNT"
        });
    }
    reservationClick() {
        this.setState({
            isOpen: true,
            component: "RESRVATION_ITEM"
        });
    }
    shareLink() {
        this.props.openUserModal(true, "SHARE", {
            title: this.state.item.name,
            link: window.location.origin + "/item/preview?item_id=" + this.state.item.id
        });
    }
    render() {
        this.init();
        //const { tags, suggestions } = this.state.item;

        if (this.state.isLoading == true) {
            return (
                <BodyLoader
                    zIndex={3}
                    height="800px"
                    size="100px"
                    progress={this.props.loader.BODY_PROGRESS}
                />
            );
        }
        //  if (this.props.userAccount.getImagesIsLoading == true) {
        //      return (<BodyLoader zIndex={3} height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
        //  }

        const catOptions = {};
        this.state.item.itemCategoryOption.forEach((item) => {
            if (catOptions[item.category_link.co_id] == undefined) {
                catOptions[item.category_link.co_id] = {
                    catOption: item.category_link.catOption,
                    elements: []
                };
            }
            catOptions[item.category_link.co_id].elements.push(item);

            // catOptions[item.]
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const actions = this.props.config.actions.filter((item) => {
            return (
                this.state.actions.filter((action) => {
                    return action.action_id == item.id;
                }).length > 0
            );
        });

        return (
            <div data-key={this.state.item.id}>
                <Grid container>
                    <Grid item container xs="8">
                        <CardContent>
                            <TextInfoContent
                                useStyles={useN03TextInfoContentStyles}
                                overline={this.state.item.category["category_" + this.props.lang]}
                                heading={this.state.item.name}
                                body={this.state.item.description}
                            />
                        </CardContent>
                    </Grid>
                    <Grid item container xs="4">
                        <PreviewItemOptions
                            item={this.state.item}
                            on_map={false}
                            lang={this.props.lang}
                            col_size="4"
                        />
                    </Grid>
                </Grid>
                {this.state.item.tags.slice(0, 6).map((item) => {
                    return <Chip key={item.id} label={item.tag ? item.tag : item.label}></Chip>;
                })}
                {this.state.item.tags.length > 6 ? (
                    <Chip
                        label={
                            this.state.item.tags.length -
                            6 +
                            " " +
                            this.tran.translate("MAP_MORE_TAGS_LABEL")
                        }
                    ></Chip>
                ) : (
                    <span></span>
                )}{" "}
                <span></span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        loader: state.LoaderReducer,
        offerItem: state.NewOfferItemReducer,
        config: state.ConfigReducer,
        filterSearchReducer: state.FilterSearchReducer
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

        openUserModal: (open, action, params) => {
            dispatch({
                type: MODAL_ACTIONS.OPEN_MODAL,
                dto: {
                    open: open,
                    action: action,
                    param: params
                }
            });
        },

        getCategoryOptions: (category_id) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, {
                    id: category_id
                })
            );
        },
        getItem: (item_id) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Item.GET_ITEM_BY_ID, { id: item_id })
            );
        },
        getActions: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Category.GET_CATEGORY_ACTIONS, dto)
            );
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewItem);

/*
                        <Col xs="1" className="float-right  "  >
                            <div class="list-group list-group-border-0 text-center g-pa-10" style={{ marginLeft: "40px" }} >

                                <Link to="/userAccount" className=" list-group-item-action justify-content-between u-link-v5      g-color-primary--hover text-center">

                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-16  text-uppercase text-center">
                                        <i class="fa fa-share-alt "></i>

                                    </span>
                                </Link>


                                <Link to="/userAccount" className=" list-group-item-action justify-content-between u-link-v5     g-color-primary--hover text-center">

                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-16  text-uppercase">
                                        <i class="fa fa-envelope"></i>

                                    </span>
                                </Link>

                                <Link to="/userAccount" className=" list-group-item-action justify-content-between u-link-v5     g-color-primary--hover text-center">

                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-16  text-uppercase text-center">
                                        <i class="fa fa-ban"></i>

                                    </span>
                                </Link>

                            </div>


                        </Col>*/
