import ButtonLoader from "./FormComponent/Components/ButtonLoader/index.js";
import Checkbox from "./FormComponent/Components/Checkbox/index.js";
import DropDownList from "./FormComponent/Components/DropDownList/index.js";
import TagComponent from "./FormComponent/Components/TagComponent/index.js";
import TextArea from "./FormComponent/Components/TextArea/index.js";
import TextBox from "./FormComponent/Components/TextBox/index.js";
import MODAL_ACTIONS from "./ModalComponent/actions.js";
import ModalComponentReducer from "./ModalComponent/reducer.js";
import ImageLightboxReducer from "./ImageLightbox/reducer.js";
import LIGHTBOX_ACTIONS from "./ImageLightbox/actions.js";
import ImageLightbox from "./ImageLightbox/index.js";
import { NOTIFICATIONS_ACTIONS } from "./Notifications/actions.js";
import NotificationReducer from "./Notifications/reducer.js";
import Notifications from "./Notifications/index.js";
import FadeIn from "./FadeIn/index.js";
import BodyLoader from "./Loader/BodyLoader/index.js";
import TranslateCompnent from "./TranslateCompnent/index.js";
import DayPickerInputComponent from "./FormComponent/Components/DayPickerInputComponent/index.js";
import PdfViewer from "./PdfViewer/index.js";
import DialogConfirm from "./ConfirmAlert/index.js";
import ResponsiveMatch from "./ResponsiveMatch/index.js";
import TranslateText from "./TranslateText/index.js";
import DialogAlertReducer from "./ConfirmAlert/reducer.js";
import DIALOG_ALERT_ACTIONS from "./ConfirmAlert/actions.js";
import MenuCategoriesVertical from "./MenuCategoriesVertical/index.js";
import MapForm from "./MapForm/index.js";
import ShareComponent from "./ShareComponent/index.js";
import CategoryFilter from "./CategoryFilter/index.js";
import TextBoxDebounce from "./FormComponent/Components/TextBoxDebounce/index.js";
import DrawerComponentReducer from "./DrawerComponent/reducer.js";
import DRAWER_ACTIONS from "./DrawerComponent/actions.js";
import MenuVariant2 from "./MenuCategoriesVertical/variant2.js";

const ComponentsReducers = {
    ModalComponentReducer,
    ImageLightboxReducer,
    NotificationReducer,
    DialogAlertReducer,
    DrawerComponentReducer
};

export {
    CategoryFilter,
    MapForm,
    DIALOG_ALERT_ACTIONS,
    BodyLoader,
    FadeIn,
    TextBoxDebounce,
    TranslateText,
    Notifications,
    NOTIFICATIONS_ACTIONS,
    DropDownList,
    TagComponent,
    ButtonLoader,
    Checkbox,
    DayPickerInputComponent,
    TextArea,
    TextBox,
    LIGHTBOX_ACTIONS,
    MODAL_ACTIONS,
    ComponentsReducers,
    ImageLightbox,
    TranslateCompnent,
    PdfViewer,
    DialogConfirm,
    MenuCategoriesVertical,
    ResponsiveMatch,
    ShareComponent,
    DRAWER_ACTIONS,
    MenuVariant2
};
