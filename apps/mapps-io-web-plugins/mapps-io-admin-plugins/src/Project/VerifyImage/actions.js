import { CommandList, QueryList } from "justshare-shared";
import ActionsGen from "mapps-io-base-plugins/src/App/actions";
import LIGHTBOX_ACTIONS from "mapps-io-base-plugins/src/Components/ImageLightbox/actions";

const VERIFY_IMAGE_ACTION = {
    OPEN_LIGHTBOX: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
    GET_UNVERIFIED: ActionsGen(QueryList.Blob.GET_UNVERIFIED),
    REMOVE_IMAGE: ActionsGen(CommandList.Blob.REMOVE_BLOB),
    VERIFY_IMAGE: ActionsGen(CommandList.Blob.VERIFY_IMAGE)
};

export default VERIFY_IMAGE_ACTION;
