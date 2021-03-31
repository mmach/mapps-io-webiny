import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  ButtonLoader,
  Checkbox,
  DropDownList,
  TextBox
} from "mapps-io-base-plugins/src/Components/index.js";
export default class CategoryOptionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.copied = false;
  }

  render() {
    return (
      <Grid container>
        <Grid item container xs="12">
          <Grid item xs="1" style={{ justifyContent: "center", display: "flex" }}>
            <Tooltip title="Copy ID">
              <CopyToClipboard
                text={this.props.catOption.id}
                onCopy={() => this.setState({ copied: true })}
              >
                <IconButton>
                  <FileCopyIcon />
                </IconButton>
              </CopyToClipboard>
            </Tooltip>
          </Grid>
          <Grid item xs="11" style={{ alignSelf: "center", display: "flex" }}>
            {this.props.catOption.id}
          </Grid>
        </Grid>
        <Grid item container xs="12">
          <Grid item xs="3">
            <Checkbox
              label={this.props.tran.translate("Is searchable")}
              value={this.props.catOption.is_searchable}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_searchable: event.target.checked }
                });
              }}
              field="is_searchable"
              validation={this.props.validation}
            />
            <Checkbox
              label={this.props.tran.translate("Is require")}
              value={this.props.catOption.is_require}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_require: event.target.checked }
                });
              }}
              field="is_require"
              validation={this.props.validation}
            />
            <Checkbox
              label={this.props.tran.translate("Is on map list")}
              value={this.props.catOption.is_on_map}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_on_map: event.target.checked }
                });
              }}
              field="is_on_map"
              validation={this.props.validation}
            />
          </Grid>
          <Grid item xs="3">
            <Checkbox
              label={this.props.tran.translate("Show above pin on map")}
              value={this.props.catOption.is_on_pin_map}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_on_pin_map: event.target.checked }
                });
              }}
              field="is_on_pin_map"
              validation={this.props.validation}
            />
            <Checkbox
              label={this.props.tran.translate("Is in form hidden")}
              value={this.props.catOption.is_form_hidden}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_form_hidden: event.target.checked }
                });
              }}
              field="is_form_hidden"
              validation={this.props.validation}
            />
            <Checkbox
              label={this.props.tran.translate("Is visible in preview")}
              value={this.props.catOption.is_visible_view}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_visible_view: event.target.checked }
                });
              }}
              field="is_visible_view"
              validation={this.props.validation}
            />
          </Grid>
          <Grid item xs="3">
            <Checkbox
              label={this.props.tran.translate("Init on IUA request")}
              value={this.props.catOption.is_on_iua_request}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_on_iua_request: event.target.checked }
                });
              }}
              field="is_on_pin_map"
              validation={this.props.validation}
            />
            <Checkbox
              label={this.props.tran.translate("Treat as url params")}
              value={this.props.catOption.is_params}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_params: event.target.checked }
                });
              }}
              field="is_form_hidden"
              validation={this.props.validation}
            />
            <Checkbox
              label={this.props.tran.translate("On main page search")}
              value={this.props.catOption.is_on_main_page}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_on_main_page: event.target.checked }
                });
              }}
              field="is_visible_view"
              validation={this.props.validation}
            />{" "}
          </Grid>
          <Grid item xs="3">
            <Checkbox
              label={this.props.tran.translate("On IUA view")}
              value={this.props.catOption.is_on_iua}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, is_on_iua: event.target.checked }
                });
              }}
              field="is_visible_view"
              validation={this.props.validation}
            />
            <Checkbox
              label={this.props.tran.translate("Can above pin (search)")}
              value={this.props.catOption.can_above_pin}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, can_above_pin: event.target.checked }
                });
              }}
              field="is_visible_view"
              validation={this.props.validation}
            />
          </Grid>
        </Grid>
        <Grid item xs="12">
          <DropDownList
            label={this.props.tran.translate("Dimension")}
            valueOptions={this.props.getDropDownValues()}
            value={this.props.catOption.dim_id}
            onChange={this.props.dimHandler}
            field="type"
            validation={this.props.validation}
          />

          <TextBox
            isRequired={true}
            label={this.props.tran.translate("Limit of")}
            value={this.props.catOption.limit_of}
            onChange={(event) => {
              this.props.refreshValidation();
              this.props.setState({
                catOption: { ...this.props.catOption, limit_of: event.target.value }
              });
            }}
            field="name"
            validation={this.props.validation}
          />
          <TextBox
            isRequired={true}
            label={this.props.tran.translate("Order label")}
            value={this.props.catOption.order}
            onChange={(event) => {
              this.props.refreshValidation();
              this.props.setState({
                catOption: { ...this.props.catOption, order: event.target.value }
              });
            }}
            field="order"
            validation={this.props.validation}
          />
          <TextBox
            isRequired={true}
            label={this.props.tran.translate("Order search")}
            value={this.props.catOption.order_search}
            onChange={(event) => {
              this.props.refreshValidation();
              this.props.setState({
                catOption: { ...this.props.catOption, order_search: event.target.value }
              });
            }}
            field="order"
            validation={this.props.validation}
          />
        </Grid>
        <Grid container>
          <Grid item xs="12">
            <TextBox
              label={this.props.tran.translate("Name")}
              value={this.props.catOption.name}
              onChange={(event) => {
                this.props.refreshValidation();
                this.props.setState({
                  catOption: { ...this.props.catOption, name: event.target.value }
                });
              }}
              field="name"
              validation={this.props.validation}
            />
          </Grid>
          {["pl", "us", "de", "es", "fr", "ru", "zh_cn", "no"].map((i) => {
            return (
              <Grid key={i} container item xs="12">
                <Grid item xs="8">
                  <TextBox
                    label={i}
                    value={this.props.catOption[`name_${i}`]}
                    onChange={(event) => {
                      this.props.refreshValidation();
                      const catOption = { ...this.props.catOption };
                      catOption[`name_${i}`] = event.target.value;
                      this.props.setState({
                        catOption: catOption
                      });
                    }}
                    field={`name_${i}`}
                    validation={this.state.validation}
                  />
                </Grid>
                <Grid item xs="3">
                  <ButtonLoader
                    value={i}
                    onClick={this.props.translateSubmit}
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
            onClick={this.props.submitHanlder.bind(this)}
            size={"md"}
            color={"primary"}
            value={"Submit"}
            isLoading={this.props.isSubmitLoading}
          />

          <Grid container item xs="12">
            {this.props.addNewOption && (
              <Grid item xs="3" spacing={"3"} style={{ padding: "10px" }}>
                <IconButton color={"primary"} onClick={this.props.addNewOption}>
                  <AddIcon />
                </IconButton>
              </Grid>
            )}
            {this.props.catOption.status == 1 ? (
              this.props.catOption.cat_opt_temp ? (
                this.props.catOption.cat_opt_temp.map((item) => {
                  return (
                    <Grid item xs="3" key={item.id} spacing={"3"} style={{ padding: "10px" }}>
                      <ButtonLoader
                        data-key={item.id}
                        onClick={this.props.openModal}
                        value={item.placeholder ? item.placeholder : item.value}
                      >
                        <Typography
                          style={{
                            marginBottom: "20px",
                            paddingBottom: "10px",
                            borderBottom: "1px solid #999",
                            textAlign: "center",
                            padding: "10px"
                          }}
                          variant="h7"
                          component="h4"
                        >
                          {item.placeholder ? item.placeholder : item.value}
                        </Typography>
                      </ButtonLoader>
                    </Grid>
                  );
                })
              ) : (
                <span></span>
              )
            ) : (
              <span></span>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
