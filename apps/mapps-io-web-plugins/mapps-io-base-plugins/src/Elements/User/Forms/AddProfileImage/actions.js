import { QueryList, CommandList } from "justshare-shared";
import ActionsGen from "../../../../App/actions";

const ADD_PROFILE_IMAGE_ACTIONS = {

    GET_USER_IMAGES: ActionsGen(QueryList.Blob.GET_USER_IMAGES),
    REMOVE_IMAGE: ActionsGen(CommandList.Blob.REMOVE_BLOB),
    UPLOAD_IMAGE: ActionsGen(CommandList.Blob.UPLOAD_IMAGE),

    ADD_PROFILE_IMAGE_LOADING: "ADD_PROFILE_IMAGE_LOADING"
};

export default ADD_PROFILE_IMAGE_ACTIONS;
