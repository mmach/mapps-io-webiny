import React from "react";

import Image from "material-ui-image";
import { Translator } from "justshare-shared";
import { connect } from "react-redux";

class ImageProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    let img = this.props.default;
    let uid = 0;
    let hasImg = false;
    let isVerified = 1;
    if (this.props.blob_profile != null) {
      img = window.enb.BLOB_URL + "/blob/" + this.props.blob_profile.blob_thumbmail_id;

      // img = `data:${this.props.blob_profile.blob_thumbmail.type};base64,${this.props.blob_profile.blob_thumbmail.blob}`
      uid = this.props.blob_profile.blob_item.uid;
      hasImg = true;
      isVerified = this.props.blob_profile.status;
    }
    // <div id="loading-text">LOADING <br />{this.props.progress + "%"}</div>
    return (
      <div
        className="u-block-hover g-pos-rel   js-width-lg-100p  js-width-xl-100p  js-width-sm-30p  js-width-md-30p  js-width-xs-60p"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "top",
          alignSelf: "center",
          alignContent: "center",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <figure>
          <Image data-tag={uid} src={img} />
        </figure>

        {hasImg == true && isVerified == 1 ? (
          <figcaption
            onClick={this.props.openImage}
            className="u-block-hover__additional--fade g-cursor-pointer g-bg-white-opacity-0_5 g-pa-30"
          >
            <div className="u-block-hover__additional--fade u-block-hover__additional--fade-up g-flex-middle"></div>
          </figcaption>
        ) : undefined}
        {hasImg == true && 1 == 0 /*UNUSED*/ ? (
          <span className="g-pos-abs g-bottom-0 g-right-0">
            <a className="hidden btn btn-sm u-btn-primary rounded-0" href="#">
              Użytkownik
            </a>
            <small className="d-block g-bg-black-opacity-0_5 g-color-white g-pa-5">
              {isVerified == 1 ? (
                <span>{this.props.title}</span>
              ) : (
                <span className="h6 text-uppercase  g-color-white g-letter-spacing-2 g-font-weight-600 text-uppercase text-center">
                  {this.tran.translate("IMAGE_NOT_VERIFIED")}
                </span>
              )}
            </small>
          </span>
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageProfile);
