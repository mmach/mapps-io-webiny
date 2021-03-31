import { CategoryOptionsDTO, CommandList, Translator, QueryList } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { MODAL_ACTIONS } from "mapps-io-base-plugins/src/Components/index.js";
import CATEGORY_EDIT_ACTIONS from "./../../../Scenes/EditCategory/actions.js";
import CategoryOptionBase from "./CategoryOptionBase";
import CategoryOptionsForm from "./CategoryOptionForm";
import CategoryOptionSingleDependencySingle from "./CategoryOptionSINGLE_DEPENDENCY_SINGLE";

class CategoryOptionBETWEEN extends CategoryOptionBase {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    this.state.toRefresh = false;
    this.state.type = {};
    this.state.catOption = Object.assign(new CategoryOptionsDTO(), this.props.catOption);
    this.state.catOption.cot_id = this.props.catOptionsTemp.id;
    this.state.catOption.category_id = this.state.catOption.category_id
      ? this.state.catOption.category_id
      : this.props.category_id;
    this.state.catOption.order = this.state.catOption.order ? this.state.catOption.order : 1;

    this.state.catOption.cat_opt = this.state.catOption.cat_opt ? this.state.catOption.cat_opt : {};
    this.state.isSubmitLoading = false;
    this.state.isDeleteLoadingg = false;
    this.state.cott_id = this.props.catOptionsTemp.cat_options_type_temp[0].id;
    this.state.cott_type = this.props.catOptionsTemp.cat_options_type_temp[0].type;
    if (
      this.props.catOption.cat_opt_temp == undefined ||
      this.props.catOption.cat_opt_temp.length == 0
    ) {
      this.props.addEmptyElementOption(uuid(), this.state.catOption.id, 1, "ORDER 1");
      this.props.addEmptyElementOption(uuid(), this.state.catOption.id, 2, "ORDER 2");
    }
  }

  openModal(event) {
    const item = this.props.catOption.cat_opt_temp.filter(
      (i) => i.id == event.currentTarget.dataset.key
    )[0];
    this.props.openModal(
      true,
      <CategoryOptionSingleDependencySingle
        catSingleOption={item}
        coId={this.state.catOption.id}
        cottId={item.cott_id}
        type={this.state.cott_type}
        catOptId={this.state.catOption.id}
      ></CategoryOptionSingleDependencySingle>
    );
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    return (
      <CategoryOptionsForm
        {...this.props}
        catOption={this.state.catOption}
        refreshValidation={this.refreshValidation.bind(this)}
        setState={this.setState.bind(this)}
        validation={this.state.validation}
        getDropDownValues={this.getDropDownValues.bind(this)}
        dimHandler={this.dimHandler.bind(this)}
        translateSubmit={this.translateSubmit.bind(this)}
        submitHanlder={this.submitHanlder.bind(this)}
        isSubmitLoading={this.state.isSubmitLoading}
        category_id={this.props.category_id}
        cott_type={this.state.cott_type}
        tran={tran}
        phTrans={phTrans}
        openModal={this.openModal.bind(this)}
      ></CategoryOptionsForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    catOptions: state.EditCategoryReducer,
    config: state.ConfigReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertCategoryOptions: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS, dto)
      );
    },
    deleteCategoryOptions: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS, dto)
      );
    },
    toTranslate: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Languages.TRANSLATE, dto));
    },
    getCategoryOptions: (dto) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS, dto)
      );
    },
    addEmptyElementOption: (id, co_id, order, name) => {
      dispatch({
        type: CATEGORY_EDIT_ACTIONS.ADD_EMPTY_OPTION_ELEMENT,
        dto: {
          id: id,
          co_id: co_id,
          order: order,
          placeholder: name
        }
      });
    },
    openModal: (open, body) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          body: body
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryOptionBETWEEN));
