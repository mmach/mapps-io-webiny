import { Grid } from "@material-ui/core";
/*
    ./client/components/App.jsx
*/
import { CategoryOptionsDTO, DictionaryDTO, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Col, Container } from "reactstrap";
import { uuid } from "uuidv4";
import CATEGORY_EDIT_ACTIONS from "../../Scenes/EditCategory/actions.js";
import CategoryOptionBETWEEN from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionBETWEEN.js";
import CategoryOptionGEO from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionGEO.js";
import CategoryOptionIMAGE from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionIMAGE.js";
import CategoryOptionNotBetween from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionNOT_BETWEEN.js";
import CategoryOptionSELECT from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionSELECT.js";
import CategoryOptionSINGLE from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionSINGLE.js";
import CategoryOptionSingleDependency from "../CategoryOptionTypes/CREATE_EDIT/CategoryOptionSINGLE_DEPENDENCY.js";
import { BaseService } from "mapps-io-base-plugins/src/App";
import { BodyLoader, DropDownList } from "mapps-io-base-plugins/src/Components/index.js";

class CategoryOptionTempMapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.getCategoryOptionsTypeQuery = [];
    this.state.validation = [];
    this.state.type = {};

    this.state.id = 0;
    this.state.loading = false;

    this.state.catOption = new CategoryOptionsDTO();

    if (!this.state.catOption.cat_opt) {
      this.state.catOption.cat_opt = {};
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.id != prevProps.match.params.id &&
      this.props.match.params.id != "new"
    ) {
      this.setState({
        loading: true
      });
      this.props.getCategoryOption(this.props.match.params.id).then((succ) => {
        this.props.cleanEmptyElement();
        this.props.addEmptyElement(succ.data[0].id);
        this.props.editEmptyElement(succ.data[0]);
        this.setState({
          catOption: succ.data[0],
          id: succ.data[0].id,
          loading: false
        });
      });
    } else if (
      this.props.match.params.id != prevProps.match.params.id &&
      this.props.match.params.id == "new"
    ) {
      this.setState({
        loading: true
      });
      this.props.getCategoryOptionsType().then((succ) => {
        this.props.cleanEmptyElement();
        this.setState({
          catOption: {
            ...new CategoryOptionsDTO(),

            cat_opt: {}
          },

          getCategoryOptionsTypeQuery: succ.data,
          loading: false
        });
      });
    }
  }

  componentDidMount() {
    if (this.props.match.params.id != "new") {
      this.setState({
        loading: true
      });
      this.props.getCategoryOption(this.props.match.params.id).then((succ) => {
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
    catOption.id = uuid();
    catOption.cat_opt.id = event.target.value;
    const co = this.state.getCategoryOptionsTypeQuery.filter((item) => {
      return catOption.cat_opt.id == item.id;
    });

    catOption.cat_opt = co[0];
    this.props.addEmptyElement(catOption.id);

    this.props.editEmptyElement(catOption);

    this.setState({
      catOption: catOption,
      id: catOption.id
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
    if (this.state.loading == true) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "92vh", display: "flex" }}
        >
          <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
        </Grid>
      );
    }
    const cat = this.props.catOptions.catOptions.filter((item) => {
      return item.id == this.state.id;
    })[0];
    return (
      <Container className="g-ma-10">
        <Col className="text-center mx-auto g-max-width-600 g-mb-10">
          <h2 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-400 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">
            {tran.translate("CATEGORY_OPTION_ADD_HEADER")}
          </h2>
          <br />
          <label className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">
            {tran.translate("CATEGORY_OPTION_ADD_HEADER_TEXT")}
          </label>
        </Col>
        {this.state.catOption.category_link != undefined &&
        this.state.catOption.category_link.length > 0 ? (
          <Col className="g-mb-50">
            <div
              trigger={
                tran.translate("SHOW_DEPENDENCIES_CATEGORIES") +
                " - " +
                this.state.catOption.category_link.length
              }
            >
              <div>
                {this.state.catOption.category_link.map((item) => {
                  return (
                    <Link
                      key={item.category.id}
                      to={"/mapps/categories/categories/edit/" + item.category_id}
                      className="g-font-size-11 col-md-11 col-xs-11 g-color-primary--hover nav-link"
                    >
                      {item.category["category_" + this.props.lang]}
                    </Link>
                  );
                })}
              </div>
            </div>
          </Col>
        ) : (
          <span></span>
        )}
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
        {this.state.catOption.cat_opt.id && cat ? (
          <div>
            {this.checkType("SELECT").length > 0 && (
              <div>
                <CategoryOptionSELECT
                  catOptionsTemp={this.checkType("SELECT")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionSELECT>
              </div>
            )}
            {this.checkType("MULTI_SELECT").length > 0 && (
              <div>
                <CategoryOptionSELECT
                  catOptionsTemp={this.checkType("MULTI_SELECT")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionSELECT>
              </div>
            )}
            {this.checkType("SINGLE").length > 0 && (
              <div>
                <CategoryOptionSINGLE
                  catOptionsTemp={this.checkType("SINGLE")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionSINGLE>
              </div>
            )}
            {this.checkType("BETWEEN").length > 0 && (
              <div>
                <CategoryOptionBETWEEN
                  catOptionsTemp={this.checkType("BETWEEN")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionBETWEEN>
              </div>
            )}
            {this.checkType("GEOCOORDINATE").length > 0 && (
              <div>
                <CategoryOptionGEO
                  catOptionsTemp={this.checkType("GEOCOORDINATE")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionGEO>
              </div>
            )}
            {this.checkType("IMAGES").length > 0 && (
              <div>
                <CategoryOptionIMAGE
                  catOptionsTemp={this.checkType("IMAGES")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionIMAGE>
              </div>
            )}
            {this.checkType("SINGLE_DEPENDENCY").length > 0 && (
              <div>
                <CategoryOptionSingleDependency
                  catOptionsTemp={this.checkType("SINGLE_DEPENDENCY")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionSingleDependency>
              </div>
            )}
            {this.checkType("NOT_BETWEEN").length > 0 && (
              <div>
                <CategoryOptionNotBetween
                  catOptionsTemp={this.checkType("NOT_BETWEEN")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionNotBetween>
              </div>
            )}
            {this.checkType("CASE").length > 0 && (
              <div>
                <CategoryOptionSELECT
                  catOptionsTemp={this.checkType("CASE")[0]}
                  catOption={
                    this.props.catOptions.catOptions.filter((item) => {
                      return item.id == this.state.id;
                    })[0]
                  }
                ></CategoryOptionSELECT>
              </div>
            )}
          </div>
        ) : (
          <span></span>
        )}
      </Container>
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
      return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {}));
    },
    addEmptyElement: (id) => {
      dispatch({
        type: CATEGORY_EDIT_ACTIONS.ADD_EMPTY_OPTION,
        dto: {
          id: id
        }
      });
    },
    editEmptyElement: (dto) => {
      dispatch({
        type: CATEGORY_EDIT_ACTIONS.UPDATE_EMPTY_ELEMENT,
        dto: dto
      });
    },
    cleanEmptyElement: (dto) => {
      dispatch({
        type: CATEGORY_EDIT_ACTIONS.CLEAN,
        dto: dto
      });
    },
    getCategoryOption: (id) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS, {
          id: id
        })
      );
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryOptionTempMapper));
