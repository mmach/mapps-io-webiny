import { QueryList } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "../../../../../App/Architecture/baseServices.js";
import DropDownList from "../../../../../Components/FormComponent/Components/DropDownList/index.js";

class CategoryOptionFormSELECT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    this.state.id = this.props.values ? this.props.values : {};
    this.state.catOption =
      this.props.optionValue != undefined && this.props.optionValue.length > 0
        ? this.props.optionValue.map((item) => {
            item.val = item.val;
            return item;
          })
        : [
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "SELECT",
              col_id: this.props.catOption.category_link[0].id,
              catOption: this.props.catOption.cat_opt_temp[0],
              dim_id: this.props.catOption.dim_id,
              co_temp_id:this.props.catOption.cat_opt_temp[0].id
            }
          ];
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.itemCategories || !this.props.itemCategories) {
      return true;
    }
    const curr = this.props.itemCategories.filter((i) => i.co_id == this.props.catOption.id)[0];
    const nextClick = nextProps.itemCategories.filter((i) => i.co_id == this.props.catOption.id)[0];

    if (curr != nextClick || (nextClick && curr && curr.val != nextClick.val)) {
      return true;
    }
    return false;
  }

  onChange(event) {
    const val = this.props.catOption.cat_opt_temp.filter((item) => {
      return item.id == event.target.value;
    });
    const obj = { ...this.state.catOption[0], cat_opt_id: val[0].id, val: val[0].id, select: val[0] };
    this.setState({
      id: val[0].id,
      catOption: [obj]
    });
    this.props.onChange(this.props.catOption, [obj]);
  }
  getDropDownValues() {
    return [
      { id: "", value: "", type: "" },
      ...this.props.catOption.cat_opt_temp.map((item) => {
        return {
          id: item.id,
          value: item["value_" + this.props.lang],
          type: item["value_" + this.props.lang]
        };
      })
    ];
  }

  render() {
    const link = this.props.catOption.category_link[0];

    return (
      <DropDownList
        isRequired={link.is_require ? link.is_require : this.props.catOption.is_require}
        label={this.props.catOption["name_" + this.props.lang]}
        valueOptions={this.getDropDownValues.bind(this)()}
        value={this.state.catOption[0].val}
        onChange={this.onChange.bind(this)} //this.typeHandler.bind(this)}
        validation={this.state.validation}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
    //  catOptions: state.EditCategoryReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReverseGeocode: (query) => {
      return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_GEO, { query: query }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionFormSELECT);
