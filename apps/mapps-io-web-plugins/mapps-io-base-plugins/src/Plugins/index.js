import {
    SearchItemFilterInitEnginePlugin,
    SearchItemFilterPlugin
} from "./Items/searchFilterPlugin";
import {
    SearchItemMapPlugin,
    SearchMapContainerPlugin,
    SearchMapPinPlugin,
    SearchMapPinTooltipPlugin
} from "./Items/searchMapPlugin";
//import SearchMapPlugin from './Items/searchMapPlugin'
import { CategoryPlugin, CategorySetLeafPlugin } from "./Components/categoryPlugin";
import {
    MenuVerticalDefaultPlugin,
    MenuHorizontalDefaultPlugin,
    MenuLinkDefaultPlugin,
    BrowserRouteDefaultPlugin,
    RouteDefaultPlugin,
    MenuHorizontalVariant2Plugin
} from "./Components/menusPlugin";

import {
    SearchItemListPlugin,
    SearchItemListElementPlugin,
    SearchItemListPaginationPlugin
} from "./Items/searchListItemPlugin";
import { SearchItemResultsViewPlugin } from "./Items/searchResultContainerPlugin";
import { PreviewItemCategoryOptionsPlugin, PreviewItemPlugin } from "./Items/previewItemPlugin";
import { ItemCreatePlugin } from "./Items/createItemPlugin";
import { UserLogoutPlugin, UserLogoutViewPlugin } from "./User/logoutPlugin";
import {
    UserLoginViewPlugin,
    UserLoginPlugin,
    UserLoginViewNoTextPlugin,
    UserLoginViewAdminPlugin
} from "./User/loginPlugin";
import { UserRegisterPlugin } from "./User/registerPlugin";
import {
    UserEditInvoicePlugin,
    UserEditPlugin,
    UserChangePasswordPlugin,
    UserForgotPasswordRedirectPlugin,
    UserForgotPasswordPlugin,
    UserInitPlugin,
    ShowUserInfoPlugin,
    UserRemovePlugin,
    UserAuthoirizePlugin,
    UserAddProfileImagePlugin,
    UserAddProfileImageVariantPlugin,
    UserEditVariantPlugin,
    UserEditInvoiceEditVariantPlugin,
    UserEditInvoiceEditDisabledPlugin,
    UserSetGeoPlugin,
    UserInitVariantOnePlugin,
    UserInitVariantTwoPlugin
} from "./User/profileUserPlugin";
import { TranslateDefaultPlugin } from "./Components/translatePlugin";
import {
    SingletonGlobalProviderPlugin,
    ConfirmAlertPlugin,
    ModalPlugin,
    DrawerPlugin,
    NotificationsPlugin,
    LightboxPlugin
} from "./Singletons/globalPlugin";

import Reducers from "./Reducers/index.js";
import { BodyLoaderPlugin } from "./Components/bodyLoaderPlugin";
import { MappsInitProviderPlugin } from "./Singletons/mappsInitPlugin";
import {
    
    MenuSingleStickyPlugin,
    FooterCollapseLayoutPlugin,
    FooterBaseRenderPlugin,
    MenuSingleStickyPluginMobile,
    FooterCollapseMobileLayoutPlugin
} from "./LayoutsComponents/layout_app.js";
import { UseDeviceTypePlugin } from "./Hooks/useDeviceType";
import {
    LanguageIconHeaderPlugin,
    LoginIconMenuHeaderPlugin,
    UserIconMenuHeaderPlugin
} from "./User/menusPlugin";
import { LogoMainDesktopPlugin, LogoMainMobilePlugin } from "./LayoutsComponents/logo";

export {
    UserInitVariantTwoPlugin,
    MenuHorizontalVariant2Plugin,
    SearchItemListPlugin,
    SearchItemListElementPlugin,
    SearchItemListPaginationPlugin,
    SearchItemFilterInitEnginePlugin,
    SearchItemFilterPlugin,
    SearchItemResultsViewPlugin,
    SearchItemMapPlugin,
    SearchMapContainerPlugin,
    SearchMapPinPlugin,
    SearchMapPinTooltipPlugin,
    CategoryPlugin,
    PreviewItemCategoryOptionsPlugin,
    PreviewItemPlugin,
    CategorySetLeafPlugin,
    ItemCreatePlugin,
    UserLogoutPlugin,
    UserLogoutViewPlugin,
    UserLoginPlugin,
    UserLoginViewPlugin,
    UserLoginViewNoTextPlugin,
    UserLoginViewAdminPlugin,
    UserRegisterPlugin,
    UserEditInvoicePlugin,
    UserEditPlugin,
    UserChangePasswordPlugin,
    UserForgotPasswordRedirectPlugin,
    UserForgotPasswordPlugin,
    UserInitPlugin,
    ShowUserInfoPlugin,
    UserRemovePlugin,
    UserAuthoirizePlugin,
    UserAddProfileImagePlugin,
    UserAddProfileImageVariantPlugin,
    UserEditVariantPlugin,
    UserEditInvoiceEditVariantPlugin,
    UserEditInvoiceEditDisabledPlugin,
    UserSetGeoPlugin,
    MenuVerticalDefaultPlugin,
    MenuHorizontalDefaultPlugin,
    MenuLinkDefaultPlugin,
    TranslateDefaultPlugin,
    ConfirmAlertPlugin,
    ModalPlugin,
    DrawerPlugin,
    NotificationsPlugin,
    LightboxPlugin,
    SingletonGlobalProviderPlugin,
    Reducers,
    MappsInitProviderPlugin,
    BodyLoaderPlugin,
    BrowserRouteDefaultPlugin,
    RouteDefaultPlugin,
    MenuSingleStickyPlugin,
    FooterCollapseLayoutPlugin,
    FooterBaseRenderPlugin,
    UseDeviceTypePlugin,
    LanguageIconHeaderPlugin,
    LoginIconMenuHeaderPlugin,
    UserIconMenuHeaderPlugin,
    LogoMainDesktopPlugin,
    LogoMainMobilePlugin,
    MenuSingleStickyPluginMobile,
    FooterCollapseMobileLayoutPlugin,
    UserInitVariantOnePlugin
};

