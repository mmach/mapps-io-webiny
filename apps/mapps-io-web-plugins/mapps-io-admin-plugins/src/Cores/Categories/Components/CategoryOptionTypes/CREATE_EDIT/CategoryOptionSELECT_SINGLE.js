import { Grid, Typography } from "@material-ui/core";
import { CategoryOptionsTemplateDTO, CommandList, Translator ,QueryList} from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App";
import {
  ButtonLoader,
  Checkbox,
  DropDownList,
  TagComponent,
  TextBox
} from "mapps-io-base-plugins/src/Components/index.js";

class CategoryOptionSelectSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state.getCategoryOptionsTypeQuery = [];
    this.state.validation = [];
    this.state.type = {};
    this.state.catOption = Object.assign(
      new CategoryOptionsTemplateDTO(),
      this.props.catSingleOption
    );
    this.state.isSubmitLoading = false;
    this.state.toRefresh = false;
    this.state.isDeleteLoading = false;
  }

  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        this.validation();
      });
    }
  }

  translateSubmit(event) {
    const lang = event.target.innerText;
    let langFrom = this.state.catOption.lang ? this.state.catOption.lang : this.props.lang;
    if (langFrom == "zh_cn") {
      langFrom = "zh";
    } else if (langFrom == "us") {
      langFrom = "en";
    }
    const obj = {};
    obj.src = this.state.catOption.name;
    obj.langTo = lang;
    obj.langSrc = langFrom;
    this.props.toTranslate(
      obj
    ); /*.then((succ) => {
      const translateObj = translate;
      translateObj["placeholder_" + lang.toLowerCase()] = succ.data;
      setTranslate({ ...translateObj });
      props.setTranslate({ ...translateObj });
    });*/
  }
  validation() {
    let validation = CategoryOptionsTemplateDTO.prototype.validation(this.state.catOption);
    this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
    validation = validation.map((item) => {
      item.msg = this.tran.translate(item.failed, [item]);
      return item;
    });
    this.setState({
      validation: validation
    });
    return validation;
  }
  submitHanlder() {
    //this.state.catOption.id=uuidv4();
    const catOption = this.state.catOption;
    catOption.co_id = this.props.coId;
    catOption.cott_id = this.props.catSingleOption.cott_id.id
      ? this.props.catSingleOption.cott_id.id
      : this.props.cottId;
    catOption.type = this.props.type;
    //this.state.catOption.co_id = ;
    //this.cott_id = '';
    this.setState({
      toRefresh: true,
      isSubmitLoading: true
    });

    const validator = this.validation();
    const id = catOption.id ? catOption.id : uuid();
    if (validator.length == 0) {
      catOption.id = id;
      catOption.status = 1;

      this.props.upsertCatOption(catOption).then(() => {
        window.location.reload(false);

        this.setState({
          catOption: { ...catOption },
          isSubmitLoading: false
        });
      });
    } else {
      this.setState({
        isSubmitLoading: false
      });
    }

    //   }
  }
  getDropDownValues() {
    return [
      { id: "", value: "" },
      ...this.props.config.dimensions
        .filter((item) => {
          return (
            item.cott_id ==
            (this.props.catSingleOption.cott_id.id
              ? this.props.catSingleOption.cott_id.id
              : this.props.catSingleOption.cott_id)
          );
        })
        .map((item) => {
          return {
            id: item.id,
            value: item.name
          };
        })
    ];
  }

  dimHandler(event) {
    this.setState({
      catOption: { ...this.state.catOption, dim_id: event.target.value }
    });
  }
  getDropDownValuesRef() {
    return [
      { id: "", value: "" },
      ...this.props.config.dimensions
        .filter((item) => {
          return item.as_cat_ref == true;
        })
        .map((item) => {
          return {
            id: item.id,
            value: item.name
          };
        })
    ];
  }

  refHandler(event) {
    this.setState({
      catOption: { ...this.state.catOption, dim_ref_id: event.target.value }
    });
  }
  onTagFunc(event) {
    const func = Object.keys(event)
      .map((i) => event[i].label)
      .join(" ");
    this.setState({
      catOption: {
        ...this.state.catOption,
        func: func
      }
    });
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    const operator = ["!", "|", "&", "=", ">", ">=", "*", "+", "-", "/", "<=", "<"];

    return (
      <Grid container style={{ width: "60vw", maxHeight: "90vh", overflowY: "scroll" }}>
        <Grid item xs="12">
          <Typography
            style={{
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "1px solid #999"
            }}
            variant="h5"
            component="h1"
          >
            Category option attribute
          </Typography>
        </Grid>
        <Grid container item xs="12">
          <Grid item xs="6">
            <Checkbox
              placeholder={phTrans.translate("OPTION_IS_CLOB_PLACEHOLDER")}
              label={tran.translate("In ES clob")}
              value={this.state.catOption.is_not_in_clob}
              onChange={(event) => {
                this.refreshValidation();
                this.setState({
                  catOption: { ...this.state.catOption, is_not_in_clob: event.target.checked }
                });
              }}
              field="is_in_clob"
              validation={this.state.validation}
            />
            <Checkbox
              placeholder={phTrans.translate("OPTION_IS_VISIBLE_VIEW_PLACEHOLDER")}
              label={tran.translate("Is visible in view")}
              value={this.state.catOption.is_visible_view}
              onChange={(event) => {
                this.refreshValidation();
                this.setState({
                  catOption: { ...this.state.catOption, is_visible_view: event.target.checked }
                });
              }}
              field="is_visible_view"
              validation={this.state.validation}
            />
            <Checkbox
              placeholder={phTrans.translate("OPTION_IS_VISIBLE_FORM_PLACEHOLDER")}
              label={tran.translate("Is visible in form")}
              value={this.state.catOption.is_visible_form}
              onChange={(event) => {
                this.refreshValidation();
                this.setState({
                  catOption: { ...this.state.catOption, is_visible_form: event.target.checked }
                });
              }}
              field="is_visible_form"
              validation={this.state.validation}
            />
          </Grid>
          <Grid item xs="6">
            <Checkbox
              placeholder={phTrans.translate("OPTION_IS_VISIBLE_SEARCH_PLACEHOLDER")}
              label={tran.translate("Is visible in search")}
              value={this.state.catOption.is_visible_search}
              onChange={(event) => {
                this.refreshValidation();
                this.setState({
                  catOption: { ...this.state.catOption, is_visible_search: event.target.checked }
                });
              }}
              field="is_visible_search"
              validation={this.state.validation}
            />
            <Checkbox
              placeholder={phTrans.translate("OPTION_IS_READONLY_PLACEHOLDER")}
              label={tran.translate("Is readonly")}
              value={this.state.catOption.is_readOnly}
              onChange={(event) => {
                this.refreshValidation();
                this.setState({
                  catOption: { ...this.state.catOption, is_readOnly: event.target.checked }
                });
              }}
              field="is_visible_search"
              validation={this.state.validation}
            />
          </Grid>
        </Grid>
        <Grid container item xs="12">
          <Grid item xs="6">
            <DropDownList
              label={tran.translate("Dimension referance value")}
              valueOptions={this.getDropDownValuesRef()}
              value={this.state.catOption.dim_ref_id}
              onChange={this.refHandler.bind(this)}
              field="type"
              validation={this.state.validation}
            />
          </Grid>
          <Grid item xs="6">
            <DropDownList
              label={tran.translate("Dimension type")}
              valueOptions={this.getDropDownValues()}
              value={this.state.catOption.dim_id}
              onChange={this.dimHandler.bind(this)}
              field="type"
              validation={this.state.validation}
            />
          </Grid>
        </Grid>
        <Grid item xs="12" style={{ marginBottom: "20px" }}>
          <TagComponent
            notUniq={true}
            tags={
              this.state.catOption.func
                ? this.state.catOption.func.split(" ").map((i) => {
                    return {
                      id: uuid(),
                      value: uuid(),
                      label: i
                    };
                  })
                : []
            }
            label={"Function"}
            onChange={this.onTagFunc.bind(this)}
            suggestions={[
              ...operator.map((i) => {
                return {
                  value: i,
                  label: i,
                  type: "OPERATOR"
                };
              }),
              ,
              ...this.props.config.dimensions.map((i) => {
                return {
                  id: uuid(),
                  value: uuid(),
                  label: `#$${i.name.trim()}#`,
                  type: "PRIV"
                };
              })
            ]}
          ></TagComponent>
        </Grid>

        <Grid item xs="12">
          <TextBox
            noLabel
            placeholder={phTrans.translate("OPTION_NAME_PLACEHOLDER")}
            isRequired={true}
            label={tran.translate("OPTION_NAME_LABEL")}
            value={this.state.catOption.placeholder}
            onChange={(event) => {
              this.refreshValidation.bind(this)();
              this.setState({
                catOption: { ...this.state.catOption, placeholder: event.target.value }
              });
            }}
            field="placeholder"
            validation={this.state.validation}
          />
        </Grid>
        {["pl", "us", "de", "es", "fr", "ru", "zh_cn", "no"].map((i) => {
          return (
            <Grid key={i} container item xs="12">
              <Grid item xs="8">
                <TextBox
                  placeholder={phTrans.translate("")}
                  label={tran.translate(i)}
                  value={this.state.catOption[`value_${i}`]}
                  onChange={(event) => {
                    this.refreshValidation.bind(this)();
                    const catOption = { ...this.state.catOption };
                    catOption[`value_${i}`] = event.target.value;
                    this.setState({
                      catOption: catOption
                    });
                  }}
                  field={`value_${i}`}
                  validation={this.state.validation}
                />
              </Grid>
              <Grid item xs="3">
                <ButtonLoader
                  value={i}
                  onClick={this.translateSubmit.bind(this)}
                  size={"md"}
                  isLoading={this.state.isLoading}
                >
                  pl
                </ButtonLoader>
              </Grid>
            </Grid>
          );
        })}

        <ButtonLoader
          onClick={this.submitHanlder.bind(this)}
          size={"md"}
          color={"primary"}
          value={"Submit"}
          isLoading={this.state.isSubmitLoading}
        />
      </Grid>
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
    toTranslate: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Languages.TRANSLATE, dto));
    },
    upsertCatOption: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS_TEMPLATE,
          dto
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionSelectSingle);
