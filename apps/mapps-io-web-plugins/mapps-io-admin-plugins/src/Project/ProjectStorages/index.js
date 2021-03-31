/*
    ./client/components/App.jsx
*/

import { Container, Grid, IconButton, Paper, Tooltip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ShareIcon from "@material-ui/icons/Share";
import {
    BlobBase64DTO,
    BlobToVerifiedDTO,
    CommandList,
    QueryList,
    Translator
} from "justshare-shared";
import { DropzoneArea } from "material-ui-dropzone";
import Image from "material-ui-image";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { ButtonLoader, LIGHTBOX_ACTIONS } from "mapps-io-base-plugins/src/Components/index.js";

class ProjectStorages extends React.Component {
  constructor(props) {
    super(props);
    this.state = new BlobToVerifiedDTO();
    this.state.type = this.props.storage;
    this.state.images = [];
    this.state.files = [];
    this.btnRef = React.createRef();
    this.state.uploadLoading = false;
  }

  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.storage != this.props.storage) {
      this.props
        .getProjectStorage({
          type: this.props.storage
        })
        .then((succ) => {
          this.setState({
            images: succ.data
          });
        });
    }
  }
  componentDidMount() {
    this.props.getProjectStorage(this.state).then((succ) => {
      this.setState({
        images: succ.data
      });
    });
  }
  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    this.open = false;
  }

  async removeImage(event) {
    await this.props.removeImage({ id: event.currentTarget.dataset.tag });
    const succ = await this.props.getProjectStorage({
      type: this.props.storage
    });

    this.setState({
      images: succ.data
    }); // reader.onload
  }
  verifyImage(event) {
    this.props.verifyBlob({ id: event.currentTarget.dataset.tag });
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

      return this.props.uploadBlob(dto);
    });

    await Promise.all(prom);
    const succ = await this.props.getProjectStorage({
      type: this.props.storage
    });

    this.setState({
      images: succ.data,
      files: [],
      uploadLoading: false
    }); // reader.onload
  }
  render() {
    this.init();

    const imgList = this.state.images
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .map((item) => {
        const img = `${window.env.BLOB_URL}/blob/${item.blob_min_id}`;

        return (
          <Grid item xs={3} key={item.id}>
            <Paper style={{ padding: "5px" }}>
              <IconButton
                data-tag={item.id}
                style={{ cursor: "pointer" }}
                onClick={this.removeImage.bind(this)}
              >
                <CloseIcon />
              </IconButton>

              <span data-tag={item.id}>
                <Image src={img.toString()} />
              </span>
              <Grid container style={{ marginTop: "5px" }}>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <Tooltip className title={"Original size"}>
                    <CopyToClipboard text={`${window.env.BLOB_URL}/blob/${item.blob_id}`}>
                      <IconButton style={{ marginTop: "-3px", cursor: "pointer" }}>
                        <ShareIcon />
                      </IconButton>
                    </CopyToClipboard>
                  </Tooltip>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <Tooltip className title={"Min size"}>
                    <CopyToClipboard text={`${window.env.BLOB_URL}/blob/${item.blob_min_id}`}>
                      <IconButton style={{ marginTop: "-3px" , cursor: "pointer"}}>
                        <ShareIcon />
                      </IconButton>
                    </CopyToClipboard>
                  </Tooltip>
                </Grid>

                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <Tooltip className title={"Thumbmail size"}>
                    <CopyToClipboard text={`${window.env.BLOB_URL}/blob/${item.blob_thumbmail_id}`}>
                      <IconButton style={{ marginTop: "-3px", cursor: "pointer" }}>
                        <ShareIcon />
                      </IconButton>
                    </CopyToClipboard>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      });

    return (
      <div >
      
        <Container>
          {this.props.storage == "PROJECT" && (
            <div>
              <DropzoneArea
                onChange={this.handleChange.bind(this)}
                filesLimit={10}
                initialFiles={this.state.files}
                maxFileSize={10000000}

              />
              <ButtonLoader
                onClick={this.submitHanlder.bind(this)}
                size={"md"}
                color={"primary"}
                value={this.tran.translate("Save")}
                isLoading={this.state.uploadLoading}
              />
            </div>
          )}
          <Grid container spacing={3}>
            {imgList}
          </Grid>
        </Container>
      </div>
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
    loader: state.LoaderReducer,
    config: state.ConfigReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectStorage: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_PROJECT_STORAGE, dto, null));
    },
    removeImage: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Blob.REMOVE_BLOB, dto, null));
    },
    uploadBlob: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Blob.UPLOAD_BLOB_TO_PROJECT, dto, null)
      );
    },

    openLightbox: (activeImage, images) => {
      return dispatch({
        type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
        dto: {
          images: images,
          activeImage: activeImage
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStorages);
