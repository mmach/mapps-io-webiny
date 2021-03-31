import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import LIGHTBOX_ACTIONS from "../../../../../Components/ImageLightbox/actions.js";
import ResponsiveMatch from "./../../../../../Components/ResponsiveMatch/index.js";

class CategoryOptionImageShow extends React.Component {
    constructor(props) {
        super(props);
    }

    openImage(event) {
        const imgId = event.currentTarget.getAttribute("data-tag")
            ? event.currentTarget.getAttribute("data-tag")
            : event.target.getAttribute("data-tag");
        const blob = this.props.item.blobs.filter((obj) => {
            return obj.id == imgId;
        })[0];
        this.props.openLightbox(blob, this.props.item.blobs);
    }

    render() {
        return (
            <div
                className="g-pa-0 g-ma-0 "
                style={{ maxHeight: "175px", height: "175px", overflowX: "hidden" }}
            >
                <ResponsiveMatch
                    onDesktop={true}
                    onDesktopChildren={
                        <Slider
                            {...{
                                dots: true,
                                slidesToShow: 5,
                                lazyLoad: true,
                                centerMode: true,
                                swipeToSlide: true,
                                infinite: false,
                                slidesToScroll: 3,
                                speed: 300

                                //  //     slidesToShow:this.state.currentIndex
                            }}
                            ref={(ref) => {
                                this.refSlider = ref;
                            }}
                        >
                            {this.props.item.blobs.map((item, index) => {
                                const img =
                                    window.env.BLOB_URL +
                                    "/blob/" +
                                    item.blob_thumbmail_id;

                                return (
                                    <div key={index}>
                                        <div
                                            className="g-bg-gray-light-v4 g-brd-gray-light-v1 g-brd-1 g-cursor-pointer"
                                            data-tag={item.id}
                                            onClick={this.openImage.bind(this)}
                                            style={{
                                                display: "flex",
                                                alignContent: "center",
                                                alignSelf: "center",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                justifyItems: "center",
                                                flex: 1,
                                                borderStyle: "solid"
                                            }}
                                        >
                                            <a
                                                className="js-fancybox"
                                                hdata-fancybox="lightbox-gallery--col4"
                                                data-caption="Lightbox Gallery"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src={img}
                                                    alt="Image Description"
                                                    style={{
                                                        maxHeight: "170px",
                                                        height: "170px",
                                                        width: "175px",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                );

                                /*           return (
                                               <Col className=" g-brd-gray-light-v4 rounded-0   g-pa-0 g-ma-0 g-brd-around g-brd-gray-light-v3" >
                                                   <span data-tag={item.id} onClick={this.openImage.bind(this)} className=" js-fancybox d-block u-block-hover u-block-hover--scale-down" style={{ marginTop: "0px" }} >
                                                       <Img crossorigin={"Anonymous"} loading="lazy" src={img} className={"img-fluid u-block-hover__main u-block-hover__img"} style={{ overflow: 'hidden', minHeight: '175px', maxHeight: '175px' }} />
                                                   </span></Col>)*/

                                //  console.log(item);

                                // let img = item.blobs[0] ? WEB_CONFIG.BLOB_URL[NODE_ENV] + '/blob/' + item.blobs[0].blob_min_id : ''
                            })}
                        </Slider>
                    }
                    onPhone={true}
                    onPhoneChildren={
                        <Slider
                            {...{
                                dots: true,
                                slidesToShow: 2,
                                lazyLoad: true,
                                centerMode: true,
                                swipeToSlide: true,
                                infinite: this.props.item.blobs.length > 2 ? true : false,
                                slidesToScroll: 3,
                                speed: 300

                                //  //     slidesToShow:this.state.currentIndex
                            }}
                            ref={(ref) => {
                                this.refSlider = ref;
                            }}
                        >
                            {this.props.item.blobs.map((item, index) => {
                                const img =
                                    window.env.BLOB_URL +
                                    "/blob/" +
                                    item.blob_thumbmail_id;

                                return (
                                    <div key={index}>
                                        <div
                                            className="g-bg-gray-light-v4 g-brd-gray-light-v1 g-brd-1 g-cursor-pointer"
                                            data-tag={item.id}
                                            onClick={this.openImage.bind(this)}
                                            style={{
                                                display: "flex",
                                                alignContent: "center",
                                                alignSelf: "center",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                justifyItems: "center",
                                                flex: 1,
                                                borderStyle: "solid"
                                            }}
                                        >
                                            <span
                                                className="js-fancybox"
                                                hdata-fancybox="lightbox-gallery--col4"
                                                data-caption="Lightbox Gallery"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src={img}
                                                    alt="Image Description"
                                                    style={{
                                                        maxHeight: "170px",
                                                        height: "170px",
                                                        width: "175px",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                );

                                /*           return (
                                               <Col className=" g-brd-gray-light-v4 rounded-0   g-pa-0 g-ma-0 g-brd-around g-brd-gray-light-v3" >
                                                   <span data-tag={item.id} onClick={this.openImage.bind(this)} className=" js-fancybox d-block u-block-hover u-block-hover--scale-down" style={{ marginTop: "0px" }} >
                                                       <Img crossorigin={"Anonymous"} loading="lazy" src={img} className={"img-fluid u-block-hover__main u-block-hover__img"} style={{ overflow: 'hidden', minHeight: '175px', maxHeight: '175px' }} />
                                                   </span></Col>)*/

                                //  console.log(item);

                                // let img = item.blobs[0] ? WEB_CONFIG.BLOB_URL[NODE_ENV] + '/blob/' + item.blobs[0].blob_min_id : ''
                            })}
                        </Slider>
                    }
                />
            </div>
        );
    }
}
//            <MapForm readOnly coords={{ longitude: this.props.item.longitude, latitude: this.props.item.latitude }} icon={encodeURIComponent(this.props.item.category.icon)} getFromUser={false} form_text={"DUPA"}></MapForm>

const mapStateToProps = (state) => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        catOptions: state.EditCategoryReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionImageShow);
