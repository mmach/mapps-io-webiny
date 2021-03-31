import { CommandList, QueryList } from "justshare-shared";
import ActionsGen from "../../../../App/actions";
import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions";

const NEW_OFFER_ACTIONS = {
    OPEN_LIGHTBOX: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
    REMOVE_IMAGE: ActionsGen(CommandList.Blob.REMOVE_BLOB),
    GET_CATEGORY_OPTION_FETCH: ActionsGen(QueryList.CategoryOptions.GET_CATEGORY_OPTION)
};

export default NEW_OFFER_ACTIONS;
