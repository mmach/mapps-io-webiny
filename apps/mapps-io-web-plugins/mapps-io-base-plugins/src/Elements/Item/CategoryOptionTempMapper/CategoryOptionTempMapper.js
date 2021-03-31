/*
    ./client/components/App.js
*/
import React from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Col, Container } from 'reactstrap';
import uuidv4 from "uuid/v4";
import CATEGORY_EDIT_ACTIONS from "../../Scenes/EditCategory/actions.js";
import CategoryOptionBETWEEN from '../CategoryOptionTypes/CREATE_EDIT/CategoryOptionBETWEEN.js';
import CategoryOptionGEO from '../CategoryOptionTypes/CREATE_EDIT/CategoryOptionGEO.js';
import CategoryOptionIMAGE from '../CategoryOptionTypes/CREATE_EDIT/CategoryOptionIMAGE.js';
import CategoryOptionSELECT from '../CategoryOptionTypes/CREATE_EDIT/CategoryOptionSELECT.js';
import CategoryOptionSINGLE from '../CategoryOptionTypes/CREATE_EDIT/CategoryOptionSINGLE.js';
import { DictionaryDTO, Translator, QueryList, CategoryOptionsDTO } from 'justshare-shared';
import { BaseService } from './../../../../App/index.js';
import { DropDownList } from './../../../../Components/index.js';
import CategoryOptionNOT_BETWEEN from '../CategoryOptionTypes/CREATE_EDIT/CategoryOptionNOT_BETWEEN.js';
import CategoryOptionSINGLE_DEPENDENCY from '../CategoryOptionTypes/CREATE_EDIT/CategoryOptionSINGLE_DEPENDENCY.js';


class CategoryOptionTempMapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.getCategoryOptionsTypeQuery = [];
        this.state.validation = [];
        this.state.type = {};
        const id = uuidv4();
        this.props.addEmptyElement(id);
        this.state.id = id;
        this.state.loading = false;
        this.state.catOption = Object.assign(new CategoryOptionsDTO(), props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]);
        if (!this.state.catOption.cat_opt) {
            this.state.catOption.cat_opt = {};
        }
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id != nextProps.match.params.id && nextProps.match.params.id != 'new') {
            this.setState({
                loading: true
            });
            this.props.getCategoryOption(nextProps.match.params.id).then(succ => {
                this.props.cleanEmptyElement();
                this.props.addEmptyElement(succ.data[0].id);
                this.props.editEmptyElement(succ.data[0]);
                this.setState({
                    catOption: succ.data[0],
                    id: succ.data[0].id,
                    loading: false
                });

            });
        }

    }

    componentDidMount() {

        if (this.props.match.params.id != 'new') {

            this.setState({
                loading: true
            });
            this.props.getCategoryOption(this.props.match.params.id).then(succ => {
                this.props.cleanEmptyElement();

                this.props.addEmptyElement(succ.data[0].id);
                this.props.editEmptyElement(succ.data[0]);
                this.setState({
                    catOption: succ.data[0],
                    id: succ.data[0].id,
                    loading: false

                });

            });
        }
        this.props.getCategoryOptionsType().then(succ => {
            this.setState(
                {
                    getCategoryOptionsTypeQuery: succ.data,
                }
            );

        });



    }
    getDropDownValues() {
        const result = this.state.getCategoryOptionsTypeQuery.map(item => {
            return { id: item.id, value: item.name, type: item.type };
        });
        return [{ id: undefined, value: '', type: undefined }, ...result];

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
        const co = this.state.getCategoryOptionsTypeQuery.filter(item => {
            return catOption.cat_opt.id == item.id;
        });

        catOption.cat_opt = co[0];
        this.props.editEmptyElement(catOption);

        this.setState({
            catOption: catOption
        });
        this.refreshValidation();

    }

    checkType(catType) {
        return this.state.getCategoryOptionsTypeQuery.filter(item => {
            return (item.type == catType && (item.id == this.state.catOption.cat_opt.id));

        });
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        if (this.state.loading == true) {
            return <span></span>;
        }
        try{
        return (

            <Container className="g-ma-10">
                <Col className="text-center mx-auto g-max-width-600 g-mb-10">
                    <h2 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-400 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('CATEGORY_OPTION_ADD_HEADER')}</h2>
                    <br />
                    <label className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">{tran.translate('CATEGORY_OPTION_ADD_HEADER_TEXT')}</label>
                </Col>
                {(this.state.catOption.category_link != undefined && this.state.catOption.category_link.length > 0) ?
                    <Col className="g-mb-50">
                        <Collapsible trigger={tran.translate('SHOW_DEPENDENCIES_CATEGORIES') + " - " + this.state.catOption.category_link.length} >
                            <div>
                                {this.state.catOption.category_link.map((item,index) => {
                                    return <Link key={index} to={"/categories/edit/" + item.category_id} className="g-font-size-11 col-md-11 col-xs-11 g-color-primary--hover nav-link">{item.category["category_" + this.props.lang]}</Link>;

                                })}
                            </div>
                        </Collapsible>
                    </Col>
                    : <span></span>}
                <DropDownList isRequired={true} label={tran.translate('CATEGORY_TEMP_OPTION_TYPE_LABEL')} onChange={this.typeHandler.bind(this)} valueOptions={this.getDropDownValues()} disabled={this.state.catOption.cat_opt.id} value={this.state.catOption.cat_opt.id} field="type" validation={this.state.validation} />
                {this.state.catOption.cat_opt.id ? <div>
                    {this.checkType('SELECT').length > 0 && <div><CategoryOptionSELECT catOptionsTemp={this.checkType('SELECT')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionSELECT></div>}
                    {this.checkType('MULTI_SELECT').length > 0 && <div><CategoryOptionSELECT catOptionsTemp={this.checkType('MULTI_SELECT')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionSELECT></div>}
                    {this.checkType('SINGLE').length > 0 && <div><CategoryOptionSINGLE catOptionsTemp={this.checkType('SINGLE')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionSINGLE></div>}
                    {this.checkType('BETWEEN').length > 0 && <div><CategoryOptionBETWEEN catOptionsTemp={this.checkType('BETWEEN')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionBETWEEN></div>}
                    {this.checkType('GEOCOORDINATE').length > 0 && <div><CategoryOptionGEO catOptionsTemp={this.checkType('GEOCOORDINATE')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionGEO></div>}
                    {this.checkType('IMAGES').length > 0 && <div><CategoryOptionIMAGE catOptionsTemp={this.checkType('IMAGES')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionIMAGE></div>}
                    {this.checkType('SINGLE_DEPENDENCY').length > 0 && <div><CategoryOptionSINGLE_DEPENDENCY catOptionsTemp={this.checkType('SINGLE_DEPENDENCY')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionSINGLE_DEPENDENCY></div>}
                    {this.checkType('NOT_BETWEEN').length > 0 && <div><CategoryOptionNOT_BETWEEN catOptionsTemp={this.checkType('NOT_BETWEEN')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionNOT_BETWEEN></div>}
                    {this.checkType('CASE').length > 0 && <div><CategoryOptionSELECT catOptionsTemp={this.checkType('CASE')[0]} catOption={this.props.catOptions.catOptions.filter(item => { return item.id == this.state.id; })[0]}></CategoryOptionSELECT></div>}

                </div>
                    : <span></span>
                }
            </Container>
        );
            }catch(err)
            {
                // eslint-disable-next-line no-console
                console.log(err);
            }
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
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {}));
        },
        addEmptyElement: (id) => {
            dispatch({
                type: CATEGORY_EDIT_ACTIONS.ADD_EMPTY_OPTION, dto: {
                    id: id
                }
            });

        },
        editEmptyElement: (dto) => {
            dispatch({
                type: CATEGORY_EDIT_ACTIONS.UPDATE_EMPTY_ELEMENT, dto: dto
            });

        },
        cleanEmptyElement: (dto) => {
            dispatch({
                type: CATEGORY_EDIT_ACTIONS.CLEAN, dto: dto
            });

        },
        getCategoryOption: (id) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS, { id: id }));
        }




    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)
    (CategoryOptionTempMapper));

