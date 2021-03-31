/*
    ./client/components/App.js
*/

import React from "react";
import { Marker } from "react-leaflet";
import { connect } from "react-redux";
//import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions.js";
import "./style.scss";
import MAP_SEARCH_ACTIONS from "./actions.js";
//import ITEM_SEARCH_ACTIONS from "../ItemSearch/actions.js";

import { mappsPlugins } from "../../../index.js";

//impo

function MapPin(props) {
  //this.ref = null;
  //this.state = {};
  const [isActive, setActive] = React.useState(false);
  const markerRef = React.useRef();
  const tooltipView = React.useMemo(() =>
    mappsPlugins.byName("mapps-item-search-container-view-map-tooltip")
  );
  //componentDidUpdate() {
  //  if (this.state.isActive == true) {
  //    this.ref.leafletElement.openTooltip();
  // } else {
  //   this.ref.leafletElement.closeTooltip();
  // }
  // }

  function pinTemplate(id, color, img, length, isActive) {
    // eslint-disable-next-line no-undef
    return L.divIcon({
      html: `<div  class=" text-center">
                <svg id="${id}" class=" pin_hover" viewBox="0 0 80 80" width="40" height="${
        isActive == true ? "50" : "50"
      }" style="overflow: visible;margin-bottom:-60px">
                <defs>
                    <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                        <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"></feGaussianBlur>
                    </filter>
                    <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                        <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"></feGaussianBlur>
                    </filter>
                </defs>
                <style>
     .pin{
     cursor:pointer;
     }
     .is_active
     {
      
     }
     
     .is_loaded
     {
       animation: loaded 1s ease;
     }
     @keyframes loaded{
       0% { opacity:0}
     
       100% {  opacity:1}
     
     } 
     
     .isActive
     {
        transform:scale(1.4) translate(-8px,-22px)
     }
     .isActive {
        animation: activePin 1s ease infinite;
      }  
     .notActive:hover , .notActive:active {
       animation: hoverPin 1s ease infinite;
     }     
         .small { font: italic 13px sans-serif; }
         
     @keyframes hoverPin{
       0% { transform:scale(1.0)}
     
       50% {  transform:scale(1.2) translate(-0px,-10px)}
       100% {  transform:scale(1.0)}
     
     } 

         
     @keyframes activePin{
        0% { transform:scale(1.2) translate(-5px,-10px)}
      
        50% {  transform:scale(1.5) translate(-10px,-25px)}
        100% {  transform:scale(1.2) translate(-5px,-10px)}
      
      } 
     
              </style>
            
                <g class="is_loaded">
     <g class="pin ${isActive == true ? "isActive" : "notActive"}" >
                <rect stroke="${color}" transform="rotate(45 34.75000000000003,52.249999999999986) " id="svg_7" height="38.606601" width="42" y="32.9467" x="13.75" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="${color}"></rect>
                <ellipse stroke="${color}" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill="${color}"></ellipse>
                <ellipse stroke="${color}" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"></ellipse>
                <image xlink:href="${img}" id="svg_4" height="32" width="32" y="18" x="20"></image>
                ${
                  length > 1
                    ? `<ellipse stroke="${color}" ry="20" rx="20" id="svg_3" cy="0" cx="60" fill-opacity="null" stroke-width="1.5" fill="#fff"></ellipse>
                <text text-anchor="middle" class="g-font-size-20 g-font-weight-600" fill="${color}" x="58" y="10" font-weight="bold" font-size="23">${
                        length > 9 ? "+9" : length
                      }</text>`
                    : ""
                }
        
     </g>
                <ellipse filter="url(#svg_5_blur)" opacity="0.4" ry="11" rx="27.5" id="svg_5" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"></ellipse>
                <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"></ellipse>
               </g>
            </svg>
       
    
    </div>`,

      iconSize: [40, isActive == true ? 50 : 50],
      iconAnchor: [20, isActive == true ? 50 : 50], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -30],
      className: "marker-cluster-custom"
    });
  }

  function openTooltip() {
    if (markerRef.leafletElement) {
      markerRef.leafletElement.openTooltip();
    }
  }
  function closeTooltip() {
    if (markerRef.leafletElement) {
      markerRef.leafletElement.closeTooltip();
    }
  }
  function pinClick() {
    setActive(!isActive);
    //  props.setActiveElement(props.items[0]);
    //  props.setCurrentElement(props.items, props.latlonCenter);
  }
  function onPopupClose() {
    setActive(false);
  }

  return (
    <Marker
      eventHandlers={{
        popupopen: (e) => {
          e.target.closeTooltip();
        },
        mouseover: (e) => {
          if (isActive == true) {
            e.target.closeTooltip();
          }
        },
        mouseout: (e) => {
          if (isActive == true) {
            e.target.closeTooltip();
          }
        },
        click: pinClick
      }}
      ref={markerRef}
      position={props.latlon}
      icon={pinTemplate(
        props.items[0].id,
        props.category && props.category.color,
        window.env.BLOB_URL +
          "/blob/" +
          (props.category && props.category.icon_blob && props.category.icon_blob.blob_id),
        props.items.length,
        isActive
      )}
      data-key={props.items[0].id}
    >
      {tooltipView.render({
        openTooltip: openTooltip,
        closeTooltip: closeTooltip,
        isActive: isActive,
        onPopupClose: onPopupClose,

        config: props.config,
        cat: props.cat,
        category: props.category,
        items: props.items
      })}
    </Marker>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    lang: state.LanguageReducer,
    itemSearchReducer: state.ItemSearchReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //  setActiveElement: (activeElement) => {
    //    return dispatch({
    //      type: ITEM_SEARCH_ACTIONS.SET_ACTIVE_ELEMENT,
    //      dto: {
    //        activeElement: activeElement
    //      }
    //    });
    //  },
    setCurrentElement: (currentElements, latlon, category_id) => {
      return dispatch({
        type: MAP_SEARCH_ACTIONS.SET_CURRENT_ELEMENT,
        dto: {
          currentElements: currentElements,
          latlon: latlon,
          category_id: category_id
        }
      });
    },
    //cleanCurrentElement: (currentElement) => {
    //  return dispatch({
    //    type: ITEM_SEARCH_ACTIONS.CLEAN_CURRENT_ELEMENT
    //  });
    //},
    onMapInit: (dto) => {
      return dispatch({
        type: MAP_SEARCH_ACTIONS.ON_MAP_INIT,
        currentPosition: dto.currentPosition
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MapPin));
/*
 {
                    withoutRadius ? <span></span> : (
                        <div className="map-distance-btns">
                            <Row style={{ position: 'relative' }}>
                                <div onClick={this.zoomOut.bind(this)} className="col-xs-4 map-distance-left-btn">
                                    <span className="bm-icon" style={{ width: '100%', height: '100%' }}><i class="fa fa-minus" style={{ fontSize: '20px' }}></i></span> </div >
                                <div className="col-xs-4 map-distance-label" >
                                    <span className="bm-icon" style={{ width: '100%', height: '100%' }}><img style={{ maxWidth: '50px' }} src={radiusIcon} /><br />
                                        <span className="g-line-height-1_0 g-font-size-14 text-center">{this.props.filterSearchReducer.search.distance}</span></span>
                                </div >
                                <div onClick={this.zoomIn.bind(this)} className="col-xs-4 map-distance-right-btn"  >
                                    <span className="bm-icon" style={{ width: '100%', height: '100%' }}>
                                        <i class="fa fa-plus" style={{ fontSize: '20px' }}></i></span>

                                </div >
                            </Row>
                        </div>)
                }

<div onClick={this.setPositionOn.bind(this)} class={"map-button-group g-cursor-pointer"} style={{ zIndex: 1000, position: "absolute" }}>
<div className="map-button-group-icon" style={{ width: '48px', height: '48px' }}>
</div>
</div >

                <Menu width={'20%'} styles={{
                    bmBurgerButton: {
                        position: 'absolute',

                        right: '18px',
                        top: '5%',
                        fontSize: '17px',
                        textAlign: 'center'
                    }

                }} right customBurgerIcon={<span  ><i class="fa fa-bar-chart" style={{ fontSize: '20px' }}></i><br /><span className="g-line-height-1_0">{0}</span></span>}>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
                </Menu >*/

/*


   <Popup>

                <div xs="9" class="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left g-pa-5 rounded-0  g-mb-2">

                    <div class="media-body g-pl-5">
                        <Row>
                            <Col xs="8" >
                                <h5 class="h6 g-font-size-11 text-uppercase g-letter-spacing-1 g-font-weight-600 text-uppercase  g-color-gray-dark-v4 g-mb-1">{item.name}</h5>
                                <label class="g-line-height-1_5 g-letter-spacing-1 g-mb-1 g-font-weight-500 g-font-size-9 form-control-label">{item.category["category_" + this.props.lang]}</label>
                                <br />
                                <span data-tag={item.user.id} onClick={this.goToUser.bind(this)} className="g-letter-spacing-1 text-nowrap g-color-blue g-cursor-pointer" >
                                    {item.user.name}
                                </span>
                            </Col>
                            <Col xs="3" className="g-pa-0 g-ma-0" >
                                {item.blobs[0] ?

                                    <div class="js-fancybox d-block u-block-hover " target="_blank">


                                        <span onClick={this.openImage.bind(this)} data-item={item.id} data-tag={item.blobs[0].blob_id} class={" js-fancybox d-block u-block-hover u-block-hover--scale-down g-cursor-pointer"} href="smooth-parallax-scroll/index.html" >
                                            <Img src={img} className={"img-fluid u-block-hover__main u-block-hover__img "} />

                                        </span>
                                    </div>
                                    : <span></span>}
                            </Col>
                        </Row>
                        <div className="g-pb-10">
                            <div class="d-flex justify-content-center text-center g-mb-8 g-mt-8"><div class="d-inline-block align-self-center g-width-100 g-height-1  g-bg-gray-light-v3"></div><span class="align-self-center text-uppercase  g-color-gray-dark-v2  g-color-gray-dark-v4 g-letter-spacing-2  g-mx-5  g-font-weight-600 g-font-size-9">{tran.translate('MAP_PIN_DESCRIPTION_LABEL')}</span><div class="d-inline-block align-self-center g-width-100 g-height-1 g-bg-gray-light-v3"></div></div>
                            <Row>
                                <PreviewItemOptions item={item} on_map={true} lang={this.props.lang} col_size="6" />


                            </Row>
                        </div>
                        {item.tags.slice(0, 6).map(item => {
                            return <span class="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-1 g-cursor-pointer">{item.tag}</span>

                        })}{
                            item.tags.length > 6 ? <span className="g-pl-10">{"+" + (item.tags.length - 6) + " " + tran.translate('MAP_MORE_TAGS_LABEL')}</span> : <span></span>
                        } <span></span>
                    </div>

                </div>
            </Popup>*/
