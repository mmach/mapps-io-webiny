import InputAdornment from "@material-ui/core/InputAdornment";
import { isDIM, ONP } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { isUuid, uuid } from "uuidv4";
import { TextBox } from "../../../../../Components/index.js";


const dimensionMatch = function (dim_id, dimensions, catOptions, itemOptions, co) {
  const dim = dimensions.filter((item) => {
    return item.id == dim_id;
  })[0];
  if (!dim) {
    return;
  }

  const ref = itemOptions.filter((item) => {
    return item.dim_id == dim_id;
  })[0];
  if (ref) {
    return {
      cat_opt_id: co.cat_opt_id,
      co_id: co.co_id,
      col_id: co.col_id,
      element: co.co_id,
      id: co.id ? co.id : uuid(),
      select: ref.select,
      type: "SINGLE_DEPENDENCY",
      val: ref.cat_opt_id,
      catOption: co.catOption,
      dim_id: co.catOption.dim_id,
      co_temp_id: co.cat_opt_id
    };
  }
};

const getValuesInDep = function (co, dimensions, itemCategories) {
  let results = [];
  co.forEach((item) => {
    if (item.catOption.dim_ref_id) {
      const dm = dimensionMatch(item.catOption.dim_ref_id, dimensions, null, itemCategories, item);
      item = dm ? dm : item;
      results = [...results, item];
    }
    if (item.catOption.func) {
      let dims = Array.from(new Set(item.catOption.func.match(/(#|#\$)\w*#/g)));
      dims = dims
        .filter((i) => {
          return isDIM(i);
        })
        .map((d) => {
          return d.replace(/#/g, "").replace("$", "");
        });
      dims = dims.map((d) => {
        const dimMatched = dimensions.filter((dim) => {
          return dim.name == d;
        })[0];
        const dim = dimensionMatch(dimMatched.id, dimensions, null, itemCategories, item);

        if (dim && isUuid(dim.val) && dim.val != dim.cat_opt_id) {
          const val = itemCategories.filter((ic) => {
            return ic.cat_opt_id == dim.val;
          })[0];
          if (val) {
            dim.val = val.val;
          }
        }

        return {
          dim_id: dim && dim.id,
          name: d,
          val: dim && dim.val,
          catOption: dim && dim.catOption
        };
      });
      results = [...results, ...dims];
      // return dims
    }
  });
  return results;
};

class CategoryOptionFormSingleDependencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    this.state.dataValue = null;
    this.state.id = this.props.values ? this.props.values : {};
    this.state.func = "";
    this.state.timeout = null;
    this.state.catOption =
      this.props.optionValue != undefined && this.props.optionValue.length > 0
        ? this.props.optionValue
        : [
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "SINGLE_DEPENDENCY",
              col_id: this.props.catOption.category_link[0].id,
              catOption: this.props.catOption.cat_opt_temp[0],
              dim_id: this.props.catOption.cat_opt_temp[0].dim_id,
              co_temp_id: this.props.catOption.cat_opt_temp[0].id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp[1].id,
              val: "",
              element: this.props.catOption.id,
              type: "SINGLE_DEPENDENCY",
              col_id: this.props.catOption.category_link[0].id,
              catOption: this.props.catOption.cat_opt_temp[1],
              dim_id: this.props.catOption.cat_opt_temp[1].dim_id,
              co_temp_id: this.props.catOption.cat_opt_temp[1].id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp[2].id,
              val: "",
              element: this.props.catOption.id,
              type: "SINGLE_DEPENDENCY",
              col_id: this.props.catOption.category_link[0].id,
              catOption: this.props.catOption.cat_opt_temp[2],
              dim_id: this.props.catOption.cat_opt_temp[2].dim_id,
              co_temp_id: this.props.catOption.cat_opt_temp[2].id
            }
          ];
  }

  shouldComponentUpdate(next, nextState) {
    const matched = getValuesInDep(
      this.state.catOption,
      this.props.config.dimensions,
      next.itemCategories
    );

    if (
      this.props.itemCategories.filter((item) => {
        const itemMatched = next.itemCategories.filter((item2) => {
          return item.id == item2.id && item.col_id == this.props.catOption.category_link[0].id;
        })[0];
        return itemMatched && itemMatched.val == item.val;
      }).length !=
      this.props.itemCategories.filter((item) => {
        return item.col_id == this.props.catOption.category_link[0].id;
      }).length
    ) {
      return true;
    } else if (this.state.catOption != nextState.catOption) {
      return true;
    } else if (
      getValuesInDep(
        this.state.catOption,
        this.props.config.dimensions,
        this.props.itemCategories
      ).filter((i) => {
        return (
          matched.filter((m) => {
            return i.catOption && m.catOption && i.catOption.id == m.catOption.id && i.val != m.val;
          }).length > 0
        );
      }).length > 0
    ) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prev, prevState) {
    if (this.state.catOption != prevState.catOption) {
      return;
    }
    this.sync();
  }

  onChange(event) {
    const val = this.state.catOption;
    val[0].val = event.target.value;
    this.setState({
      catOption: [...val]
    });
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    const timeout = setTimeout(() => {
      this.setState({
        timeout: null
      });
      this.sync();
    }, 1000);
    this.setState({
      timeout: timeout
    });
  }

  sync() {
    const catOption = this.state.catOption.map((item) => {
      if (item.catOption.dim_ref_id) {
        const dm = dimensionMatch(
          item.catOption.dim_ref_id,
          this.props.config.dimensions,
          this.props.options,
          this.props.itemCategories,
          item
        );
        item = dm ? dm : item;
      }
      if (item.catOption.func) {
        let dims = Array.from(new Set(item.catOption.func.match(/(#|#\$)\w*#/g)));
        let func = item.catOption.func;
        dims = dims
          .filter((i) => {
            return isDIM(i);
          })
          .map((d) => {
            return d.replace(/#/g, "").replace("$", "");
          });
        dims = dims.map((d) => {
          const dimMatched = this.props.config.dimensions.filter((dim) => {
            return dim.name == d;
          })[0];
          const dim = dimensionMatch(
            dimMatched.id,
            this.props.config.dimensions,
            this.props.options,
            this.props.itemCategories,
            item
          );
          if (dim && isUuid(dim.val) && dim.val != dim.cat_opt_id) {
            const val = this.props.itemCategories.filter((ic) => {
              return ic.cat_opt_id == dim.val;
            })[0];
            if (val) {
              dim.val = val.val;
            }
          }
          return { name: d, val: dim && dim.val };
        });
        dims.forEach((d) => {
          func = func.split("#$" + d.name + "#").join("#" + d.val + "#");
        });
        this.setState({
          func: func
        });
        item.val = Math.round(ONP(func) * 100) / 100;
      }
      return item;
    });
    this.setState({
      catOption: [...catOption]
    });
    this.props.onChange(this.props.catOption, [
      ...catOption.map((item) => {
        return { ...item };
      })
    ]);
  }
  dateHandler(event) {
    this.setState({
      dataValue: event
    });

    this.props.onChange(this.props.catOption, [
      {
        id: uuid(),
        cat_opt_id: this.props.catOption.cat_opt_temp[0].id,
        val: event,
        element: this.props.catOption.id,
        type: "SINGLE_DEPENDENCY"
      }
    ]);
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
    let show = "";
    try {
      this.state.catOption.forEach((item) => {
        if (isUuid(item.val) && item.val != item.cat_opt_id) {
          item.show = this.props.itemCategories.filter((ic) => {
            return ic.cat_opt_id == item.val;
          })[0].select.value;
          show = item.show;
        }
      });
    } catch (err) {
    }
   
    return (
      <>
        {!this.state.catOption[0].catOption.is_readOnly ? (
          <TextBox
            endAdornment={<InputAdornment position="end">{show}</InputAdornment>}
            placeholder={this.props.catOption.cat_opt_temp[0]["placeholder_" + this.props.lang]}
            onChange={this.onChange.bind(this)}
            isRequired={link.is_require ? link.is_require : this.props.catOption.is_require}
            label={this.props.catOption["name_" + this.props.lang] + (show ? ` (${show})` : "")}
            value={this.state.catOption[0].val}
            field="email"
            validation={[]}
          />
        ) : (
          <TextBox
            disabled={true}
            endAdornment={<InputAdornment position="end">{show}</InputAdornment>}
            placeholder={this.props.catOption.cat_opt_temp[0]["placeholder_" + this.props.lang]}
            onChange={this.onChange.bind(this)}
            isRequired={link.is_require ? link.is_require : this.props.catOption.is_require}
            label={this.props.catOption["name_" + this.props.lang] + (show ? ` (${show})` : "")}
            value={this.state.catOption[0].val}
            field="email"
            validation={[]}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    config: state.ConfigReducer
    //  catOptions: state.EditCategoryReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionFormSingleDependencies);
