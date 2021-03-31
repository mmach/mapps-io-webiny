import React from "react";
import { connect } from "react-redux";
import MapForm from "../../../../../Components/MapForm/index.js";

class CategoryOptionGeoShow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MapForm
                show
                zoomBtn={false}
                mapClassName="js-height-lg-150px js-height-xl-150px js-height-sm-20vh js-height-xs-20vh js-height-md-20vh js-width-100p"
                readOnly
                coords={{
                    longitude: this.props.item.longitude,
                    latitude: this.props.item.latitude
                }}
                icon={
                    this.props.item.category.icon_blob
                        ? window.enb.BLOB_URL +
                          "/blob/" +
                          this.props.item.category.icon_blob.blob_id
                        : ""
                }
                getFromUser={false}
                form_text={"DUPA"}
            ></MapForm>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        catOptions: state.EditCategoryReducer
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionGeoShow);
