/*
    ./client/components/App.js
*/

import Autocomplete from "@celebryts/react-autocomplete-tags";
import { Grid, InputLabel } from "@material-ui/core";
import React from "react";
import { uuid } from "uuidv4";
import FormComponent from "./../../index.js";

class TagComponent extends FormComponent {
  constructor(props) {
    super(props);
    this.state.suggestions = this.props.suggestions ? this.props.suggestions : [];
    this.state.tags = this.props.tags ? this.props.tags : [];
    this.state.val = "";
  }

  onAdd(value) {
    let result = [];
    if (this.props.notUniq) {
      result = [...this.state.tags, { id: uuid(), value: uuid(), label: value.label }];
    } else {

      result = [...this.state.tags];
      if(result.filter(i=>i.label==value.label).length==0)
      {
        result.push({
          id: uuid(),
          value: uuid(),
          label: value.label.trim()
        });
      }
    }
    this.setState({
      tags: result
    });
    if (this.props["data-tag"]) {
      this.props.onChange({ id: this.props["data-tag"], tags: result });
    } else {
      this.props.onChange(result);
    }
  }
  onDelete(value, array) {
    this.setState({
      tags: array
    });
    if (this.props["data-tag"]) {
      this.props.onChange({ id: this.props["data-tag"], tags: array });
    } else {
      this.props.onChange(array);
    }
  }
  onChange(value) {
    this.setState({
      val: value
    });
  }
  render() {
    const formValidation = this.FormValidation.bind(this)();

    if (this.props.noLabel == true) {
      return (
        <Autocomplete
          onChange={this.onChange.bind(this)}
          delay={100}
          suggestions={this.state.suggestions.filter((i) => {
            return i.label.startsWith(this.state.val) && this.state.val.length > 0;
          })}
          onAdd={this.onAdd.bind(this)}
          onDelete={this.onDelete.bind(this)}
          tags={this.state.tags}
          placeholder={this.props.placeholder}
        />
      );
    } else {
      return (
        <Grid
          container
          xs="12"
          color={formValidation.isDanger}
          className={formValidation.classError}
        >
          <Grid item xs="2" style={{ display: "flex", alignItems: "center" }}>
            <InputLabel htmlFor={this.props.id}>{this.state.label}</InputLabel>
          </Grid>
          <Grid item xs="10">
            <Autocomplete
              id={this.props.id}
              onChange={this.onChange.bind(this)}
              delay={100}
              suggestions={this.state.suggestions.filter((i) => {
                return i.label.startsWith(this.state.val) && this.state.val.length > 0;
              })}
              onAdd={this.onAdd.bind(this)}
              onDelete={this.onDelete.bind(this)}
              tags={this.state.tags}
              placeholder={this.props.placeholder}

            />
          </Grid>
        </Grid>
      );
    }
  }
}

export default TagComponent;
