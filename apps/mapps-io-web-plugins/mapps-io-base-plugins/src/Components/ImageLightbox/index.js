/*
    ./client/components/App.js
*/

import React from "react";
import Image from "material-ui-image";
import { connect } from "react-redux";
import LIGHTBOX_ACTIONS from "./actions.js";
import { Backdrop, Grid, Container } from "@material-ui/core";
import { uuid } from "uuidv4";

class ImageLightbox extends React.Component {
  constructor() {
    super();
    this.open = false;
    this.isLoading = false;
  }

  thumbmailClickHandler(event) {
    this.props.getImage({ id: event.currentTarget.getAttribute("data-tag") });
  }

  init() {
    this.open = false;
  }

  closeLightboxHandler() {
    this.props.closeLightbox(false);
  }

  render() {
    if (this.props.lightbox.open == false) {
      return <span></span>;
    }
    const img = this.props.lightbox.activeImage
      ? `${window.env.BLOB_URL}/blob/${this.props.lightbox.activeImage.blob_item.id}`
      : "";
    /*imageStyle={{maxHeight:'80vh',maxWidth:'70vw',height:'auto',width:'auto'}} */
    let lightboxBody = undefined;
    if (this.props.lightbox.imageList.length > 1) {
      lightboxBody = (
        <Grid container style={{ height: "100vh" }}>
          <Grid key={uuid()} item xs="10" onClick={this.closeLightboxHandler.bind(this)}>
            <Container
              style={{
                display: "flex",
                alignItems: "center",
                height: "100vh",
                justifyContent: "center"
              }}
            >
              <Image
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  padding: "0px",
                  display: "flex",
                  justifyContent: "center"
                }}
                imageStyle={{
                  maxHeight: "80vh",
                  maxWidth: "70vw",
                  height: "auto",
                  width: "auto",
                  position: "relative"
                }}
                src={img.toString()}
              />
            </Container>
          </Grid>

          <Grid
            item
            xs="2"
            style={{
              placeSelf: "flex-start",
              backgroundColor: "rgba(0,0,0,0.6)",
              height: "100vh",
              padding: "20px"
            }}
          >
            <Grid container spacing={1}>
              {this.props.lightbox.imageList.map((item) => {
                const actualId = this.props.lightbox.activeImage
                  ? this.props.lightbox.activeImage.id
                  : 0;
                return (
                  <Grid item xs="6" key={item.blob_thumbmail.id}>
                    <span
                      data-tag={item.blob_item.id}
                      onClick={this.thumbmailClickHandler.bind(this)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        loading="lazy"
                        src={`${window.env.BLOB_URL}/blob/${item.blob_min_id}`}
                        style={{
                          backgroundColor:'rgba(255,255,255,0)',
                          border: actualId == item.id ? "5px solid rgba(255,255,255,0.5)" : "5px solid rgba(255,255,255,0.0)"
                        }}
                      />
                    </span>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      );
    }
    const body = (
      <Backdrop style={{ zIndex: 1000 }} open={this.props.lightbox.open}>
        {lightboxBody}
      </Backdrop>
    );

    return body;
  }
}

const mapStateToProps = (state) => {
  return {
    lightbox: state.ImageLightboxReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /*   openLightbox: (open, action) => {
               dispatch({
                   type: LIGHTBOX_ACTIONS.OPEN_MODAL,
                   dto: {
                       open: open,
                       action: action
                   }
               });
           },*/
    getImage: (id) => {
      dispatch({
        type: LIGHTBOX_ACTIONS.SET_ACTIVE_IMG_LIGHTBOX,
        dto: id
      });
    },
    closeLightbox: () => {
      dispatch({
        type: LIGHTBOX_ACTIONS.CLOSE_LIGHTBOX,
        dto: {
          open: false
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageLightbox);
