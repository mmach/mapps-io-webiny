/*
    ./client/components/App.js
*/

import { QueryList } from "justshare-shared";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useLocation } from "react-router-dom";
import { isUuid } from "uuidv4";
import { mappsPlugins } from "../../../../index.js";
import { BaseService } from "./../../../../App/index.js";
import { DRAWER_ACTIONS, LIGHTBOX_ACTIONS } from "./../../../../Components";
import USER_PROFILE_IMAGE from "./actions.js";
//import { Map } from 'react-leaflet';

function UserImageProfile(props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [images, setImages] = React.useState([]);
    const location = useLocation();

    const MenuQuery = React.useMemo(() => mappsPlugins.byName("mapps-menu-link-query").component);
    const Variant = React.useMemo(() => props.mappsSettings.mappsNameViewPlugin && mappsPlugins.byName(props.mappsSettings.mappsNameViewPlugin).component);

    const MenuComponent = React.useMemo(
        () =>
           
            mappsPlugins.byName(props.mappsSettings.mappsNameMenuPlugin).render
    );

    const userId = React.useMemo(() => {
        return new URLSearchParams(location.search).get("user_id");
    });
    function clickImageHandler() {
        props.openLightbox(props.currentUser.user.blob_profile, props.addProfile.images);
    }

    useEffect(() => {
        let prom = undefined;
        if (userId == props.currentUser.user.id) {
            return;
        }
        if (isUuid(userId)) {
            prom = props.getUserInfo({ id: userId });
        } else {
            prom = props.getUserInfo({ id: props.auth.user.id });
        }
        props.setLoading(true);
        prom.then(succ => {
            return props.getUserImages({ user_id: succ.data.id });
        })
            .then(succ => {
                return setImages(succ.data);
            })
            .then(() => {
                props.setLoading(false);
            });
    }, [userId]);

    return (
      Variant && Variant(MenuQuery, props, clickImageHandler, MenuComponent)
    );
}

const mapStateToProps = state => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        latlng: state.SetLatlngReducer,
        auth: state.AuthReducer,
        currentUser: state.UserImageReducer,
        addProfile: state.AddProfileImageReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
       openDrawer: (open, body, anchor, menu) => {
            dispatch({
                type: DRAWER_ACTIONS.OPEN_DRAWER,
                dto: {
                    open: open,
                    body: body,
                    anchor: anchor,
                    menu: menu
                }
            });
        },
        getUserInfo: dto => {
            return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, dto, null));
        },
        openLightbox: (activeImage, images) => {
            return dispatch({
                type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
                dto: {
                    images: images,
                    activeImage: activeImage
                }
            });
        },
        getUserImages: dto => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null)
            );
        },
        setLoading: isLoading => {
            return dispatch({
                type: USER_PROFILE_IMAGE.SET_LOADING,
                dto: isLoading
            });
        },
        openLightbox: (activeImage, images) => {
            return dispatch({
                type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
                dto: {
                    images: images,
                    activeImage: activeImage
                }
            });
        }
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(React.memo(UserImageProfile))
);
