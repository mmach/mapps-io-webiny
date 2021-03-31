import { Container, Grid, IconButton, Tooltip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import { DropzoneArea } from "material-ui-dropzone";
//import FadeIn from "../../../../Components/FadeIn/index.js";
import Image from "material-ui-image";
import React from "react";
import { BodyLoader, ButtonLoader } from "./../../../../../../Components/index.js";

class Variant1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid >
                {5 - this.props.images.length > 0 && (
                    <Grid>
                        <div>
                            {!this.props.uploadLoading ? (
                                <DropzoneArea
                                    onChange={this.props.handleChange}
                                    filesLimit={5 - this.props.images.length}
                                    dropzoneText={this.props.tran.translate(
                                        "USER_IMAGE_PROFILE_TEXT",
                                        5 - this.props.images.length
                                    )}
                                    acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                                    showPreviews={false}
                                    maxFileSize={2500000}
                                    showAlerts={false}
                                    useChipsForPreview={false}
                                    showPreviewsInDropzone={true}
                                    fileObjects={[...this.props.files]} //onDropRejected
                                />
                            ) : (
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    style={{
                                        height: "240px",
                                        display: "flex"
                                    }}
                                >
                                    <BodyLoader text=" " size="25px" />
                                </Grid>
                            )}
                            <ButtonLoader
                                onClick={this.props.submitHanlder}
                                size={"md"}
                                color={"primary"}
                                value={this.props.tran.translate("Save")}
                                isLoading={this.props.uploadLoading}
                            />
                        </div>
                    </Grid>
                )}
                <Grid container spacing={3}>
                    {this.props.images.map(item => {
                        return (
                            <Grid item xs={3} key={item.id}>
                                <Tooltip className title={"USER_REMOVE_IMAGE_TOOLTIP"}>
                                    <IconButton
                                        data-tag={item.id}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={this.props.removeImage}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>

                                <span data-tag={item.id} onClick={this.props.clickImageHandler}>
                                    <Image
                                        data-tag={item.id}
                                        onClick={this.props._clickImageHandler}
                                        src={
                                            window.env.BLOB_URL + "/blob/" + item.blob_thumbmail_id
                                        }
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    />
                                </span>
                                <Grid
                                    container
                                    style={{
                                        marginTop: "5px",
                                        display: "flex",
                                        justifyItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Grid
                                        item
                                        xs={4}
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        {item.id != this.props.blob_id && (
                                            <Tooltip
                                                className
                                                title={this.props.tran.translate(
                                                    "USER_SET_AS_PROFILE_IMAGE_TOOLTIP"
                                                )}
                                            >
                                                <IconButton
                                                    data-tag={item.id}
                                                    onClick={this.props.setAsProfile}
                                                    style={{
                                                        marginTop: "-3px",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <PersonIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        );
    }
}

export default React.memo(Variant1);
