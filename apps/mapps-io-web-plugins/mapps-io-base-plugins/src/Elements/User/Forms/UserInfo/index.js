/*
    ./client/components/App.js
*/

import { Box, Grid, IconButton, TextField } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { MapForm, MODAL_ACTIONS, ShareComponent } from "../../../../Components";
//import { Map } from 'react-leaflet';
import  svg from './user.svg';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.user = props.currentUser.user;
    this.state.validation = [];
    this.open = false;
    this.state.activeTab = "1";
  }

  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    this.open = false;
  }
  shareLink() {
    this.props.openModal(
      true,
      <ShareComponent
        title={"Użytkownik - " + this.props.currentUser.user.name}
        link={window.location.origin + "/user/" + this.props.currentUser.user.id}
      ></ShareComponent>
    );
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    if (this.props.currentUser.isLoading) {
      return <span></span>;
    }
    const body = (
      <Grid
        container
        style={{ justifyContent: "space-around", flexDirection: "column", flex: "auto" }}
      >
        {this.props.mappsSettings.showShareButton && (
          <Grid item container>
            <Grid item>
              <IconButton onClick={this.shareLink.bind(this)}>
                <ShareIcon></ShareIcon>
              </IconButton>
            </Grid>
          </Grid>
        )}
        {this.props.mappsSettings.showUserName && (
          <Grid item style={{ marginTop: "20px" }}>
            <TextField
              disabled="false"
              value={this.state.user.name + " " + this.state.user.surname}
              label={tran.translate("USER_PROFILE_MODAL_NAME_SURNAME")}
              style={{ width: "100%" }}
            />
          </Grid>
        )}
        {this.props.mappsSettings.showEmail && (
          <Grid item style={{ marginTop: "20px" }}>
            <TextField
              disabled="false"
              value={this.state.user.email}
              label={tran.translate("USER_PROFILE_MODAL_EMAIL")}
              style={{ width: "100%" }}
            />
          </Grid>
        )}
        {this.props.mappsSettings.showPhone && (
          <Grid item style={{ marginTop: "20px" }}>
            <TextField
              disabled="false"
              value={this.state.user.phone}
              label={tran.translate("USER_PROFILE_MODAL_PHONE")}
              style={{ width: "100%" }}
            />
          </Grid>
        )}

        <Box container item style={{ marginTop: "20px" }}>
          <MapForm
            zoomBtn={false}
            readOnly={true}
            device={this.props.mappsSettings.map}
            map={this.props.mappsSettings.map}
            latlngParam={[
              this.props.currentUser.user.latitude,
              this.props.currentUser.user.longitude
            ]}
            icon={svg}
          ></MapForm>
        </Box>
      </Grid>
    );
    return body;
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    config: state.ConfigReducer,
    currentUser: state.UserImageReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (open, body) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          body: body
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
