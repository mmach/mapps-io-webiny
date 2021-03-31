/*
    ./client/components/App.js
*/

import React from "react";
import { connect } from "react-redux";
import CategoryOptionFormGEO from "./CategoryOptionTypes/FORM/CategoryOptionFormGEO.js";
import CategoryOptionFormImage from "./CategoryOptionTypes/FORM/CategoryOptionFormIMAGE.js";
import CategoryOptionFormMULTISELECT from "./CategoryOptionTypes/FORM/CategoryOptionFormMULTISELECT.js";
import CategoryOptionFormSELECT from "./CategoryOptionTypes/FORM/CategoryOptionFormSELECT.js";
import CategoryOptionFormSINGLE from "./CategoryOptionTypes/FORM/CategoryOptionFormSINGLE.js";
import CategoryOptionFormSingleDependencies from "./CategoryOptionTypes/FORM/CategoryOptionFormSINGLE_DEPENDENCY.js";

class CategoryOptionTempFormMapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.getCategoryOptionsTypeQuery = props.getCategoryOptionsTypeQuery;
  }

  getDropDownValues() {
    return this.props.getCategoryOptionsTypeQuery.map((item) => {
      return { id: item.id, value: item.name, type: item.type };
    });
  }

  checkType(catType) {
    return this.props.getCategoryOptionsTypeQuery.filter((item) => {
      return item.type == catType && item.id == this.props.catOption.cot_id;
    });
  }
  render() {
    return (
      <div>
        {this.checkType("SELECT").length > 0 ? (
          <div>
            <CategoryOptionFormSELECT
              options={this.props.options}
              itemCategories={this.props.itemCategories}
              optionValue={this.props.optionValue}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("SELECT")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormSELECT>
          </div>
        ) : this.checkType("MULTI_SELECT").length > 0 ? (
          <div>
            <CategoryOptionFormMULTISELECT
              options={this.props.options}
              itemCategories={this.props.itemCategories}
              optionValue={this.props.optionValue}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("MULTI_SELECT")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormMULTISELECT>
          </div>
        ) : this.checkType("SINGLE").length > 0 ? (
          <div>
            <CategoryOptionFormSINGLE
              options={this.props.options}
              itemCategories={this.props.itemCategories}
              optionValue={this.props.optionValue}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("SINGLE")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormSINGLE>
          </div>
        ) : this.checkType("GEOCOORDINATE").length > 0 ? (
          <div>
            <CategoryOptionFormGEO
              element={this.props.element}
              options={this.props.options}
              itemCategories={this.props.itemCategories}
              optionValue={this.props.optionValue}
              categoryIcon={this.props.categoryIcon}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("GEOCOORDINATE")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormGEO>
          </div>
        ) : this.checkType("SINGLE_DEPENDENCY").length > 0 ? (
          <div>
            <CategoryOptionFormSingleDependencies
              options={this.props.options}
              itemCategories={this.props.itemCategories}
              optionValue={this.props.optionValue}
              categoryIcon={this.props.categoryIcon}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("SINGLE_DEPENDENCY")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormSingleDependencies>
          </div>
        )  : this.checkType("IMAGES").length > 0 ? (
          <div>
            <CategoryOptionFormImage
              options={this.props.options}
              itemCategories={this.props.itemCategories}
              optionValue={this.props.optionValue}
              categoryIcon={this.props.categoryIcon}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("IMAGES")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormImage>
          </div>
        ) : (

          
          //        this.checkType('SINGLE').length > 0 ? <span><CategoryOptionSINGLE catOptionsTemp={this.checkType('SINGLE')[0]} category_id={this.props.category_id} catOption={this.props.catOptions}></CategoryOptionSINGLE></span> :
          //           this.checkType('BETWEEN').length > 0 ? <span><CategoryOptionBETWEEN catOptionsTemp={this.checkType('BETWEEN')[0]} category_id={this.props.category_id} catOption={this.props.catOptions}></CategoryOptionBETWEEN></span> :

          <span></span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
    // catOptions: state.EditCategoryReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(CategoryOptionTempFormMapper));

/* : this.checkType("IMAGES").length > 0 ? (
          <div>
            <CategoryOptionFormImage
              options={this.props.options}
              itemCategories={this.props.itemCategories}
              optionValue={this.props.optionValue}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("IMAGES")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormImage>
          </div>
        ) :*/
