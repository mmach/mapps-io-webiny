import { Container, Grid, IconButton, Paper } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import LinkIcon from "@material-ui/icons/Link";
import PersonIcon from "@material-ui/icons/Person";
import { BlobToVerifiedDTO, CommandList, QueryList, Translator } from "justshare-shared";
import Image from "material-ui-image";
import React from "react";
import { connect } from "react-redux";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { BodyLoader } from "mapps-io-base-plugins/src/Components/index.js";
import VERIFY_IMAGE_ACTION from "./actions.js";

class VerifyImage extends React.Component {
  constructor() {
    super();
    this.state = new BlobToVerifiedDTO();
  }

  componentDidMount() {
    this.props.getUnverifiedImages(this.state);
  }
  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    this.open = false;
  }

  removeImage(event) {
    this.props.removeImage({ id: event.currentTarget.getAttribute("data-tag") });
  }
  verifyImage(event) {
    this.props.verifyBlob({ id: event.currentTarget.getAttribute("data-tag") });
  }

  openImage() {
    this.props.openLightbox(this.props.auth.user.blob_profile, [this.props.auth.user.blob_profile]);
  }
  clickImageHandler(event) {
    this.props.verifyImage.images.forEach((item) => {
      if (item.id == event.currentTarget.getAttribute("data-tag")) {
        this.props.openLightbox(item, this.props.verifyImage.images);
        this.props.getFullsizeImage([{ id: item.blob_item.id }]);
        /*   this.props.getFullsizeImage([{ uid: item.blob_item.uid }]).then(succ=>{
                       console.log(succ);
                       item.blob_item=succ.data[0];
                       this.props.openLightbox(item, this.props.addProfile.images)
   
   
                   })
   
                   */
      }
    });
  }
  render() {
    this.init();

    if (this.props.verifyImage.getImagesIsLoading == true) {
      return <BodyLoader zIndex={3} height="85vh" size="100px" progress={50} />;
    }

    const imgList = this.props.verifyImage.images.map((item, index) => {
     
      const img = `${window.env.BLOB_URL}/blob/${item.blob_thumbmail_id}`;

      return (
        <Grid item key={index} xs="3">
          <Paper style={{ padding: "5px" }}>
            <IconButton
              data-tag={item.id}
              style={{ cursor: "pointer" }}
              onClick={this.removeImage.bind(this)}
            >
              <CloseIcon />
            </IconButton>

            <IconButton data-tag={item.id} onClick={this.verifyImage.bind(this)}>
              <CheckIcon></CheckIcon>
            </IconButton>
            {item.item_id > 0 && (
              <IconButton href="#">
                <LinkIcon></LinkIcon>
              </IconButton>
            )}
            {item.user_id > 0 && (
              <IconButton href="#">
                <PersonIcon />
              </IconButton>
            )}
            <span
              data-tag={item.id}
              onClick={this.clickImageHandler.bind(this)}
              className={" js-fancybox d-block u-block-hover u-block-hover--scale-down"}
              href="smooth-parallax-scroll/index.html"
            >
              <Image
                src={img.toString()}
                className={"img-fluid u-block-hover__main u-block-hover__img"}
              />
            </span>
          </Paper>
        </Grid>
      );
    });

    return (
      <Container>
        <Grid container>{imgList}</Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    verifyImage: state.VerifyImageReducer,
    loader: state.LoaderReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUnverifiedImages: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_UNVERIFIED, dto, null));
    },
    removeImage: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Blob.REMOVE_BLOB, dto, null));
    },
    verifyBlob: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Blob.VERIFY_IMAGE, dto, null));
    },

    openLightbox: (activeImage, images) => {
      return dispatch({
        type: VERIFY_IMAGE_ACTION.OPEN_LIGHTBOX,
        dto: {
          images: images,
          activeImage: activeImage
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyImage);
