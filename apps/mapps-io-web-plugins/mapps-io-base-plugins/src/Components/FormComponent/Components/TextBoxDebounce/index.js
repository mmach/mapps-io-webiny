import { usePrevious } from "../../../../Hooks/usePrevious";
import debounce from "lodash/debounce";
import React from "react";
import TextBox from "../TextBox";

function TextFieldDebounce(props) {
    const [val, setValue] = React.useState(props.value);
    const propsValPrev =  usePrevious(props.value);
  
    const debounceStart = React.useMemo(
        () =>
            debounce((request) => {
                props.onChange && props.onChange(request);

            }, props.debounce),

        [props.debounce,props.onChange]
    );
    React.useEffect(() => {
        if (propsValPrev == val && propsValPrev!=props.value) {
            setValue(props.value ? props.value : "");
        }
    }, [props.value]);
    React.useEffect(() => {
        debounceStart(val);
    }, [val]);
    
    function onChange(event) {
        setValue(event.target.value);
    }

    return (
        <TextBox
            {...props}
            label={props.label}
            type={props.type}
            isRequired={false}
            value={val?val:''}
            onChange={onChange}
        />
    );
}

export default React.memo(TextFieldDebounce);
