import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import React from "react";


const Groups = [
    {
        name: "pb-editor-element-group-mapps-user",
        type: "pb-editor-page-element-group",
        group: {
            title: "MAPPS User",
            icon: <AccountCircleIcon />
        }
    },

    {
        name: "pb-editor-element-group-mapps-item",
        type: "pb-editor-page-element-group",
        group: {
            title: "MAPPS Offers/Items",
            icon: <LocalOfferIcon />
        }
    },
    {
        name: "pb-editor-element-group-mapps-common",
        type: "pb-editor-page-element-group",
        group: {
            title: "MAPPS Common",
            icon: <AccountCircleIcon />
        }
    },
    
];
export default Groups;
