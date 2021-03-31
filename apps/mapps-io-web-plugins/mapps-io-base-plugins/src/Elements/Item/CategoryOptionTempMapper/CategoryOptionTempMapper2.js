/*
    ./client/components/App.js
*/
/*
    ./client/components/App.js
*/
import { CategoryOptionsDTO, DictionaryDTO, QueryList, Translator } from "justshare-shared";
import React from "react";
import Collapsible from "react-collapsible";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import CategoryOptionBETWEEN from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionBETWEEN.js";
import CategoryOptionGEO from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionGEO.js";
import CategoryOptionIMAGE from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionIMAGE.js";
import CategoryOptionSELECT from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionSELECT.js";
import CategoryOptionSINGLE from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionSINGLE.js";
import { BaseService } from "./../../../../App/index.js";
import { DropDownList } from "./../../../../Components/index.js";

class CategoryOptionTempMapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.getCategoryOptionsTypeQuery = [];
        this.state.validation = [];
        this.state.type = {};
        this.state.catOption = Object.assign(
            new CategoryOptionsDTO(),
            props.catOptions.catOptions.filter((item) => {
                return item.id == this.props.item.id;
            })[0]
        );
        if (!this.state.catOption.cat_opt) {
            this.state.catOption.cat_opt = {};
        }
    }

    componentDidMount() {
        this.props.getCategoryOptionsType().then((succ) => {
            this.setState({
                getCategoryOptionsTypeQuery: succ.data
            });
        });
    }
    getDropDownValues() {
        const result = this.state.getCategoryOptionsTypeQuery.map((item) => {
            return { id: item.id, value: item.name, type: item.type };
        });
        return [{ id: undefined, value: "", type: undefined }, ...result];
    }
    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                //          this.validation();
            });
        }
    }

    validation() {
        const validation = DictionaryDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);
        });
        this.setState({
            validation: validation
        });
        return validation;
    }

  
    typeHandler(event) {
        const catOption = this.state.catOption;
        catOption.cat_opt.id = event.target.value;
        this.setState({
            catOption: catOption
        });

        this.refreshValidation();
    }

    checkType(catType) {
        return this.state.getCategoryOptionsTypeQuery.filter((item) => {
            return item.type == catType && item.id == this.state.catOption.cat_opt.id;
        });
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        return (
            <Collapsible
                triggerOpenedClassName={
                    this.props.item.category_id != undefined &&
                    this.props.item.category_id != this.props.category_id
                        ? "Collapsible__trigger_options"
                        : ""
                }
                triggerClassName={
                    this.props.item.category_id != undefined &&
                    this.props.item.category_id != this.props.category_id
                        ? "Collapsible__trigger_options"
                        : ""
                }
                trigger={
                    this.props.item["name_" + this.props.lang]
                        ? `${this.props.item["name_" + this.props.lang]} (${
                              this.props.item.cat_opt.name
                          })`
                        : tran.translate("NEW_OPTION")
                }
            >
                <Container className="g-ma-10">
                    <DropDownList
                        isRequired={true}
                        label={tran.translate("CATEGORY_TEMP_OPTION_TYPE_LABEL")}
                        onChange={this.typeHandler.bind(this)}
                        valueOptions={this.getDropDownValues()}
                        disabled={this.state.catOption.cat_opt.id}
                        value={this.state.catOption.cat_opt.id}
                        field="type"
                        validation={this.state.validation}
                    />
                    {this.state.catOption.cat_opt.id ? (
                        this.checkType("SELECT").length > 0 ? (
                            <span>
                                <CategoryOptionSELECT
                                    catOptionsTemp={this.checkType("SELECT")[0]}
                                    category_id={this.props.category_id}
                                    catOption={
                                        this.props.catOptions.catOptions.filter((item) => {
                                            return item.id == this.props.item.id;
                                        })[0]
                                    }
                                ></CategoryOptionSELECT>
                            </span>
                        ) : this.checkType("MULTI_SELECT").length > 0 ? (
                            <span>
                                <CategoryOptionSELECT
                                    catOptionsTemp={this.checkType("MULTI_SELECT")[0]}
                                    category_id={this.props.category_id}
                                    catOption={
                                        this.props.catOptions.catOptions.filter((item) => {
                                            return item.id == this.props.item.id;
                                        })[0]
                                    }
                                ></CategoryOptionSELECT>
                            </span>
                        ) : this.checkType("SINGLE").length > 0 ? (
                            <span>
                                <CategoryOptionSINGLE
                                    catOptionsTemp={this.checkType("SINGLE")[0]}
                                    category_id={this.props.category_id}
                                    catOption={
                                        this.props.catOptions.catOptions.filter((item) => {
                                            return item.id == this.props.item.id;
                                        })[0]
                                    }
                                ></CategoryOptionSINGLE>
                            </span>
                        ) : this.checkType("BETWEEN").length > 0 ? (
                            <span>
                                <CategoryOptionBETWEEN
                                    catOptionsTemp={this.checkType("BETWEEN")[0]}
                                    category_id={this.props.category_id}
                                    catOption={
                                        this.props.catOptions.catOptions.filter((item) => {
                                            return item.id == this.props.item.id;
                                        })[0]
                                    }
                                ></CategoryOptionBETWEEN>
                            </span>
                        ) : this.checkType("GEOCOORDINATE").length > 0 ? (
                            <span>
                                <CategoryOptionGEO
                                    catOptionsTemp={this.checkType("GEOCOORDINATE")[0]}
                                    category_id={this.props.category_id}
                                    catOption={
                                        this.props.catOptions.catOptions.filter((item) => {
                                            return item.id == this.props.item.id;
                                        })[0]
                                    }
                                ></CategoryOptionGEO>
                            </span>
                        ) : this.checkType("IMAGES").length > 0 ? (
                            <span>
                                <CategoryOptionIMAGE
                                    catOptionsTemp={this.checkType("IMAGES")[0]}
                                    category_id={this.props.category_id}
                                    catOption={
                                        this.props.catOptions.catOptions.filter((item) => {
                                            return item.id == this.props.item.id;
                                        })[0]
                                    }
                                ></CategoryOptionIMAGE>
                            </span>
                        ) : (
                            <span></span>
                        )
                    ) : (
                        <span></span>
                    )}
                </Container>
            </Collapsible>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        catOptions: state.EditCategoryReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryOptionsType: () => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {})
            );
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionTempMapper);
