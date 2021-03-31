/*
    ./client/components/App.js
*/

import { QueryList } from 'justshare-shared';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { BaseService } from '../../../../App/index.js';
import PreviewItem from './index.js';



class PreviewItemDispatcher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.item_id = undefined;
    }

    componentDidMount() {

        if (this.props.config.useURL == true) {
            // eslint-disable-next-line no-undef
            const parsed = queryString.parse(location.search);
            this.setState({
                item_id: parsed.item_id
            });
        } else {
            this.setState({
                item_id: this.props.item_id
            });
        }


    }

    render() {
        return (<PreviewItem item_id={this.state.item_id}></PreviewItem>);
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        loader: state.LoaderReducer,
        offerItem: state.NewOfferItemReducer

    };
};

const mapDispatchToProps = (dispatch) => {
    return {



       
        getCategoryOptions: (category_id) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, { id: category_id }));

        },
        getItem: (item_id) => {
            return dispatch(new BaseService().queryThunt(QueryList.Item.GET_ITEM_BY_ID, { id: item_id }));
        }

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewItemDispatcher);
