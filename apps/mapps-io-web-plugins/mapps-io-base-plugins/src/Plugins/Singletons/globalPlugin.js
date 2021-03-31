import React from "react";
import Loadable from "react-loadable";
import { mappsPlugins } from "../../index.js";

const ModalComponent = Loadable({
    loader: () => import("../../Components/ModalComponent/index.js"),
    loading() {
        return <span></span>;
    }
});
const DrawerComponent = Loadable({
    loader: () => import("../../Components/DrawerComponent/index.js"),
    loading() {
        return <span></span>;
    }
});
const ImageLightbox = Loadable({
    loader: () => import("../../Components/ImageLightbox/index.js"),
    loading() {
        return <span></span>;
    }
});

const Notification = Loadable({
    loader: () => import("../../Components/Notifications/index.js"),
    loading() {
        return <div></div>;
    }
});
const ConfirmAlert = Loadable({
    loader: () => import("../../Components/ConfirmAlert/index.js"),
    loading() {
        return <div></div>;
    }
});

export const SingletonGlobalProviderPlugin = {
    name: "mapps-item-global-provider-singleton",
    type: "mapps-item-global-provider",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        const Singletons = mappsPlugins.byType("mapps-item-global-singleton");

        return (
            <>
                {Singletons.map((i, index) => {
                    return i.render({ ...props, key: index });
                })}
            </>
        );
    }
};

export const ModalPlugin = {
    name: "mapps-singleton-modal",
    type: "mapps-item-global-singleton",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <ModalComponent {...props}></ModalComponent>;
    }
};

export const DrawerPlugin = {
    name: "mapps-singleton-drawer",
    type: "mapps-item-global-singleton",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <DrawerComponent {...props}></DrawerComponent>;
    }
};

export const LightboxPlugin = {
    name: "mapps-singleton-image-lightbox",
    type: "mapps-item-global-singleton",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <ImageLightbox {...props}></ImageLightbox>;
    }
};

export const NotificationsPlugin = {
    name: "mapps-singleton-notification",
    type: "mapps-item-global-singleton",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <Notification {...props}></Notification>;
    }
};

export const ConfirmAlertPlugin = {
    name: "mapps-singleton-confirm-alert",
    type: "mapps-item-global-singleton",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <ConfirmAlert {...props}></ConfirmAlert>;
    }
};
