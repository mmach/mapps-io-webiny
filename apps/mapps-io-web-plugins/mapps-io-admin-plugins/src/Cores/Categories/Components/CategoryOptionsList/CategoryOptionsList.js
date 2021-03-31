/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import uuidv4 from "uuid/v4";
import CATEGORY_EDIT_ACTIONS from '../../Scenes/EditCategory/actions.js';
import CategoryOptionTempMapper from '../CategoryOptionTempMapper/CategoryOptionTempMapper.jsx';
import { Translator,QueryList } from 'justshare-shared';
import { BaseService } from 'mapps-io-base-plugins/src/App/index.js';
import { ButtonLoader } from 'mapps-io-base-plugins/src/Components/index.js';



class CategoryOptionsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.catOptions);
        this.state.categoryOptions = this.props.catOptions.catOptions;
        this.state.getCategoryOptionsTypeQuery = [];
    }
    addOptionHandler(event) {

        //let reuslt = this.state.categoryOptions;
        // this.props.catOptions.catOptions.push({});
        this.props.addEmptyElement(uuidv4());
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        const catOptions = this.state.categoryOptions = this.props.catOptions.catOptions;

        return (

            <Col className="g-my-20 text-center">
                <ButtonLoader onClick={this.addOptionHandler.bind(this)} size={"md"} className={"btn g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase rounded-0 g-mb-20"} value={tran.translate('CATEOGRY_ADD_NEW_OPTION_LINK')} />

                {this.props.catOptions.catOptions.sort((a,b)=>{
                    return Number(a.order)>=Number(b.order)?1:-1;
                }).map(item => {
                    return (<CategoryOptionTempMapper item={item} category_id={this.props.category_id}  ></CategoryOptionTempMapper>
                    );
                })}
            </Col>);
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        catOptions: state.EditCategoryReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryOptionsType: (id) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {}));
        }
        ,
        addEmptyElement: (id) => {
            dispatch({
                type: CATEGORY_EDIT_ACTIONS.ADD_EMPTY_OPTION, dto: {
                    id: id
                }
            });

        }

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionsList);

