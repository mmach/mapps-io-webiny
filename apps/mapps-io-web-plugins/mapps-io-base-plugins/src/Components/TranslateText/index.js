import { Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";

function TranslateText(props) {
    return (
        <span>{Translator(props.codeDict.data.LABEL, props.lang).translate(props.children)}</span>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer
    };
};

export default connect(mapStateToProps, null)(React.memo(TranslateText));
