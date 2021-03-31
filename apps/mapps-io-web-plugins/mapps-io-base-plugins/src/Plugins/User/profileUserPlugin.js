import React from "react";
import {
    AuthorizeUser,
    ChangePassword,
    EditUser,
    EditUserInvoiceValue,
    ForgotPassword,
    ForgotPasswordRedirect,
    RemoveUser,
    UserInfo,
    UserImageProfile,
    AddProfileImage
} from "../../Elements";
import AddProfileImageVariant from "./../../Elements/User/Forms/AddProfileImage/View/Desktop/variant1";

import EditUserVariant from "./../../Elements/User/Forms/EditUser/View/Desktop/admin.js";
import EditUserVariantDisabledVariant from "./../../Elements/User/Forms/EditUserInvoiceValue/View/Desktop/disabled";
import EditUserVariantVariant from "./../../Elements/User/Forms/EditUserInvoiceValue/View/Desktop/admin";
import SetLangLong from "../../Elements/User/Forms/SetLatlng";
import UserPreviewInitVariant1 from "./../../Elements/User/Forms/UserImage/View/variantOne.js";
import UserPreviewInitVariant2 from "./../../Elements/User/Forms/UserImage/View/variantTwo.js";

export const UserSetGeoPlugin = {
    name: "mapps-user-editable-set-geo",
    type: "mapps-user-editable-geo",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <SetLangLong {...props}></SetLangLong>;
    }
};

export const UserInitPlugin = {
    name: "mapps-user-editable-show-user-init",
    type: "mapps-user-editable-init",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <UserImageProfile {...props}></UserImageProfile>;
    }
};
export const UserInitVariantOnePlugin = {
    name: "mapps-user-editable-show-user-init-variant1",
    parent: "mapps-user-editable-show-user-init",
    type: "mapps-user-editable-init-variant",
    // eslint-disable-next-line react/display-name
    component: UserPreviewInitVariant1
};
export const UserInitVariantTwoPlugin = {
    name: "mapps-user-editable-show-user-init-variant2",
    parent: "mapps-user-editable-show-user-init",
    type: "mapps-user-editable-init-variant",
    // eslint-disable-next-line react/display-name
    component: UserPreviewInitVariant2
};
export const ShowUserInfoPlugin = {
    name: "mapps-user-editable-show-user-info",
    type: "mapps-user-editable-user-info",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <UserInfo {...props}></UserInfo>;
    }
};

export const UserAuthoirizePlugin = {
    name: "mapps-user-editable-authorize",
    type: "mapps-user-editable-redirect",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <AuthorizeUser {...props}></AuthorizeUser>;
    }
};
export const UserForgotPasswordPlugin = {
    name: "mapps-user-editable-password-forgot-password",
    type: "mapps-user-editable-actions",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <ForgotPassword {...props}></ForgotPassword>;
    }
};
export const UserAddProfileImagePlugin = {
    name: "mapps-user-editable-add-profile-image",
    type: "mapps-user-editable-actions",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <AddProfileImage {...props}></AddProfileImage>;
    }
};
export const UserAddProfileImageVariantPlugin = {
    name: "mapps-user-editable-add-profile-image-variant",
    parent: "mapps-user-editable-add-profile-image",
    type: "mapps-user-editable-actions-variant",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <AddProfileImageVariant {...props}></AddProfileImageVariant>;
    }
};
export const UserForgotPasswordRedirectPlugin = {
    name: "mapps-user-editable-password-forgot-redirect",
    type: "mapps-user-editable-redirect",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <ForgotPasswordRedirect {...props}></ForgotPasswordRedirect>;
    }
};
export const UserChangePasswordPlugin = {
    name: "mapps-user-editable-password-change",
    type: "mapps-user-editable-actions",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <ChangePassword {...props}></ChangePassword>;
    }
};

export const UserRemovePlugin = {
    name: "mapps-user-editable-remove-account",
    type: "mapps-user-editable-actions",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <RemoveUser {...props}></RemoveUser>;
    }
};
export const UserEditPlugin = {
    name: "mapps-user-editable-user",
    type: "mapps-user-editable-actions",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <EditUser {...props} editable={true}></EditUser>;
    }
};
export const UserEditVariantPlugin = {
    name: "mapps-user-editable-edit-variant",
    parent: "mapps-user-editable-edit",
    type: "mapps-user-editable-actions-view",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <EditUserVariant {...props} editable={true}></EditUserVariant>;
    }
};

export const UserEditInvoicePlugin = {
    name: "mapps-user-editable-edit-invoice",
    type: "mapps-user-editable-actions",
    // eslint-disable-next-line react/display-name
    render: props => {
        return <EditUserInvoiceValue {...props}></EditUserInvoiceValue>;
    }
};

export const UserEditInvoiceEditVariantPlugin = {
    name: "mapps-user-editable-edit-invoice-editable-variant",
    type: "mapps-user-editable-actions-variant",
    parent: "mapps-user-editable-edit-invoice",

    // eslint-disable-next-line react/display-name
    render: props => {
        return <EditUserVariantVariant {...props}></EditUserVariantVariant>;
    }
};
export const UserEditInvoiceEditDisabledPlugin = {
    name: "mapps-user-editable-edit-invoice-disabled-variant",
    type: "mapps-user-editable-actions-variant",
    parent: "mapps-user-editable-edit-invoice",

    // eslint-disable-next-line react/display-name
    render: props => {
        return (
            <EditUserVariantDisabledVariant
                {...props}
                editable={true}
            ></EditUserVariantDisabledVariant>
        );
    }
};
