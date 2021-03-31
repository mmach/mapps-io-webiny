/*
    ./client/components/App.js
*/

import { QueryList } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LIGHTBOX_ACTIONS } from "../../../Components/index.js";
import { mappsPlugins } from "../../../index.js";
import CREATE_ITEM_ACTIONS from "../CreateItem/actions.js";
import { BaseService } from "./../../../App/index.js";

function SetItemCategory(props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoryId, setCategoryState] = React.useState(
    props.mappsSettings && props.mappsSettings.category_id
      ? props.mappsSettings.category_id
      : props.match.params.category_id
      ? props.match.params.category_id
      : "_ROOT"
  );
  const setCategory = React.useMemo(() => {
    return mappsPlugins.byName(props.mappsSettings.mappsCategoryNamePlugin);
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setLoading] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLeaf, setLeaf] = React.useState(false);
  function setCategoryLeaf(category) {
    if (
      category.category.category_children
        ? category.category.category_children.length == 0
          ? true
          : false
        : false
    ) {
      props.setLeaf(category.category);
      setLeaf(true);
      if (props.mappsSettings && props.mappsSettings.useRedirect) {
        props.history.push(
          props.mappsSettings.redirectUri.replace("{category_id}", category.category.id)
        );
      } else {
        props.onSetLeaf && props.onSetLeaf(category.category);
      }
    }
  }

  return (
    setCategory &&
    setCategory.render({
      withCurrent: true,
      category_id: categoryId,
      onClick: setCategoryLeaf
    })
  );
}
//  <CategoryTreePreview setOnlyLeaf={true} categoryId={this.state.categoryId} onClick={this.onClickTree.bind(this)}></CategoryTreePreview>

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    loader: state.LoaderReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryOptions: (category_id) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, {
          id: category_id
        })
      );
    },
    openLightbox: (activeImage, images) => {
      return dispatch({
        type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
        dto: {
          images: images,
          activeImage: activeImage
        }
      });
    },
    setLeaf: (category) => {
      return dispatch({
        type: CREATE_ITEM_ACTIONS.SET_CATEGORY,
        dto: category
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(React.memo(SetItemCategory))
);
