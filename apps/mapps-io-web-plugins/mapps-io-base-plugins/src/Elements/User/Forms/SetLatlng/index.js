/*
    ./client/components/App.js
*/

import { CommandList, Enums, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { BaseService } from "./../../../../App/index.js";
import { ButtonLoader, MapForm, NOTIFICATIONS_ACTIONS } from "./../../../../Components";
import { AUTH_ACTIONS } from "./../../../../Reducers/index.js";
import svg from "./user.svg";
//import { Map } from 'react-leaflet';
class SetLatlng extends React.Component {
  constructor(props) {
    super(props);
  }
  submitHandler(dto) {
    this.props.setLatLng(dto).then(() => {
      this.props.setNotification(
        Enums.CODE.SUCCESS_GLOBAL,
        Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
          "SET_LANG_SAVE_SUCCESS"
        )
      );
    });
  }
  /* case 1: {
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
          }*/
  render() {
 
    return (
      <>
        <MapForm
          device={this.props.mappsSettings.map}
          map={this.props.mappsSettings.map}
          latlngParam={[
            this.props.currentUser.user.latitude,
            this.props.currentUser.user.longitude
          ]}
          icon={svg}
          onSubmit={this.submitHandler.bind(this)}
        ></MapForm>
        <ButtonLoader
          onClick={this.submitHanlder}
          color={"primary"}
          size={"md"}
          value={Translator(this.props.codeDict.data.LABEL, this.props.lang).translate("SUBMIT")}
          isLoading={this.props.isLoading}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    latlng: state.SetLatlngReducer,
    auth: state.AuthReducer,
    currentUser: state.UserImageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: (dto) => {
      return dispatch(
        new BaseService().queryThunt(
          QueryList.Country.GET_COUNTRY,
          dto,
          null,
          Enums.LOADER.SET_CONTAINER_ACTION
        )
      );
    },

    getCities: (dto) => {
      return dispatch(
        new BaseService().queryThunt(
          QueryList.City.GET_CITY,
          dto,
          null,
          Enums.LOADER.SET_CONTAINER_ACTION
        )
      );
    },
    getAddress: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_GEO, dto));
    },
    getReverseByLatLng: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_LATLNG_GEO, dto));
    },
    setLatLng: (dto) => {
      return dispatch(
        new BaseService().queryThunt(
          CommandList.User.SET_COORDIATES,
          dto,
          null,
          Enums.LOADER.SET_CONTAINER_ACTION
        )
      ).then(() => {
        return dispatch(
          new BaseService().queryThunt(QueryList.User.USER_INFO, {}, localStorage.token)
        ).then((succ) => {
          dispatch({
            type: AUTH_ACTIONS.IS_AUTH,
            dto: {
              refresh_token: localStorage.refresh_token,
              token: localStorage.token,
              user: succ.data
            }
          });
          return succ;
        });
      });
    },
    setNotification: (type, message) => {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
        notification: { message: message, type: type }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SetLatlng));
