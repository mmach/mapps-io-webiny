/*
    ./client/components/App.js
*/

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { CommandList, Enums, QueryList, Translator } from "justshare-shared";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import debounce from "lodash/debounce";
import React, { useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
//import "react-leaflet-markercluster/dist/styles.min.css"; // sass
import { connect } from "react-redux";
import { BaseService } from "./../../App/index.js";
//import { Map } from 'react-leaflet';
import GoogleMaps from "./autocomplete";
import "./style.scss";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

function LocationMarker(props) {
    const [position, setPosition] = useState(props.position);
    const map = useMapEvents({
        click(e) {
            props.onClick(e.latlng);
        }
        //  locationfound(e) {
        ///   props.onClick(e.latlng);
        //  }
    });
    useEffect(() => {
        map.flyTo(position, map.getZoom());
    }, [position]);
    useEffect(() => {
        setPosition(props.position);
    }, [props.position]);
    if (position[0] == 0 && position[1] == 0) {
        map.locate();
    }
    return position === null ? null : <Marker position={position} icon={props.icon}></Marker>;
}

const LocationMarkerMemo = React.memo(LocationMarker);

function MapForm(props) {
    const [zoom, setZoom] = React.useState(16);
    const [latlong, setCoord] = React.useState(
        props.latlngParam && props.latlngParam[0] ? props.latlngParam : [0, 0]
    );

    const [countryCode, setCountryCode] = React.useState("PL");
    const [setLonLat, setLonLatChange] = React.useState(props.setLonLat ? props.setLonLat : 0);
    const [localisation, setLocalisation] = React.useState(props.data ? props.data : {});
    const [flatNumber, setFlat] = React.useState(props.data ? props.data.flat_number : "");
    const [loading, setLoading] = React.useState(false);
    const fetch = React.useMemo(
        () =>
            debounce(async (request, callback) => {
                setLoading(false);
                const result = await props.getReverseByLatLng(request);
                callback(result.data);
            }, 500),
        []
    );
    if (latlong[0] == 0 && latlong[1] == 0) {
        axios.get("https://ipapi.co/json/").then((res) => {
            setCountryCode(res.data.country_code);
        });
        if (props.isGeolocationEnabled) {
            if (props.coords) {
                setCoord([props.coords.latitude, props.coords.longitude]);
            }
        }
        if (
            props.auth.user &&
            !(props.auth.user.latitude == 0 && props.auth.user.longigute == 0) &&
            props.auth.user.latitude
        ) {
            setCoord([props.auth.user.latitude, props.auth.user.longitude]);
        } else {
            axios.get("https://ipapi.co/json/").then((response) => {
                const data = response.data;

                setCoord([data.latitude, data.longitude]);
            });
        }
    }
    useEffect(() => {
        if (props.latlngParam[0] && props.latlngParam[1] && setLonLat == 0) {
            setCoord(props.latlngParam);
        } else if (props.coords && setLonLat == 0) {
            setCoord([props.coords.latitude, props.coords.longitude]);
        }
    }, [props.latlngParam, props.coords]);

    useEffect(() => {
        if (
            latlong[0] != 0 &&
            (latlong[0] != localisation.lat ||
                latlong[1] != localisation.lon ||
                !localisation.address)
        ) {
            fetch(
                {
                    longitude: latlong[1],
                    latitude: latlong[0]
                },
                (result) => {
                    result.lat = latlong[0];
                    result.lon = latlong[1];
                    setLocalisation(result);
                    // setCoord([result.lat, result.lon]);
                    setLoading(true);
                    props.onChange ? props.onChange(result) : null;
                }
            );
        } else if (
            latlong[0] == localisation.lat ||
            latlong[1] == localisation.lon ||
            localisation.address
        ) {
            setLoading(true);
        }
    }, [latlong, fetch]);
    function setFlatValue(event) {
        const value = event.value;
        setFlat(event.target.value);
        const locali = (localisation.address.flat_number = value);
        props.onChange ? props.onChange(locali) : null;
    }
    //(validation = []);
    const map = React.useRef();
    const png = props.icon;
    const color = props.color && "#ff7c7c";
    const myIcon = L.divIcon({
        html: `
            <svg viewBox="0 0 80 80" width="40" height="70" style="overflow: visible;">
                <defs>
                    <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                        <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                    </filter>
                    <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                        <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                    </filter>
                </defs>
                <style>
                    .small { font: italic 13px sans-serif; }
                    .heavyText {font: 500 30px sans-serif; text-align:center }
                
                    /* Note that the color of the text is set with the    *
                    * fill property, the color property is for HTML only */
                    .Rrrrr { font: italic 40px serif; fill: red; }
              </style>
            
                <g>
                <ellipse filter="url(#svg_5_blur)" opacity="0.4" ry="11" rx="27.5" id="svg_5" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                <rect class="pinColorSingle pinColorSingleFill" transform="rotate(45 34.75000000000003,52.249999999999986) " id="svg_7" height="38.606601" width="42" y="32.9467" x="13.75" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" />
                <ellipse class="pinColorSingle pinColorSingleFill" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" />
                <ellipse class="pinColorSingle" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                <image xlink:href="${png}" id="svg_4" height="32" width="32" y="18" x="20"/>
               </g>
            </object>`,
        iconSize: [30, 40],
        iconAnchor: [15, 35], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -35],
        className: "marker-cluster-custom"
    });
    // const color = "#4DB1CF";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const myIconResults = L.divIcon({
        html: `
            <svg viewBox="0 0 80 80" width="40" height="70" style="overflow: visible;">
                <defs>
                    <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                        <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                    </filter>
                    <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                        <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                    </filter>
                </defs>
                <style>
                    .small { font: italic 13px sans-serif; }
                    .heavyText {font: 500 30px sans-serif; text-align:center }
                
                    /* Note that the color of the text is set with the    *
                    * fill property, the color property is for HTML only */
                    .Rrrrr { font: italic 40px serif; fill: red; }
              </style>
            
                <g>
                <ellipse filter="url(#svg_5_blur)" opacity="0.4" ry="11" rx="27.5" id="svg_5" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                <rect class="${color}" transform="rotate(45 34.75000000000003,52.249999999999986) " id="svg_7" height="38.606601" width="42" y="32.9467" x="13.75" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="${color}"/>
                <ellipse stroke="${color}" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill="${color}"/>
                <ellipse stroke="${color}" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                <image xlink:href="${png}" id="svg_4" height="32" width="32" y="18" x="20"/>
               </g>
            </object>`,
        iconSize: [30, 40],
        iconAnchor: [15, 35], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -35],
        className: "marker-cluster-custom"
    });

    function onZoom() {
        if (map) {
            setZoom(map.viewport.zoom);
        }
    }

    function addMarker(event) {
        if (props.readOnly == true) {
            return;
        }
        setCoord([event.lat, event.lng]);
        setLonLatChange(true);
    }
    function onChangeTextbox(localInfo) {
        if (localInfo) {
            setCoord([localInfo.lat, localInfo.lon]);
            setLonLatChange(true);
        }
    }

    const tran = Translator(props.codeDict.data.LABEL, props.lang);

    if (latlong[0] == 0 && latlong[1] == 0) {
        return <span></span>;
    }

    return (
        <Grid container style={{ flexWrap: "nowrap" }}>
            {props.device.showMap && (
                <Grid item>
                    {props.device.useSearchTextMap && (
                        <GoogleMaps
                            localisation={localisation}
                            onChange={onChangeTextbox}
                            countryCode={
                                props.useCountryCode ? props.countryCode && countryCode : ""
                            }
                        />
                    )}

                    <MapContainer
                        className={props.device.mapClass}
                        style={{ minHeight: props.device.height, minWidth: props.device.width }}
                        zoomControl={props.zoomBtn == false ? false : true}
                        center={latlong}
                        zoom={zoom}
                        onzoomend={onZoom}
                        ref={map}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <LocationMarkerMemo
                            position={latlong}
                            onClick={addMarker}
                            icon={myIcon}
                        ></LocationMarkerMemo>
                    </MapContainer>
                </Grid>
            )}
            {props.device.showDetails && (
                <Grid item style={{ paddingLeft: "30px", flexDirection: "column" }} container>
                    {props.device.useSearchText && (
                        <Grid item>
                            <GoogleMaps
                                localisation={localisation}
                                onChange={onChangeTextbox}
                                countryCode={
                                    props.useCountryCode ? props.countryCode && countryCode : ""
                                }
                            />
                        </Grid>
                    )}
                    {localisation.address && loading && (
                        <Grid
                            item
                            container
                            style={{
                                justifyContent: "space-around",
                                flexDirection: "column",
                                flex: "auto"
                            }}
                        >
                            {props.map.useState && (
                                <Grid item>
                                    <TextField
                                        disabled="true"
                                        value={localisation.address.country}
                                        label={tran.translate("LOCALISATION_COUNTRY")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}
                            {props.map.useState && (
                                <Grid item>
                                    <TextField
                                        disabled="true"
                                        value={localisation.address.state}
                                        label={tran.translate("LOCALISATION_STATE")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}
                            {props.map.useRegion && (
                                <Grid item>
                                    <TextField
                                        disabled="true"
                                        value={localisation.address.county}
                                        label={tran.translate("LOCALISATION_REGION")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}

                            {props.map.useCity && (
                                <Grid item>
                                    <TextField
                                        disabled="true"
                                        value={localisation.address.city}
                                        label={tran.translate("LOCALISATION_CITY")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}
                            {props.map.useNeighbourhood && (
                                <Grid item>
                                    <TextField
                                        disabled="false"
                                        value={localisation.address.neighbourhood}
                                        label={tran.translate("LOCALISATION_NEIGHBOURHOOD")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}
                            {props.map.usePostalCode && (
                                <Grid item>
                                    <TextField
                                        disabled="false"
                                        value={localisation.address.postcode}
                                        label={tran.translate("LOCALISATION_POSTALCODE")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}
                            {props.map.useRoad && (
                                <Grid item>
                                    <TextField
                                        disabled="false"
                                        value={localisation.address.road}
                                        label={tran.translate("LOCALISATION_ROAD")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}
                            {props.map.useHouseNumber && (
                                <Grid item>
                                    <TextField
                                        disabled="false"
                                        value={localisation.address.house_number}
                                        label={tran.translate("LOCALISATION_HOUSE_NUMBER")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}

                            {props.map.useFlatNumber && (
                                <Grid item>
                                    <TextField
                                        onChange={setFlatValue}
                                        value={flatNumber}
                                        label={tran.translate("LOCALISATION_FLATNUMBER")}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    )}
                </Grid>
            )}
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        latlng: state.SetLatlngReducer,
        auth: state.AuthReducer
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
        getUserCountry: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Country.GET_COUNTRY_BY_ID, dto));
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
                    // eslint-disable-next-line no-undef
                    new BaseService().queryThunt(QueryList.User.USER_INFO, {}, localStorage.token)
                );
            });
        }
    };
};

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(connect(mapStateToProps, mapDispatchToProps)(React.memo(MapForm)));

/*
   {props.coords ? (
        <ButtonLoader
          onClick={refreshGeolocation.bind(this)}
          size={"md"}
          className={
            "btn btn-outline-secondary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase g-mr-10 "
          }
          value={tran.translate("REFRESH_GEO_BUTTON_LABEL")}
        />
      ) : (
        <span></span>
      )}

      {props.onSubmit ? (
        <ButtonLoader
          onClick={submitHandler.bind(this)}
          size={"md"}
          value={tran.translate("SET_COORDINATES_BUTTON_LABEL")}
          isLoading={this.props.latlng.isLoading}
        />
      ) : (
        <span></span>
      )}
      {props.onChange ? (
        <ButtonLoader
          onClick={getUsersCoordinate.bind(this)}
          size={"md"}
          className={
            "btn btn-outline-secondary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase "
          }
          value={tran.translate("SET_FROM_USER_COORIDNATE")}
          isLoading={this.props.latlng.isLoading}
        />
      ) : (
        <span></span>
      )}F
*/
