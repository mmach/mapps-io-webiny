/*
    ./client/components/App.js
*/

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { QueryList, Translator } from "justshare-shared";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import debounce from "lodash/debounce";
import React from "react";
import { geolocated } from "react-geolocated";
//import "react-leaflet-markercluster/dist/styles.min.css"; // sass
import { connect } from "react-redux";
import { BaseService } from "./../../App/index.js";
import "./style.scss";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

//import { Map } from 'react-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  }
}));

function GoogleMaps(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.localisation);
  const [options, setOptions] = React.useState([]);

  const [inputValue, setInputValue] = React.useState(
    props.localisation.display_name
      ? props.localisation.display_name
          .split(", ")
          .filter((i, index) => index < 3)
          .join(", ")
      : ""
  );
  React.useEffect(() => {
    const obj = props.localisation.display_name;
    if (props.localisation.display_name && inputValue != obj) {
      setInputValue(
        props.localisation.display_name
          ? props.localisation.display_name
              .split(", ")
              .filter((i, index) => index < 3)
              .join(", ")
          : ""
      );

      setValue(
        props.localisation.display_name
          ? props.localisation.display_name
              .split(", ")
              .filter((i, index) => index < 3)
              .join(", ")
          : ""
      );
      setOptions([props.localisation]);
    }
  }, [props.localisation]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loaded = React.useRef(false);
  const fetch = React.useMemo(
    () =>
      debounce(async (request, callback) => {
        const result = await props.getAddress({ address: request.input, country_code: props.countryCode });
        callback(result.data);
      }, 500),
    []
  );

  React.useEffect(() => {
    if (
      props.localisation.display_name &&
      props.localisation.display_name
        .split(", ")
        .filter((i, index) => index < 3)
        .join(", ") == inputValue
    ) {
      return;
    }
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);
  const tran = Translator(props.codeDict.data.LABEL, props.lang);
  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : option.display_name
          ? option.display_name
              .split(", ")
              .filter((i, index) => index < 3)
              .join(", ")
          : ""
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        props.onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      noOptionsText={tran.translate("FIND_LOCALISATION_NO_OPTION")}
      renderInput={(params) => (
        <TextField
          {...params}
          label={tran.translate("FIND_LOCALISATION_PLACEHOLDER")}
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(option) => {
        let sec = "";
        if (option.address) {
          sec = option.address.road
            ? option.address.city
            : option.address.city
            ? option.address.state
            : option.address.state
            ? option.address.country
            : "";
        }
        const matches = match(
          option.display_name?  option.display_name
            .split(", ")
            .filter((i, index) => index < 3)
            .join(", "):'',
          inputValue
        );
        const parts = parse(
          option.display_name?  option.display_name
            .split(", ")
            .filter((i, index) => index < 3)
            .join(", "):'',
          matches
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {sec}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
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
    getAddress: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_GEO, dto));
    }
  };
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(connect(mapStateToProps, mapDispatchToProps)(React.memo(GoogleMaps)));

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
