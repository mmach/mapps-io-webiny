/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import CategoryOptionFormGEO from '../CategoryOptionTypes/FORM/CategoryOptionFormGEO.jsx';
import CategoryOptionFormIMAGE from '../CategoryOptionTypes/FORM/CategoryOptionFormIMAGE.jsx';
import CategoryOptionFormMULTISELECT from '../CategoryOptionTypes/FORM/CategoryOptionFormMULTISELECT.jsx';
import CategoryOptionFormSELECT from '../CategoryOptionTypes/FORM/CategoryOptionFormSELECT.jsx';
import CategoryOptionFormSINGLE from '../CategoryOptionTypes/FORM/CategoryOptionFormSINGLE.jsx';
import { Translator, QueryList } from 'justshare-shared';
import { BaseService } from 'mapps-io-base-plugins/src/App/index.js';
import CategoryOptionFormSINGLE_DEPENDENCY from '../CategoryOptionTypes/FORM/CategoryOptionFormSINGLE_DEPENDENCY.jsx';


class CategoryOptionTempFormMapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.getCategoryOptionsTypeQuery = props.getCategoryOptionsTypeQuery;


    }


    getDropDownValues() {
        return this.state.getCategoryOptionsTypeQuery.map(item => {
            return { id: item.id, value: item.name, type: item.type };
        });
    }





    checkType(catType) {
        return this.state.getCategoryOptionsTypeQuery.filter(item => {
            return (item.type == catType && (item.id == this.props.catOption.cot_id));

        });
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        return (

            <div>
                {this.checkType('SELECT').length > 0 ? <div>< CategoryOptionFormSELECT options={this.props.options} itemCategories={this.props.itemCategories} optionValue={this.props.optionValue} onChange={this.props.onChange} catOptionsTemp={this.checkType('SELECT')[0]} category_id={this.props.category_id} catOption={this.props.catOption}></CategoryOptionFormSELECT></div> :
                    this.checkType('MULTI_SELECT').length > 0 ? <div><CategoryOptionFormMULTISELECT options={this.props.options} itemCategories={this.props.itemCategories} optionValue={this.props.optionValue} onChange={this.props.onChange} catOptionsTemp={this.checkType('MULTI_SELECT')[0]} category_id={this.props.category_id} catOption={this.props.catOption}></CategoryOptionFormMULTISELECT></div> :
                        this.checkType('SINGLE').length > 0 ? <div><CategoryOptionFormSINGLE options={this.props.options} itemCategories={this.props.itemCategories} optionValue={this.props.optionValue} onChange={this.props.onChange} catOptionsTemp={this.checkType('SINGLE')[0]} category_id={this.props.category_id} catOption={this.props.catOption}></CategoryOptionFormSINGLE></div> :
                            this.checkType('IMAGES').length > 0 ? <div><CategoryOptionFormIMAGE options={this.props.options} itemCategories={this.props.itemCategories} optionValue={this.props.optionValue} onChange={this.props.onChange} catOptionsTemp={this.checkType('IMAGES')[0]} category_id={this.props.category_id} catOption={this.props.catOption}></CategoryOptionFormIMAGE></div> :
                                this.checkType('GEOCOORDINATE').length > 0 ? <div><CategoryOptionFormGEO options={this.props.options} itemCategories={this.props.itemCategories} optionValue={this.props.optionValue} categoryIcon={this.props.categoryIcon} onChange={this.props.onChange} catOptionsTemp={this.checkType('GEOCOORDINATE')[0]} category_id={this.props.category_id} catOption={this.props.catOption}></CategoryOptionFormGEO></div> :
                                    this.checkType('SINGLE_DEPENDENCY').length > 0 ? <div><CategoryOptionFormSINGLE_DEPENDENCY options={this.props.options} itemCategories={this.props.itemCategories} optionValue={this.props.optionValue} categoryIcon={this.props.categoryIcon} onChange={this.props.onChange} catOptionsTemp={this.checkType('SINGLE_DEPENDENCY')[0]} category_id={this.props.category_id} catOption={this.props.catOption}></CategoryOptionFormSINGLE_DEPENDENCY></div> :

                                        //        this.checkType('SINGLE').length > 0 ? <span><CategoryOptionSINGLE catOptionsTemp={this.checkType('SINGLE')[0]} category_id={this.props.category_id} catOption={this.props.catOptions}></CategoryOptionSINGLE></span> :
                                        //           this.checkType('BETWEEN').length > 0 ? <span><CategoryOptionBETWEEN catOptionsTemp={this.checkType('BETWEEN')[0]} category_id={this.props.category_id} catOption={this.props.catOptions}></CategoryOptionBETWEEN></span> :

                                        <span></span>
                }

            </div>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        // catOptions: state.EditCategoryReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryOptionsType: (id) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {}));
        }



    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionTempFormMapper);

