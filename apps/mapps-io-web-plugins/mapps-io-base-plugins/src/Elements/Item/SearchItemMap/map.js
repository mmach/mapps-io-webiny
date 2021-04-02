/*
    ./client/components/App.js
*/

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { Circle, MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import { connect } from "react-redux";
import worker from "workerize-loader?inline!./../../../Workers/worker.js";
import { mappsPlugins } from "../../../index.js";
import MAP_SEARCH_ACTIONS from "./actions.js";
import "./style.local.scss";
import "./style.scss";

window.webWorkers = window.webWorkers ? window.webWorkers : worker();

//import { Map } from 'react-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

const myRenderer = L.canvas({ padding: 0.5 });

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

function LocationMarker(props) {
  const map = useMapEvents({
    click(e) {
      if (props.setPositionButton) {
        props.onClick(e.latlng);
      }
    }
  });

  React.useEffect(() => {
    if (props.position[0]) {
      map.flyTo(props.position, map.getZoom());
    }
  }, [props.position]);

  return props.position[0] === 0 || props.mappsSettings.showCurrentPin!=true ? null : (
    <Marker position={props.position}></Marker>
  );
}
const LocationMarkerMemo = React.memo(LocationMarker);

function MapView(props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = React.useState(13);
  const [grouping, setGrouping] = React.useState(1);
  const [radius, setRadius] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [latlon, setLatLon] = React.useState([0, 0]);
  const [pins, setPins] = React.useState([]);
  //const map = React.useRef();
  const pinView = React.useMemo(() =>
    mappsPlugins.byName("mapps-item-search-container-view-map-pin")
  );
  React.useEffect(() => {
    setItems([...props.itemSearchReducer.items]);
  }, [props.itemSearchReducer.items]);

  React.useEffect(() => {
    if (
      props.filterSearchReducer.search.distance &&
      props.filterSearchReducer.search.distance.indexOf("m") > 0
    ) {
      setRadius(Number(props.filterSearchReducer.search.distance.split("m")[0]));
    }
    if (
      props.filterSearchReducer.search.distance &&
      props.filterSearchReducer.search.distance.indexOf("km") > 0
    ) {
      setRadius(Number(props.filterSearchReducer.search.distance.split("km")[0]) * 1000);
    }
  }, [props.filterSearchReducer.search.distance]);
  React.useEffect(() => {
    if (
      props.filterSearchReducer.search.lat &&
      props.filterSearchReducer.search.lat != latlon[0] &&
      props.filterSearchReducer.search.lon &&
      props.filterSearchReducer.search.lon != latlon[1]
    ) {
      setLatLon([props.filterSearchReducer.search.lat, props.filterSearchReducer.search.lon]);
    }
  }, [props.filterSearchReducer.search.lat, props.filterSearchReducer.search.lon]);
  React.useEffect(() => {
    if (
      props.filterSearchReducer.search.grouping &&
      props.filterSearchReducer.search.grouping.indexOf("m") > 0
    ) {
      setGrouping(Number(props.filterSearchReducer.search.grouping.split("m")[0]));
    }
    if (
      props.filterSearchReducer.search.grouping &&
      props.filterSearchReducer.search.grouping.indexOf("km") > 0
    ) {
      setGrouping(Number(props.filterSearchReducer.search.grouping.split("km")[0]) * 1000);
    }
  }, [props.filterSearchReducer.search.grouping]);
  // this.refSlider = {};
  React.useEffect(() => {
    window.webWorkers
      .PreparePinsWorker({
        grouping,
        items,
        categoriesReducer: props.filterSearchReducer.categories
      })
      .then((succ) => {
        setPins(succ);
      });
  }, [grouping, items]);
  
  function setLatLong(event) {
    setLatLon([event.lat, event.lng]);
    props.setPositionClick && props.setPositionClick([event.lat, event.lng]);
  }
  //
  //</Marker>
  const itemsPinMemo = React.useMemo(() => {
    return pins ? (
      pins.map((i, index) => {
        if (i.type == "PIN") {
          return <React.Fragment key={index}>{pinView.render({ ...i.data })} </React.Fragment>;
        } else {
          return <Polyline key={index} renderer={myRenderer} {...i.data}></Polyline>;
        }
      })
    ) : (
      <span></span>
    );
  }, [pins]);

  return (
    <MapContainer
      zoomControl={props.mappsSettings.useZoomBtn}
      minZoom={6}
      center={latlon}
      zoom={zoom}
      style={{ width: "100%", height: props.mappsSettings.height }}
    >
      <LocationMarkerMemo
        setPositionButton={props.setPositionButton}
        position={latlon}
        onClick={setLatLong}
        mappsSettings={props.mappsSettings}
      ></LocationMarkerMemo>
      <Circle
        renderer={myRenderer}
        opacity={0.5}
        center={latlon}
        className={"circleBorder"}
        fillColor="#666"
        fillOpacity={0.1}
        radius={radius}
        strokeWidth={1}
      />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {itemsPinMemo}
    </MapContainer>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    loader: state.LoaderReducer,
    itemSearchReducer: state.SearchItemResultsViewReducer,
    filterSearchReducer: state.FilterSearchReducer,
    mapSearchReducer: state.SearchMapReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentElement: (currentElement) => {
      return dispatch({
        type: MAP_SEARCH_ACTIONS.SET_CURRENT_ELEMENT,
        dto: {
          currentElement: currentElement
        }
      });
    },
  
    onMapInit: (dto) => {
      return dispatch({
        type: MAP_SEARCH_ACTIONS.ON_MAP_INIT,
        currentPosition: dto.currentPosition
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MapView));

/*
const itemsPinMemo = React.useMemo(() => {
  const arrayItems = [];
  const zoomGroup = 111110 / grouping;

  items.map((item) => {
    const lon =
      Math.ceil(
        (Math.round(item.longitude * zoomGroup) / zoomGroup) *
          Math.pow(10, Math.round(zoomGroup).toString().length - 1)
      ) / Math.pow(10, Math.round(zoomGroup).toString().length - 1);
    const lat =
      Math.ceil(
        (Math.round(item.latitude * zoomGroup) / zoomGroup) *
          Math.pow(10, Math.round(zoomGroup).toString().length - 1)
      ) / Math.pow(10, Math.round(zoomGroup).toString().length - 1);
    let array = arrayItems[lat + ":" + lon];
    if (array == undefined) {
      array = [];
    }
    array.push(item);
    arrayItems[lat + ":" + lon] = array;
  });

  const pins = [];

  Object.keys(arrayItems).map((items) => {
    if (arrayItems[items].length == 1) {
      const item = arrayItems[items][0];
      const category = props.filterSearchReducer.categories.filter((cat) => {
        return (
          item.categories.filter((item_cat) => {
            return item_cat.id == cat.id;
          }).length > 0
        );
      })[0];

      const cat = item.itemCategoryOption.filter((category) => {
        return category.category_link
          ? category.category_link.is_on_pin_map == null
            ? category.category_link.catOption.is_on_pin_map
            : category.category_link.is_on_pin_map
          : false;
      })[0];

      pins.push(
        <MapPin
          latlon={[item.latitude, item.longitude]}
          latlonCenter={[item.latitude, item.longitude]}
          length={0}
          cat={cat}
          category={category}
          items={[item]}
        ></MapPin>
      );
    } else if (arrayItems[items].length > 1) {
      const categories = [];
      arrayItems[items].forEach((item) => {
        const category = props.filterSearchReducer.categories.filter((cat) => {
          return (
            item.categories.filter((item_cat) => {
              return item_cat.id == cat.id;
            }).length > 0
          );
        })[0];
        if (category) {
          categories[category.id] = category;
        }
      });
      // console.log(categories);
      const degree = (2 * Math.PI) / Object.keys(categories).length;
      Object.keys(categories).forEach((key, index) => {
        const category = categories[key];
        const itemCategories = arrayItems[items].filter((item) => {
          return (
            item.categories.filter((item_cat) => {
              return item_cat.id == category.id;
            }).length > 0
          );
        });
        const item = arrayItems[items][0];
        const lonA =
          Math.ceil(
            (Math.round(item.longitude * zoomGroup) / zoomGroup) *
              Math.pow(10, Math.round(zoomGroup).toString().length - 1)
          ) / Math.pow(10, Math.round(zoomGroup).toString().length - 1);
        const latA =
          Math.ceil(
            (Math.round(item.latitude * zoomGroup) / zoomGroup) *
              Math.pow(10, Math.round(zoomGroup).toString().length - 1)
          ) / Math.pow(10, Math.round(zoomGroup).toString().length - 1);
        const long =
          lonA +
          (Object.keys(categories).length > 1
            ? ((Math.round(Math.cos(degree * (index + 1)) * 10) / 10) * 20) / grouping / zoomGroup
            : 0);
        const lat =
          latA +
          (Object.keys(categories).length > 1
            ? ((Math.round(Math.sin(degree * (index + 1)) * 10) / 10) * 20) / grouping / zoomGroup
            : 0);

        // console.log(((Math.sin(degree * index) * 5) / zoomGroup))
        const cat = undefined;
        // console.log('dupaaaaaaa')

        //   console.log(category)

        const pointA = [latA, lonA];
        const pointB = [lat, long];
        const pointList = [pointA, pointB];
        preferCanvas={true} renderer={myRenderer}
        pins.push(
          <Polyline
            renderer={myRenderer}
            smoothFactor={1}
            opacity={0.5}
            fillColor="#666"
            fillOpacity={0.1}
            radius={radius}
            strokeWidth={1}
            positions={pointList}
          ></Polyline>
        );
        pins.push(
          <MapPin
            latlon={pointB}
            latlonCenter={pointA}
            length={0}
            cat={cat}
            items={itemCategories}
            category={category}
          ></MapPin>
        );
      });
    }
  });
  console.log("rebuild");
  return pins;
}, [grouping, items, props.filterSearchReducer.categories, zoom]);
*/
