//import "react-datepicker/dist/react-datepicker.css";
//import(/* webpackPreload: true */ "react-day-picker/lib/style.css");
//import(/* webpackPreload: true */ "./react-datepicker-cssmodules.scss");
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import React from "react";
import { uuid } from "uuidv4";
//import DatePicker from "react-datepicker";
//import ResponsiveMatch from "../../../ResponsiveMatch/index.js";

export default function DayPickerInputComponent(props) {
  const guid = uuid();
  const validation = props.validation ? props.validation : [];
  const [focused, setFocus] = React.useState(false);
  let label = props.label;

  if (props.isRequired == true) {
    label += " *";
  }

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

  let body = undefined;
  if (props.variant == "month") {
    body = (
      <DatePicker
        inputVariant={props.inputVariant ? props.inputVariant : "outlined"}
        key={1}
        inline={props.inline ? "inline" : ""}
        error={formValidation.FormValidation.length > 0}
        helperText={formValidation.FormValidation.join(`\n`)}
        openTo="month"
        views={["year", "month"]}
        label={label}
        id={guid}
        value={props.value}
        selected={props.value}
        onChange={props.onChange}
        format={props.dateFormat ? props.dateFormat : "dd/MM/yyyy"}
      />
    );
  } else {
    body = (
      <KeyboardDatePicker
        key={1}
        inputVariant={props.inputVariant ? props.inputVariant : "outlined"}
        error={formValidation.FormValidation.length > 0}
        helperText={formValidation.FormValidation.join(`\n`)}
        inline={props.inline}
        readOnly={props.readOnly}
        monthsShown={props.monthsShown}
        selectsStart={props.selectsStart}
        selectsEnd={props.selectsEnd}
        selected={props.value}
        onChange={props.onChange}
        fixedHeight={props.fixedHeight}
        showTimeSelect={props.showTime ? props.showTime : false}
        timeFormat="HH:mm"
        dateFormat={props.dateFormat}
        timeIntervals={15}
        minDate={props.minDate}
        showDisabledMonthNavigation={true}
        placeholderText={props.placeholder}
        id={guid}
        value={props.value}
        showYearDropdown={props.showYearDropdown}
        scrollableYearDropdown={props.scrollableYearDropdown}
        yearDropdownItemNumber={props.yearDropdownItemNumber}
        maxDate={props.maxDate}
        startDate={props.startDate}
        endDate={props.endDate}
        showMonthYearPicker={props.showMonthYearPicker}
        showFullMonthYearPicker={props.showFullMonthYearPicker}
        label={label}
        format={props.dateFormat ? props.dateFormat : "dd/MM/yyyy"}
        onFocus={() => {
          setFocus(true);
        }}
        InputLabelProps={{
          shrink: props.value || focused ? true : false
        }}
      />
    );
  }
  const result = <MuiPickersUtilsProvider utils={DateFnsUtils}>{body}</MuiPickersUtilsProvider>;

  return result;
}
