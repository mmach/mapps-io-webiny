import { useMediaQuery } from "@material-ui/core";
import { uiAtom } from "@webiny/app-page-builder/editor/recoil/modules/ui/uiAtom";
import { useRecoilValue } from "recoil";
import React from 'react'
export function useDeviceType() {
    const { displayMode } = useRecoilValue(uiAtom);
    const device =
        displayMode == "mobile-portrait"
            ? "mobile"
            : displayMode == "mobile-landscape"
            ? "mobileLandscape"
            : displayMode == "tablet"
            ? "tablet"
            : displayMode == "desktop"
            ? "desktop"
            : "";

    React.useEffect(() => {
        
        const device =
            displayMode == "mobile-portrait"
                ? "mobile"
                : displayMode == "mobile-landscape"
                ? "mobileLandscape"
                : displayMode == "tablet"
                ? "tablet"
                : displayMode == "desktop"
                ? "desktop"
                : "";
               
            localStorage["device"] = device;
    }, [displayMode]);
    return {
        device:device || localStorage.getItem('device'),
        isMobile: displayMode == "mobile-portrait",
        isMobileLandscape: displayMode == "mobile-landscape",
        isTablet: displayMode == "tablet",
        isDesktop: displayMode == "desktop"
    };
}
