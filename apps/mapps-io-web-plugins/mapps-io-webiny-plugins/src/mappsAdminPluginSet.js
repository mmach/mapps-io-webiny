import { useDeviceType } from "./Webiny/Hooks/useDeviceType";


export const UseDeviceTypePlugin = {
    name: "mapps-item-use-device-type-builder",
    type: "mapps-item-hook",
    // eslint-disable-next-line react/display-name
    useHook:useDeviceType
};
