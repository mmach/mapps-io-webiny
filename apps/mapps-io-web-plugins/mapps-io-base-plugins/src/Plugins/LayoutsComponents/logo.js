import Image from "material-ui-image";
import { useSelector } from "react-redux";
import React from "react";
const DeskoptLogo = props => {
    const { projectReducer } = useSelector(state => ({
        projectReducer: state.ConfigReducer.project
    }));
    return (
        <Image
            disableSpinner={props.disableSpinner}
            disableTransition={props.disableTransition}
            style={{
                backgroundColor: "rgba(0,0,0,0)",
                padding: "0px",
                display: "flex",
                //  justifyContent:'center',
                padding: "2px",
                marginLeft: "10px"
            }}
            imageStyle={{
                height: "auto",
                width: "200px",
                position: "relative"
            }}
            src={window.env.BLOB_URL + "/blob/" + projectReducer.logo_hor.blob_id}
        />
    );
};

const LogoMobile = props => {
    const { projectReducer } = useSelector(state => ({
        projectReducer: state.ConfigReducer.project
    }));

    return (
        <Image
            disableSpinner={props.disableSpinner}
            disableTransition={props.disableTransition}
            style={{
                backgroundColor: "rgba(0,0,0,0)",
                padding: "0px",
                display: "flex",
                //  justifyContent:'center',
                padding: "2px",
                height: "50px"
            }}
            imageStyle={{
                height: "auto",
                width: "auto",
                position: "relative"
            }}
            src={window.env.BLOB_URL + "/blob/" + projectReducer.logo.blob_id}
        />
    );
};
export const LogoMainDesktopPlugin = {
    name: "mapps-layout-logo-main-desktop", // name of the header component
    type: "mapps-layout-component", // plugin type
    component: DeskoptLogo // react component to render the header
};
export const LogoMainMobilePlugin = {
    name: "mapps-layout-logo-main-mobile", // name of the header component
    type: "mapps-layout-component", // plugin type
    component: LogoMobile
};
