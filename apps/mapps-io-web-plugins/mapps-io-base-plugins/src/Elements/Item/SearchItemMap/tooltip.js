/*
    ./client/components/App.js
*/

//import { Map } from 'react-leaflet';
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Popup, Tooltip } from "react-leaflet";
import { connect } from "react-redux";
import ellipsis from "text-ellipsis";
import { mappsPlugins } from "../../../index.js";

function PinTooltip(props) {
  const previewOptions = React.useMemo(() => {
    return mappsPlugins.byName("mapps-item-preview-item-options-default");
  });
 

  const element = props.items.map((itemSingle, index) => {
    if (props.items.length > 1) {
      return (
        <Grid container>
          {itemSingle.blobs[0] && (
            <CardMedia
              component="img"
              height="50"
              image={
                window.env.BLOB_URL +
                "/blob/" +
                (itemSingle.blobs[0] && itemSingle.blobs[0].blob_thumbmail_id)
              }
            />
          )}
          <Grid item style={{ flex: "auto" }}>
            <Typography gutterBottom variant="subtitle1" component="h2">
              {ellipsis(itemSingle.name, 25)}
            </Typography>
            <Divider />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid
        container
        key={index}
        style={{
          justifyContent: "center",
          padding: "5px"
        }}
      >
        {itemSingle.blobs[0] && (
          <CardMedia
            component="img"
            height="140"
            image={
              window.env.BLOB_URL +
              "/blob/" +
              (itemSingle.blobs[0] && itemSingle.blobs[0].blob_thumbmail_id)
            }
          />
        )}
        <Grid item>
          <Typography gutterBottom variant="subtitle1" component="h2">
            {ellipsis(itemSingle.name, 25)}
          </Typography>
          <Grid container>
            {previewOptions &&
              previewOptions.render({
                item: itemSingle,
                on_tooltip: true,
                lang: props.lang,
                col_size: 12
              })}
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (
    <>
      <Popup onClose={props.onPopupClose} minWidth={300} maxHeight={400}>
        {props.items.map((item, index) => {
          return (
            <Card key={index}>
              <CardActionArea>
                {item.blobs[0] && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      window.env.BLOB_URL +
                      "/blob/" +
                      (item.blobs[0] && item.blobs[0].blob_thumbmail_id)
                    }
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {ellipsis(item.name, 25)}
                  </Typography>
                  <Grid container>
                    {previewOptions &&
                      previewOptions.render({
                        item: item,
                        on_map: true,
                        lang: props.lang,
                        col_size: 6
                      })}
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Popup>
      <Tooltip offset={[0, -25]} direction="top">
        <div>{element}</div>
      </Tooltip>
    </>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    itemSearchReducer: state.SearchItemResultsViewReducer,
    filterSearchReducer: state.FilterSearchReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PinTooltip));
