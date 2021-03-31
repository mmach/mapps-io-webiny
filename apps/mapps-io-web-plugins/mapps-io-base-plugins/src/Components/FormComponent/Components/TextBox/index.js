import React from "react";
import TextField from "@material-ui/core/TextField";
import { FormGroup } from "@material-ui/core";
import { uuid } from "uuidv4";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  return createStyles({
    formControl: {
      marginTop: "10px",
      marginBottom: "10px",
      width: "100%"
    },
    selectInput: {
      width: "100%"
    }
  });
});
function TextBox(props) {
  const guid = uuid();
  const validation = props.validation ? props.validation : [];
  let label = props.label;
  if (props.isRequired == true) {
    label += " *";
  }
  const classes = useStyles();

  const FormValidation = () => {
    const FormValidation = [];
    let i = 0;

    validation.map((item) => {
      if (item.path[0] == props.field) {
        FormValidation[i] = item.msg;

        i++;
      }
    });
    return { FormValidation: FormValidation };
  };

  const formValidation = FormValidation();

  const result =
    props.noLabel == true ? (
      <TextField
      
        endAdornment={props.endAdornment}
        data-key={props["data-key"]}
        disabled={props.disabled ? true : false}
        error={formValidation.FormValidation.length > 0}
        helperText={formValidation.FormValidation.join(`\n`)}
        label={label}
        variant={props.variant ? props.variant : "outlined"}
        type={props.type ? props.type : "search"}
        value={props.value}
        id={guid}
        onChange={props.onChange}
        placeholder={props.placeholder}
        inputProps={{ "data-key": props["data-key"] }}
      />
    ) : (
      <FormGroup
        className={
          props.className && props.className.formControl
            ? props.className.formControl
            : classes.formControl
        }
        style={{ whiteSpace: "pre-line" }}
      >
        <TextField
          endAdornment={props.endAdornment}
          disabled={props.disabled ? true : false}
          error={formValidation.FormValidation.length > 0}
          helperText={formValidation.FormValidation.join(`\n`)}
          data-key={props["data-key"]}
          label={label}
          variant={props.variant ? props.variant : "outlined"}
          type={props.type ? props.type : "search"}
          value={props.value}
          id={guid}
          onChange={props.onChange}
          placeholder={props.placeholder}
          inputProps={{ "data-key": props["data-key"] }}
        />
      </FormGroup>
    );
  return result;
}
//
export default React.memo(TextBox);
