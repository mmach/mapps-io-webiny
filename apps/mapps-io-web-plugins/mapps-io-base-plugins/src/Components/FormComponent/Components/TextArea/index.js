import { FormGroup, InputLabel } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React from "react";
import { uuid } from "uuidv4";
import { makeStyles, createStyles } from "@material-ui/core/styles";

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

export default function TextArea(props) {
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

  const formValidation = FormValidation();

  const result =
    props.noLabel == true ? (
      <TextareaAutosize
        rows={props.rows ? props.rows : "5"}
        height={props.height}
        data-key={props["data-key"]}
        className={"form-control rounded-0"}
        value={props.value}
        id={guid}
        onChange={props.onChange}
        placeholder={props.placeholder}
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
        <InputLabel for={guid}>{label}</InputLabel>
        <TextareaAutosize
          rows={props.rows ? props.rows : "5"}
          height={props.height}
          className="form-control rounded-0"
          value={props.value}
          id={guid}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
        {formValidation.FormValidation}
      </FormGroup>
    );
  return result;
}
