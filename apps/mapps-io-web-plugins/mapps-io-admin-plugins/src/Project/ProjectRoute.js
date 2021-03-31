import DimensionAdd from "./DimensionAdd";
import DimensionToProject from "./DimensionToProject";
import MailGlobal from "./Mails/MailGlobal";
import MailsSenderView from "./Mails/MailsSenderView";
import MailsTemplatesView from "./Mails/MailsTemplatesView";
import Project from "./Project";
import ProjectStorages from "./ProjectStorages";
import SeoToProject from "./SeoToProject";
import UsersList from "./UsersList";
import UserTypes from "./UserTypes";
import VerifyImage from "./VerifyImage";

export default [
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-storage",
        component: ProjectStorages
    },

    {
        type: "mapps-admin-route",
        name: "route-mapps-project-storage-verify",
        component: VerifyImage
    },
  
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-projects",
        component: Project
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-seo",
        component: SeoToProject
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-dimmensions",
        component: DimensionToProject
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-dimmensions-add",
        component: DimensionAdd
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-user-types",
        component: UserTypes
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-users-list",
        component: UsersList
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-mails-globallist",
        component: MailGlobal
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-mails-email-accounts",
        component: MailsSenderView
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-mails-templates",
        component: MailsTemplatesView
    }
];
