/*
    ./client/components/App.js
*/

import React from 'react';
import { connect } from 'react-redux';

import { VIEW_LIST } from '../../Consts/Enums.js';
import './style.local.scss';



class ViewButton extends React.PureComponent {

    constructor(props) {
        super(props);


    }



    render() {



        return <div className="js-height-9vh" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>

            {this.props.viewEnable.includes(VIEW_LIST.MAP) ? <span data-key={VIEW_LIST.MAP} onClick={this.props.setView.bind(this)} className={"viewBtn " + (this.props.view == VIEW_LIST.MAP ? ' active ' : ' in-active  ')}><i className="fa  fa-map"></i></span> : <span></span>}
            {this.props.viewEnable.includes(VIEW_LIST.LIST) ? <span data-key={VIEW_LIST.LIST} onClick={this.props.setView.bind(this)} className={"viewBtn " + (this.props.view == VIEW_LIST.LIST ? ' active' : ' in-active')} ><i className="fa  fa-list"></i></span> : <span></span>}
            {this.props.viewEnable.includes(VIEW_LIST.GRID) ? <span data-key={VIEW_LIST.GRID} onClick={this.props.setView.bind(this)} className={"viewBtn " + (this.props.view == VIEW_LIST.GRID ? ' active' : ' in-active ')} ><i className="fa  fa-th"></i></span> : <span></span>}
            {this.props.viewEnable.includes(VIEW_LIST.SEARCH) ? <span data-key={VIEW_LIST.SEARCH} onClick={this.props.setView.bind(this)} className={"viewBtn " + (this.props.view == VIEW_LIST.SEARCH ? ' active' : ' in-active ')} ><i className="fa  fa-search"></i></span> : <span></span>}

        </div>;


    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,

    };
};

const mapDispatchToProps = () => {
    return {





    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewButton);
