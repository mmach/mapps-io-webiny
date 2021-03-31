import { FormControl, FormLabel, Grid } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
class CategoryOptionFormMULTISELECT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.checked = [];
    this.state.validation = [];
    this.state.id = this.props.values ? this.props.values : {};
  }
  shouldComponentUpdate(nextProps) {
    if (!nextProps.itemCategories || !this.props.itemCategories) {
      return true;
    }
    const curr = this.props.itemCategories.filter((i) => i.co_id == this.props.catOption.id);
    const nextClick = nextProps.itemCategories.filter((i) => i.co_id == this.props.catOption.id);

    if (curr != nextClick) {
      return true;
    }
    return false;
  }

  onChange(event) {
    // let checked = event.target.checked;
    let checked = this.state.checked;
    checked = checked.filter((item) => {
      return item.cat_opt_id != event.currentTarget.getAttribute("data-key");
    });
    checked.push({
      id: uuid(),
      cat_opt_id: event.currentTarget.getAttribute("data-key"),
      co_temp_id: event.currentTarget.getAttribute("data-key"),

      val: event.target.checked,
      element: this.props.catOption.id,
      select: this.props.catOption.cat_opt_temp.filter((item) => {
        return item.id == event.currentTarget.getAttribute("data-key");
      })[0],
      type: "MULTISELECT",
      col_id: this.props.catOption.category_link[0].id,
      dim_id: this.props.catOption.dim_id
    });

    this.setState({
      checked: checked
    });
    this.props.onChange(
      this.props.catOption,
      checked.filter((item) => {
        return item.val == true;
      })
    );
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
      return (
      <FormControl component="fieldset" style={{ width: "100%" }}>
        <Grid container style={{ alignItems: "center" }}>
          <Grid item style={{ paddingTop: 12, paddingBottom: 12 }}>
            <FormLabel component="legend">
              {this.props.catOption["name_" + this.props.lang]}
            </FormLabel>
          </Grid>
        </Grid>

        <RadioGroup>
          {this.props.catOption.cat_opt_temp.map((item) => {
            return (
              <Grid
                key={item.id}
                container
                style={{ alignItems: "center", paddingLeft: 2, paddingRight: 2 }}
              >
                <Grid item xs="10">
                  <FormControlLabel
                    value={item.id}
                    control={
                      <Checkbox
                        value={
                          this.state.checked.filter((el) => {
                            return el.cat_opt_id == item.id;
                          }).length > 0
                            ? this.state.checked.filter((el) => {
                                return el.cat_opt_id == item.id;
                              })[0].value
                            : false
                        }
                        onChange={this.onChange.bind(this)}
                      />
                    }
                    label={item["value_" + this.props.lang]}
                  />
                </Grid>
              </Grid>
            );
          })}
        </RadioGroup>
      </FormControl>
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

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionFormMULTISELECT);
