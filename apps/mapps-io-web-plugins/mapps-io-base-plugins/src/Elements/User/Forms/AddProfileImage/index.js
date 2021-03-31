import { BlobBase64DTO, CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "./../../../../App/index.js";
import { LIGHTBOX_ACTIONS } from "./../../../../Components/index.js";
import { mappsPlugins } from "./../../../../index.js";
import { AUTH_ACTIONS } from "./../../../../Reducers/index.js";
//import noprofilepic from "./../../../../assets/img/noprofilepic.jpg";
import ADD_PROFILE_IMAGE_ACTIONS from "./actions.js";

class AddProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      images: [],
      uploadLoading: false,
      files: []
    };
    this.view = mappsPlugins.byName(this.props.mappsSettings.mappsNameViewPlugin);
  }

  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    this.open = false;
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    //this.props.getUserImages({ user_id: this.props.auth.user.id }).then((succ) => {
    //});
  }
  componentDidMount() {
    //this.props.getUserImages({ user_id: this.props.auth.user.id }).then((succ) => {
    //});
  }
  removeImage(event) {
    // this.props.loading(true);
    const id = event.currentTarget.dataset.tag;
    this.props
      .removeImage({ id: id })
      .then(() => {
        return this.props.getUserImages({ user_id: this.props.auth.user.id });
      })
      .then(() => {
        return this.props.geUserInfo();
      })
      .then((succData) => {
        this.props.newUserContext(succData.data);
      });
  }
  setAsProfile(event) {
    this.props.loading(true);

    this.props.setAsProfile({ blob_id: event.currentTarget.dataset.tag }).then((succUser) => {
      this.props.newUserContext(succUser.data);
      this.props.loading(false);
    });
  }

  uploadImage() {
    const dto = new BlobBase64DTO();
    dto.id = uuid();
    dto.blob = this.state.file.base64.split("base64,")[1];
    dto.type = this.state.file.type;
    this.props.loading(true);

    this.props.uploadImage(dto).then(() => {
      this.props
        .getUserImages({ user_id: this.props.auth.user.id })
        .then(() => {
          return this.props.geUserInfo();
        })
        .then((succUser) => {
          this.props.newUserContext(succUser.data);
          this.props.loading(false);
        });
    });
  }
  clickImageHandler(event) {
    this.state.images.forEach((item) => {
      if (item.id == event.currentTarget.dataset.tag) {
        this.props.openLightbox(item, this.state.images);
      }
    });
  }
  handleChange(files) {
    // Process each file
    const allFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Make new FileReader
      const reader = new window.FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = async () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file
        };

        // Push it to the state
        allFiles.push(fileInfo);
        this.setState({
          files: allFiles
        });
        // If all files have been proceed
      }; // for
    }
  }
  async submitHanlder() {
    this.setState({ uploadLoading: true });
    const prom = this.state.files.map((i) => {
      // Apply Callback function
      const dto = new BlobBase64DTO();
      dto.id = uuid();
      dto.blob = i.base64.split("base64,")[1];
      dto.type = i.type;

      return this.props.uploadImage(dto);
    });

    await Promise.all(prom);
    this.props
      .getUserImages({ user_id: this.props.auth.user.id })
      .then(() => {
        this.setState({
          files: []
        });
        return this.props.geUserInfo();
      })
      .then((succUser) => {
        this.props.newUserContext(succUser.data);
        this.setState({ uploadLoading: false });
      });
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    return this.view ? (
      this.view.render({
        images: this.props.addProfile.images,
        uploadLoading: this.state.uploadLoading,
        handleChange: this.handleChange.bind(this),
        files: this.state.files,
        submitHanlder: this.submitHanlder.bind(this),
        removeImage: this.removeImage.bind(this),
        clickImageHandler: this.clickImageHandler.bind(this),
        _clickImageHandler: this.clickImageHandler.bind(this),
        blob_id: this.props.auth.user.blob_id,
        setAsProfile: this.setAsProfile.bind(this),
        tran: tran
      })
    ) : (
      <span>SET VARIANT</span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    addProfile: state.AddProfileImageReducer,
    loader: state.LoaderReducer,
    currentUser: state.UserImageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserImages: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null));
    },
    removeImage: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Blob.REMOVE_BLOB, dto, null));
    },
    uploadImage: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Blob.UPLOAD_IMAGE, dto, null));
    },

    geUserInfo: () => {
      return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, {}, null));
    },

    getUserImages: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null));
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
    loading: (loadingState) => {
      return dispatch({
        type: ADD_PROFILE_IMAGE_ACTIONS.ADD_PROFILE_IMAGE_LOADING,
        dto: {
          loading: loadingState
        }
      });
    },

    newUserContext: (user) => {
      return dispatch({
        type: AUTH_ACTIONS.IS_AUTH,
        dto: {
          user: user
        }
      });
    },
    setAsProfile: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.User.SET_PROFILE_IMAGE, dto, null)
      ).then(() => {
        return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, {}));
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddProfileImage));
