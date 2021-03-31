/*
    ./client/components/App.jsx
*/

import { QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import CategoryOptionFormGEO from "../CategoryOptionTypes/FORM/CategoryOptionFormGEO.js";
import CategoryOptionFormIMAGE from "../CategoryOptionTypes/FORM/CategoryOptionFormIMAGE.js";
import CategoryOptionSearchMULTISELECT from "../CategoryOptionTypes/SEARCH/CategoryOptionSearchMULTISELECT.js";
import CategoryOptionSearchNOT_BETWEEN from "../CategoryOptionTypes/SEARCH/CategoryOptionSearchNOT_BETWEEN.js";
import CategoryOptionSearchSELECT from "../CategoryOptionTypes/SEARCH/CategoryOptionSearchSELECT.js";
import CategoryOptionSearchSINGLE from "../CategoryOptionTypes/SEARCH/CategoryOptionSearchSINGLE.js";
import CategoryOptionSearchSINGLE_DEP from "../CategoryOptionTypes/SEARCH/CategoryOptionSearchSINGLE_DEP.js";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";

class CategoryOptionSearchMapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.getCategoryOptionsTypeQuery = this.props.getCategoryOptionsTypeQuery;
  }

  getDropDownValues() {
    return this.state.getCategoryOptionsTypeQuery.map((item) => {
      return { id: item.id, value: item.name, type: item.type };
    });
  }

  checkType(catType) {
    return this.state.getCategoryOptionsTypeQuery.filter((item) => {
      return item.type == catType && item.id == this.props.catOption.cot_id;
    });
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    return (
      <div>
        {this.checkType("SELECT").length > 0 && (
          <div>
            <CategoryOptionSearchSELECT
              aggs={this.props.aggs}
              optionFilter={this.props.optionFilter}
              catOptionId={this.props.cat_option_id}
              onChange={this.props.onChange}
              catOptions={this.props.catOptions}
              catOptionsTemp={this.checkType("SELECT")[0]}
            ></CategoryOptionSearchSELECT>
          </div>
        )}
        {this.checkType("MULTI_SELECT").length > 0 && (
          <div>
            <CategoryOptionSearchMULTISELECT
              aggs={this.props.aggs}
              optionFilter={this.props.optionFilter}
              catOptionId={this.props.cat_option_id}
              onChange={this.props.onChange}
              catOptions={this.props.catOptions}
              catOptionsTemp={this.checkType("MULTI_SELECT")[0]}
            ></CategoryOptionSearchMULTISELECT>
          </div>
        )}
        {this.checkType("SINGLE").length > 0 && (
          <div>
            <CategoryOptionSearchSINGLE
              onReset={this.props.onReset}
              aggs={this.props.aggs}
              optionFilter={this.props.optionFilter}
              catOptionId={this.props.cat_option_id}
              onChange={this.props.onChange}
              catOptions={this.props.catOptions}
              catOptionsTemp={this.checkType("SINGLE")[0]}
            ></CategoryOptionSearchSINGLE>
          </div>
        )}
        {this.checkType("IMAGES").length > 0 && (
          <div>
            <CategoryOptionFormIMAGE
              optionValue={this.props.optionValue}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("IMAGES")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormIMAGE>
          </div>
        )}
        {this.checkType("GEOCOORDINATE").length > 0 && (
          <div>
            <CategoryOptionFormGEO
              optionValue={this.props.optionValue}
              categoryIcon={this.props.categoryIcon}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("GEOCOORDINATE")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionFormGEO>
          </div>
        )}
        {this.checkType("NOT_BETWEEN").length > 0 && (
          <div>
            <CategoryOptionSearchNOT_BETWEEN
              optionValue={this.props.optionValue}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("NOT_BETWEEN")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
              optionFilter={this.props.optionFilter}
              catOptionId={this.props.cat_option_id}
            ></CategoryOptionSearchNOT_BETWEEN>
          </div>
        )}
        {this.checkType("MONEY").length > 0 && (
          <div>
            <CategoryOptionSearchSINGLE
              optionValue={this.props.optionValue}
              categoryIcon={this.props.categoryIcon}
              onChange={this.props.onChange}
              catOptionsTemp={this.checkType("GEOCOORDINATE")[0]}
              category_id={this.props.category_id}
              catOption={this.props.catOption}
            ></CategoryOptionSearchSINGLE>
          </div>
        )}

        {this.checkType("SINGLE_DEPENDENCY").length > 0 && (
          <div>
            <CategoryOptionSearchSINGLE_DEP
              onReset={this.props.onReset}
              aggs={this.props.aggs}
              optionFilter={this.props.optionFilter}
              catOptionId={this.props.cat_option_id}
              onChange={this.props.onChange}
              catOptions={this.props.catOptions}
              catOptionsTemp={this.checkType("SINGLE_DEPENDENCY")[0]}
            ></CategoryOptionSearchSINGLE_DEP>
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryOptionsType: (id) => {
      return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionSearchMapper);
