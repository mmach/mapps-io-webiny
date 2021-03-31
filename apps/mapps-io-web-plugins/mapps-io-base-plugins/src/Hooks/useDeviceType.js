/*
    ./client/components/App.js
*/
import { useMediaQuery } from "@material-ui/core";
import {useEffect} from 'react'
export function useDeviceType() {
    const isMobile = useMediaQuery("(max-width:500px)");
    const isMobileLandscape = useMediaQuery("(max-width:700px)");
    const isTablet = useMediaQuery("(max-width:1000px)");
    const isDesktop = useMediaQuery("(min-width:1000px)");
    const device =
        isMobile == true
            ? "mobile"
            : isMobileLandscape == true
            ? "mobileLandscape"
            : isTablet == true
            ? "tablet"
            : isDesktop == true
            ? "desktop"
            : "";

    useEffect(() => {
        
        const device =
            isMobile == true
                ? "mobile"
                : isMobileLandscape == true
                ? "mobileLandscape"
                : isTablet == true
                ? "tablet"
                : isDesktop == true
                ? "desktop"
                : "";

        localStorage["device"] = device;
    }, [isMobile, isMobileLandscape, isTablet, isDesktop]);
    return {
        device:device || localStorage.getItem('device'),
        isMobile,
        isMobileLandscape,
        isTablet,
        isDesktop
    };
}
