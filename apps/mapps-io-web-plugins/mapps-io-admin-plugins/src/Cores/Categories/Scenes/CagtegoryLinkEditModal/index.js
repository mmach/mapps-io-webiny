import { Checkbox, Grid } from "@material-ui/core";
import { CommandList, QueryList } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { BodyLoader, ButtonLoader, TextBox } from "mapps-io-base-plugins/src/Components/index.js";

class CagtegoryLinkEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    this.state.col = {};
    this.state.category_option = {};
    this.state.category_options = {};
    this.state.isLoading = true;
    this.state.submitLoader = false;
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.props.getCategoryLink(this.props.id).then((succ) => {
      this.props.getCategoryOptions(succ.data.category_id).then((succ2) => {
        const option = succ2.data.filter((item) => {
          return item.id.toLowerCase() == succ.data.co_id.toLowerCase();
        })[0];
        this.setState({
          col: succ.data,
          category_option: option,
          category_options: succ2.data,
          isLoading: false
        });
      });
    });
  }
  submitHanlder() {
    this.setState({
      submitLoader: true
    });
    this.props.saveCategoryOption(this.state.col).then(() => {
      this.setState({
        submitLoader: false
      });
      window.location.reload();
    });

    //   }
  }

  addNewOption() {
    this.props.addEmptyElementOption(uuid(), this.state.catOption.id);
  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "62vh", display: "flex" }}
        >
          <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
        </Grid>
      );
    }
    return (
      <Grid style={{ width: "400px" }}>
        {this.state.category_option["name_" + this.props.lang]}

        <TextBox
          label={"Order"}
          data-key={this.props["data-key"]}
          className="form-input "
          type={"number"}
          value={this.state.col.order}
          id={this.state.guid}
          onChange={(event) => {
            const row = this.state.col;
            row.order = event.target.value;
            this.setState({ col: { ...row } });
          }}
          placeholder={this.props.placeholder}
        />
        <TextBox
          label={"Order Search"}
          data-key={this.props["data-key"]}
          className="form-input "
          type={"number"}
          value={this.state.col.order_search}
          id={this.state.guid}
          onChange={(event) => {
            const row = this.state.col;
            row.order_search = event.target.value;
            this.setState({ col: { ...row } });
          }}
          placeholder={this.props.placeholder}
        />

        <Grid container xs="12">
          <Grid item xs="4">
            Type
          </Grid>
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            {this.state.category_option.cat_opt.name}
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Is require
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-check-input "
              type={"checkbox"}
              checked={this.state.col.is_require}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_require = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Is searchable
          </Grid>
          <Grid item xs="4">
            <Checkbox
              label={"Is searchable"}
              data-key={this.props["data-key"]}
              className="form-check-input"
              type={"checkbox"}
              checked={this.state.col.is_searchable}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_searchable = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Is on map list
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-check-input "
              type={"checkbox"}
              checked={this.state.col.is_on_map}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_on_map = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Show above pin on map
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-check-input"
              type={"checkbox"}
              checked={this.state.col.is_on_pin_map}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_on_pin_map = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Is in form hidden
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-check-input "
              type={"checkbox"}
              checked={this.state.col.is_form_hidden}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_form_hidden = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Can above pin (search)
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-check-input "
              type={"checkbox"}
              checked={this.state.col.can_above_pin}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.can_above_pin = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            On IUA view
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-input "
              type={"checkbox"}
              value={this.state.col.is_on_iua}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_on_iua = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Init on IUA request
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-input "
              type={"checkbox"}
              value={this.state.col.is_on_iua_request}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_on_iua_request = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Treat as url params
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-input "
              type={"checkbox"}
              value={this.state.col.is_params}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_params = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            Is visible in preview
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-input "
              type={"checkbox"}
              value={this.state.col.is_visible_view}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_visible_view = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid item xs="8" style={{ alignSelf: "center" }}>
            On main page search{" "}
          </Grid>
          <Grid item xs="4">
            <Checkbox
              data-key={this.props["data-key"]}
              className="form-input "
              type={"checkbox"}
              value={this.state.col.is_on_main_page}
              id={this.state.guid}
              onChange={(event) => {
                const row = this.state.col;
                row.is_on_main_page = event.target.checked;
                this.setState({ col: { ...row } });
              }}
              placeholder={this.props.placeholder}
            />
          </Grid>
        </Grid>

        <TextBox
          label={"Limit of"}
          data-key={this.props["data-key"]}
          className="form-input "
          type={"number"}
          value={this.state.col.limit_of}
          id={this.state.guid}
          onChange={(event) => {
            const row = this.state.col;
            row.limit_of = event.target.value;
            this.setState({ col: { ...row } });
          }}
          placeholder={this.props.placeholder}
        />

        <ButtonLoader
          onClick={this.submitHanlder.bind(this)}
          size={"md"}
          value={"Submit"}
          isLoading={this.state.submitLoader}
        />
      </Grid>
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
    getCategoryLink: (id) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_LINK_BY_ID, { id: id })
      );
    },

    upsertCategoryOptions: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS, dto)
      );
    },
    getCategoryOptions: (id) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, { id: id })
      );
    },
    saveCategoryOption: (dto) => {
      return dispatch(
        new BaseService().commandThunt(
          CommandList.Category_Options.UPSERT_CAETEGORY_OPTIONS_FOR_CATEGORY,
          dto
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CagtegoryLinkEditModal);
