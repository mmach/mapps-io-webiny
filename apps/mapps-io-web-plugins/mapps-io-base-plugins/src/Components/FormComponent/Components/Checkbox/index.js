import React from "react";

import { default as CheckBoxMaterial } from "@material-ui/core/Checkbox";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { uuid } from "uuidv4";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  return createStyles({
    formControl: {
      marginTop: "10px",
      marginBottom: "10px",
      width: "100%",
      maxWidth: "400px"
    },
    selectInput: {
      width: "100%"
    }
  });
});
function Checkbox(props) {
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
    let classError = "row g-mb-25 text-left";
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

  const formValidation = FormValidation();

  const result =
    props.noLabel == true ? (
      <CheckBoxMaterial
        data-key={props["data-key"]}
        type={props.type ? props.type : "checkbox"}
        disabled={props.disabled}
        checked={props.value}
        id={uuid()}
        onChange={props.onChange}
        placeholder={props.placeholder}
        inputProps={{ "data-key": props["data-key"] }}
      />
    ) : (
      <FormGroup
        color={formValidation.isDanger}
        className={
          (props.className && props.className.formControl
            ? props.className.formControl
            : classes.formControl) +
          " " +
          formValidation.classError
        }
      >
        <FormControlLabel
          label={label}
          control={
            <div>
              <CheckBoxMaterial
                data-key={props["data-key"]}
                type={props.type ? props.type : "checkbox"}
                disabled={props.disabled}
                checked={props.value}
                id={uuid()}
                onChange={props.onChange}
                inputProps={{ "data-key": props["data-key"] }}
                placeholder={props.placeholder}
              />
              {props.labelInline}
              {formValidation.FormValidation}
            </div>
          }
        />
      </FormGroup>
    );
  return result;
}

export default Checkbox;
