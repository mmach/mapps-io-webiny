/*
    ./client/components/App.js
*/

import { Grid } from "@material-ui/core";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useMusicInfoStyles } from "@mui-treasury/styles/info/music";
import { ShowOptionValue } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { usePrevious } from "../../../Hooks/usePrevious";

function PreviewItemOptions(props) {
  const [groupByCat, setGroupByCat] = React.useState({});
  const catAboveRef = usePrevious(props.filterSearchReducer.catAbovePin);

  React.useEffect(() => {
    const val = { ...groupByCat };
    if (props.on_map == true) {
      props.item.itemCategoryOption.forEach((element) => {
        if (element.category_link && element.category_link.is_on_map == true) {
          val[element.col_id] = element.category_link;
        }
      });
      setGroupByCat(val);
    }
  }, [props.on_map]);
  React.useEffect(() => {
    if (props.on_iua == true) {
      const val = { ...groupByCat };

      props.item.itemCategoryOption.forEach((element) => {
        if (element.category_link && element.category_link.is_on_iua == true) {
          val[element.col_id] = element.category_link;
        }
      });

      setGroupByCat(val);
    }
  }, [props.is_on_iua]);

  React.useEffect(() => {
    if (props.on_map != true && props.on_iua != true && props.on_tooltip != true) {
      const val = { ...groupByCat };

      props.item.itemCategoryOption.forEach((element) => {
        if (element.category_link && element.category_link.is_visible_view == true) {
          val[element.col_id] = element.category_link;
        }
      });

      setGroupByCat(val);
    }
  }, [props.on_map, props.is_on_iua, props.on_tooltip]);


  React.useEffect(() => {
    if (props.on_tooltip == true || props.on_map == true) {
      const val = { ...groupByCat };

      const toRemove =
        catAboveRef &&
        catAboveRef
          .filter((i) => !props.filterSearchReducer.catAbovePin.includes(i))
          .map((i) => i.toUpperCase());
      if (toRemove && toRemove.length > 0) {
        Object.keys(val)
          .filter((i) => {
            return toRemove.includes(val[i].co_id.toUpperCase());
          })
          .forEach((i) => {
            delete val[i];
          });
      }
      props.filterSearchReducer.catAbovePin.forEach((cat) => {
        const item = props.item.itemCategoryOption.filter(
          (i) => i.category_link.co_id.toUpperCase() == cat.toUpperCase()
        );
        if (item.length > 0) {
          val[item[0].col_id] = item[0].category_link;
        }
      });
      setGroupByCat(val);
    }
  }, [props.filterSearchReducer.catAbovePin]);

  return Object.keys(groupByCat)
    .sort((a, b) => {
      return Number(groupByCat[a] == null ? groupByCat[a].catOption.order : groupByCat[a].order) >
        Number(groupByCat[b] == null ? groupByCat[b].catOption.order : groupByCat[b].order)
        ? 1
        : -1;
    })
    .map((item) => {
      return (
        <Grid item key={shortid.generate()} xs={props.col_size}>
          <Info useStyles={useMusicInfoStyles}>
            <InfoTitle>{groupByCat[item].catOption["name_" + props.lang]}</InfoTitle>
            {props.item.itemCategoryOption
              .sort((a, b) => {
                return Number(a.cat_opt_temp.order) > Number(b.cat_opt_temp.order) ? 1 : -1;
              })
              .filter((option) => {
                return (
                  option.col_id.toUpperCase() == item.toUpperCase() &&
                  option.cat_opt_temp.is_visible_view == true
                );
              })
              .map((result) => {
                return (
                  <InfoSubtitle key={shortid.generate()}>
                    {ShowOptionValue(result, props.item.itemCategoryOption, props.lang)}
                  </InfoSubtitle>
                );
              })}
          </Info>
        </Grid>
      );
    });
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    filterSearchReducer: state.FilterSearchReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PreviewItemOptions));
