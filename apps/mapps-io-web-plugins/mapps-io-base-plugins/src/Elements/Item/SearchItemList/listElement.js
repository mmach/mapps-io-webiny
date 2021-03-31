import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import React from "react";
import { connect } from "react-redux";
import ellipsis from "text-ellipsis";
import { mappsPlugins } from "../../..";
import "./style.scss";

function ItemListElement(props) {
  const previewOptions = React.useMemo(() => {
    return mappsPlugins.byName("mapps-item-preview-item-options-default");
  });
  return (
    <Grid item style={{ width: "100%" }}>
      <Card>
        <Grid container>
          <Grid item style={{ flex: "auto" }}>
            <CardActionArea>
              <Grid container>
                <Grid item xs="2">
                  {props.item.blobs[0] && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        window.env.BLOB_URL +
                        "/blob/" +
                        (props.item.blobs[0] && props.item.blobs[0].blob_thumbmail_id)
                      }
                    />
                  )}
                </Grid>
                <Grid item style={{ flex: "auto" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {ellipsis(props.item.name, 25)}
                    </Typography>
                    <Grid container>
                      {previewOptions &&
                        previewOptions.render({
                          item: props.item,
                          on_map: true,
                          lang: props.lang,
                          col_size: 3
                        })}
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
          </Grid>
          <Grid item container xs="1" style={{ flexDirection: "column" }}>
            <CardActions>
              <Grid container style={{ flexDirection: "column" }}>
                <Grid item>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ItemListElement));
