import { QueryList } from "justshare-shared";
import React from "react";
import { geolocated } from "react-geolocated";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "../../../../../App/Architecture/baseServices.js";
import MapForm from "../../../../../Components/MapForm/index.js";

//import { Map } from 'react-leaflet';
//delete L.Icon.Default.prototype._getIconUrl;

/*L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});*/

class CategoryOptionFormGEO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    this.state.geo = this.props.values ? this.props.values : [0, 0];
    this.state.latitude = this.state.geo[0];
    this.state.longitude = this.state.geo[1];
    this.state.markers = [];
    this.state.location = {
      lat: this.props.auth.user.latitude,
      lon: this.props.auth.user.longitude
    };

    this.state.catOption =
      this.props.optionValue != undefined && this.props.optionValue.length > 0
        ? this.props.optionValue
        : [
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 6;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 6;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 4;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 4;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 3;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 3;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 2;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 2;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 5;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 5;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 7;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 7;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 1;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 1;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 8;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 8;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 9;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 9;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 10;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 10;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 12;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 12;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 13;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 13;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            },
            {
              id: uuid(),
              cat_opt_id: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 14;
              })[0].id,
              val: "",
              element: this.props.catOption.id,
              type: "GEO",
              catOption: this.props.catOption.cat_opt_temp.filter((item) => {
                return item.order == 14;
              })[0],
              col_id: this.props.catOption.category_link[0].id,
              dim_id: this.props.catOption.dim_id
            }
          ];
    this.state.catOption = this.state.catOption.map((i) => {
      return { ...i, co_temp_id: i.cat_opt_id };
    });
    if (this.props.optionValue != undefined && this.props.optionValue.length > 0) {
      this.state.location = {
        lat: this.props.optionValue.filter((i) => i.catOption.order == 2)[0].val,
        lon: this.props.optionValue.filter((i) => i.catOption.order == 1)[0].val,
        address: {
          country: this.props.optionValue.filter((i) => i.catOption.order == 3)[0].val,
          country_id: this.props.optionValue.filter((i) => i.catOption.order == 4)[0].val,
          city: this.props.optionValue.filter((i) => i.catOption.order == 5)[0].val,
          city_id: this.props.optionValue.filter((i) => i.catOption.order == 6)[0].val,
          road: this.props.optionValue.filter((i) => i.catOption.order == 7)[0].val,
          postcode: this.props.optionValue.filter((i) => i.catOption.order == 8)[0].val,
          flat_number: this.props.optionValue.filter((i) => i.catOption.order == 9)[0].val,
          county: this.props.optionValue.filter((i) => i.catOption.order == 10)[0].val,
          state: this.props.optionValue.filter((i) => i.catOption.order == 12)[0].val,
          neighbourhood: this.props.optionValue.filter((i) => i.catOption.order == 13)[0].val,
          house_number: this.props.optionValue.filter((i) => i.catOption.order == 14)[0].val
        }
      };
    }
  }

  shouldComponentUpdate(prev) {
    if (
      this.props.itemCategories.filter((item) => {
        const itemMatched = prev.itemCategories.filter((item2) => {
          return item.id == item2.id && item.col_id == this.props.catOption.category_link[0].id;
        })[0];
        return itemMatched && itemMatched.val != item.val;
      }).length !=
      this.props.itemCategories.filter((item) => {
        return item.col_id == this.props.catOption.category_link[0].id;
      }).length
    ) {
      // this.sync();
      return true;
    }
    return false;
  }

  onChange(state) {
    if (state.lat != this.state.location.lat || state.lon != this.state.location.lon) {

      const result = this.state.catOption.map((i) => {
        const obj = { ...i };
        switch (i.catOption.order) {
          case 1: {
            obj.val = state.lon;
            break;
          }
          case 2: {
            obj.val = state.lat;
            break;
          }
          case 3: {
            obj.val = state.address.country;
            break;
          }
          case 4: {
            obj.val = state.address.country_id;
            break;
          }
          case 5: {
            obj.val = state.address.city;
            break;
          }
          case 6: {
            obj.val = state.address.city_id;
            break;
          }
          case 7: {
            obj.val = state.address.road;
            break;
          }
          case 8: {
            obj.val = state.address.postcode;
            break;
          }
          case 9: {
            obj.val = state.address.flat_number;
            break;
          }
          case 10: {
            obj.val = state.address.county;
            break;
          }
          case 12: {
            obj.val = state.address.state;
            break;
          }
          case 13: {
            obj.val = state.address.neighbourhood;
            break;
          }
          case 14: {
            obj.val = state.address.house_number;
            break;
          }
        }
        return obj;
      });

      this.setState({
        location: state
      });
      this.props.onChange(null, result);
    }
  }
  getDropDownValues() {
    return [
      { id: "", value: "", type: "" },
      ...this.props.catOption.cat_opt_temp.map((item) => {
        return {
          id: item.id,
          value: item["value_" + this.props.lang],
          type: item["value_" + this.props.lang]
        };
      })
    ];
  }

  /*  onChange(coordinate) {
          console.log(coordinate)
      }*/

  render() {
    return (
      <MapForm
        setLonLat={this.state.location.address != undefined}
        data={this.state.location}
        color={this.props.offerItem.category.color}
        device={this.props.element.map}
        map={this.props.element.map}
        latlngParam={[this.state.location.lat, this.state.location.lon]}
        icon={
          window.env.BLOB_URL +
          "/blob/" +
          (this.props.offerItem.category.icon_blob &&
            this.props.offerItem.category.icon_blob.blob_id)
        }
        onChange={this.onChange.bind(this)}
      ></MapForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    offerItem: state.CreateItemReducer

    //  catOptions: state.EditCategoryReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReverseGeocode: (query) => {
      return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_GEO, { query: query }));
    }
  };
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(connect(mapStateToProps, mapDispatchToProps)(React.memo(CategoryOptionFormGEO)));
