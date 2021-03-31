import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { SwipeableList, SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import React from "react";
import { connect } from "react-redux";
import ellipsis from "text-ellipsis";
import { mappsPlugins } from "../../..";
import "./style.scss";

function ItemListElementPhone(props) {
  const previewOptions = React.useMemo(() => {
    return mappsPlugins.byName("mapps-item-preview-item-options-default");
  });
  return (
    <Grid item style={{ width: "100%" }}>
      <SwipeableList style={{ width: "100%" }}>
        <SwipeableListItem
          style={{ width: "100%" }}
          swipeRight={{
            content: (
              <Grid container>
                {previewOptions &&
                  previewOptions.render({
                    item: props.item,
                    on_map: true,
                    lang: props.lang,
                    col_size: 3
                  })}
              </Grid>
            ),
            
          }}
          swipeLeft={{
            content: (
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
            ),
          }}
        >
          <Grid container>
            <Card style={{ width: "100%" }}>
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
                                on_tooltip: true,
                                lang: props.lang,
                                col_size: 3
                              })}
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </SwipeableListItem>
      </SwipeableList>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ItemListElementPhone));
