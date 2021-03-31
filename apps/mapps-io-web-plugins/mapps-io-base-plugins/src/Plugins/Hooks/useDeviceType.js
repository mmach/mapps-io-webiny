import { useDeviceType } from "../../Hooks/useDeviceType";


export const UseDeviceTypePlugin = {
    name: "mapps-item-use-device-type",
    type: "mapps-item-hook",
    // eslint-disable-next-line react/display-name
    useHook:useDeviceType
};
