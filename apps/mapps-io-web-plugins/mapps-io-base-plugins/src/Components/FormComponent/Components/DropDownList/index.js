import React from "react";
import { Select, InputLabel, FormControl, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { uuid } from "uuidv4";

const useStyles = makeStyles(() => {
  return createStyles({
    formControl: {
        marginTop: "10px",
        marginBottom: "10px",
        width: "100%",
       // maxWidth: "400px"
      },
    selectInput: {
      width: "100%"
    }
  });
});
function DropDownList(props) {
  const guid = uuid();
  const validation = props.validation ? props.validation : [];
  let label = props.label;
  const classes = useStyles();
  if (props.isRequired == true) {
    label += " *";
  }

  const FormValidation = () => {
    const FormValidation = [];
    let i = 0;
    let isDanger = "";
    let classError = "";
    validation.map((item) => {
      if (item.path[0] == props.field) {
        FormValidation[i] = (
          <small className="form-control-feedback" key={i}>
            {item.msg}
            <br />
          </small>
        );
        i++;
        if (i === 1) {
          isDanger = "danger";
          classError += " u-has-error-v1";
        }
      }
    });
    return { FormValidation: FormValidation, isDanger: isDanger, classError: classError };
  };

  const optionValue = [];
  const formValidation = FormValidation();
  let i = 0;
  props.valueOptions.map((item) => {
    optionValue[i] = (
      <MenuItem data-key={props["data-key"]} key={i++} value={item.id}>
        {item.value}
      </MenuItem>
    );
  });

  const result =
    props.noLabel == true ? (
      <Select
        // native
        type="select"
        data-key={props["data-key"]}
        className={
          props.className && props.className.selectInput
            ? this.props.className.selectInput
            : classes.selectInput
        }
        value={props.value}
        id={guid}
        onChange={props.onChange}
        disabled={props.disabled}
        variant="outlined"

      >
        {optionValue}
      </Select>
    ) : (
      <FormControl
        color={formValidation.isDanger}
        className={
          (props.className && props.className.formControl
            ? props.className.formControl
            : classes.formControl) +
          " " +
          formValidation.classError
        }
      >
        <InputLabel
          className={
            props.className && props.className.inputInput
              ? props.className.inputInput
              : classes.inputInput
          }
          id={uuid}
        >
          {label}{" "}
        </InputLabel>

        <Select
          labelId={guid}
          //   native
          id={uuid()}
          data-key={props["data-key"]}
          type="select"
          className={
            props.className && props.className.selectInput
              ? props.className.selectInput
              : classes.selectInput
          }
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          variant="outlined"

        >
          {optionValue}
        </Select>
        {formValidation.FormValidation}
      </FormControl>
    );
  return result;
}

export default DropDownList;
