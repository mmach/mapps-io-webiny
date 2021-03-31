/*
    ./client/components/App.js
*/

import { Grid, IconButton } from "@material-ui/core";
//import ITEM_SEARCH_ACTIONS from "../ItemSearch/actions.js";
import React from "react";
import { connect } from "react-redux";
import FITLER_SEARCH_ACTIONS from "../SearchItemFilterPanel/actions";
//import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions.js";

import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

//impo

function ListSearchButton(props) {
  //this.ref = null;
  //this.state = {};
  const [isActive, setActive] = React.useState(false);

  React.useEffect(() => {
    if (props.filterSearchReducer.search.view == props.mappsKey) {
      setActive(true);
    }else{
      setActive(false);
    }
  }, [props.filterSearchReducer.search.view]);
  function onMapView() {
    if (isActive == false) {
      const obj = props.filterSearchReducer.search;
      obj.grouping = undefined;
      obj.page = 0;
      obj.size = 20;
      obj.distance = "all";
      obj.view = props.mappsKey;
      props.setSearchParams({ ...obj, version: obj.version + 1 });
    }
    setActive(true);
  }
  return (
    <Grid item>
      <IconButton onClick={onMapView}>
        <FormatListBulletedIcon color={isActive ? "primary" : "default"} />
      </IconButton>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    lang: state.LanguageReducer,
    filterSearchReducer: state.FilterSearchReducer,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchParams: (search) => {
      return dispatch({
        type: FITLER_SEARCH_ACTIONS.SET_SEARCH_PARAMS,
        dto: {
          search: search
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListSearchButton));
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
