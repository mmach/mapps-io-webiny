import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {
  CategoryItem,
  CategoryProvider,
  CategoryTitle
} from "@mui-treasury/components/menu/category";
import { useMagCategoryMenuStyles } from "@mui-treasury/styles/categoryMenu/mag";
import { Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { mappsPlugins } from "../..";

const MenuCategoriesVertical = React.memo(function MagCategoryMenu(props) {
  const LinkPlugin = React.useMemo(() => mappsPlugins.byName("mapps-item-basic-link"));

  const tran = Translator(props.codeDict.data.LABEL, props.lang);

  return (
    <Box minWidth={"80%"}>
      <Grid
        container
        style={{
          flexDirection: props.variant == "column" ? "column" : "unset"
        }}
      >
        {props.data &&
          props.data.items.map((item) => {
            if (Array.isArray(item.children)) {

              return (
                <Grid key={item.id} item>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle> {tran.translate(item.title)}</CategoryTitle>
                    {item.children.map((chitem) => {
                      return (
                        <CategoryItem
                          as={LinkPlugin && LinkPlugin.component}
                          to={chitem.url || chitem.path || chitem.href }
                          key={chitem.id}
                        >
                          {tran.translate(chitem.title)}
                        </CategoryItem>
                      );
                    })}
                  </CategoryProvider>
                </Grid>
              );
            } else {
              return (
                <Grid key={item.id} item>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryItem as={LinkPlugin && LinkPlugin.component}                                                         
                    to={item.url || item.path || item.href }
                    key={item.id}>
                      {tran.translate(item.title)}
                    </CategoryItem>
                  </CategoryProvider>
                </Grid>
              );
            }
          })}
      </Grid>
    </Box>
  );
});

const mapStateToProps = (state) => {

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategoriesVertical);
