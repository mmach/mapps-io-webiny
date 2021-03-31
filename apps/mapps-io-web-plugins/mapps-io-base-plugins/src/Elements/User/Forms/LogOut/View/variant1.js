import React from "react";
import { ButtonLoader } from "./../../../../../Components/index.js";

const ButtonLogout = (props) => (
    <ButtonLoader
        isLoading={props.loading}
        value={props.translate("LOGOUT_ACCOUNT_BUTTON_LABEL")}
    />
);

export default ButtonLogout;
