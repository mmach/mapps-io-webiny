import { BlobBase64DTO, Translator } from "justshare-shared";
import { DropzoneArea } from "material-ui-dropzone";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";

class CategoryOptionFormImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    this.state.id = this.props.values ? this.props.values : {};
    this.state.file = [];
    this.state.images = [];
    this.state.uploadLoading = false;
    this.state.files = [];
    this.state.catOption =
      this.props.optionValue != undefined && this.props.optionValue.length > 0
        ? this.props.optionValue
        : [];
    if (this.props.optionValue != undefined && this.props.optionValue.length > 0) {
      this.state.images = this.props.optionValue.map((i) => i.content);
    }
  }

  shouldComponentUpdate(prev) {
    if (
      this.props.itemCategories.filter((item) => {
        const itemMatched = prev.itemCategories.filter((item2) => {
          return item.id == item2.id && item.col_id == this.props.catOption.category_link[0].id;
        })[0];
        return itemMatched && itemMatched.val != item.val;
      }).length !=
      this.props.itemCategories.filter((item) => {
        return item.col_id == this.props.catOption.category_link[0].id;
      }).length
    ) {
      // this.sync();
      return true;
    }
    return false;
  }

  handleChange(files) {
    // get the files

    // Process each file
    const allFiles = [];
  //  const filesList = files.filter(
  //    (i) => 
  //    {

   //     const result =  this.state.images.filter((im) => im.name == i.name).length == 0
   //     return result ;
   //   }
   // );
   if(files.length==0)
   {
    this.props.onChange(this.props.catOption, []);

   }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Make new FileReader
      // eslint-disable-next-line no-undef
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        // Apply Callback function
        //const dto = new BlobBase64DTO();
        //dto.id = uuid();
        // dto.blob = allFiles[0].base64.split("base64,")[1];
        //dto.type = allFiles[0].type;
        //   this.state.images.push(dto);
        this.setState({
          images: [...allFiles],
          file: null
        });
        const result = this.state.images.map((item) => {
          return {
            id: uuid(),
            cat_opt_id: this.props.catOption.cat_opt_temp[0].id,
            co_temp_id: this.props.catOption.cat_opt_temp[0].id,

            val: item.id,
            content: item,
            element: item.id,
            type: "IMAGE",
            col_id: this.props.catOption.category_link[0].id,
          };
        });
     
        this.props.onChange(this.props.catOption, result);
      }; // reader.onload
    } // for
  }
  removeImage(event) {
    const images = this.state.images.filter((item) => {
      return event.currentTarget.getAttribute("data-tag") != item.id;
    });
    this.setState({
      images: images
    });

    this.props.onChange(
      this.props.catOption,
      images.map((item) => {
        return {
          id: this.props.catOption.cat_opt_temp[0].id,
          val: item.id,
          content: item,
          col_id: this.props.catOption.category_link[0].id
        };
      })
    );
  }

  uploadImage() {
    const dto = new BlobBase64DTO();
    dto.id = uuid();
    dto.blob = this.state.file.base64.split("base64,")[1];
    dto.type = this.state.file.type;
    this.state.images.push(dto);
    this.setState({
      images: dto,
      file: null
    });
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    

    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        filesLimit={this.props.catOption.limit_of - this.state.images.filter(i=>!i.file).length}
        dropzoneText={tran.translate("UPLOAD_ITEM_IMAGES", this.props.catOption.limit_of  - this.state.images.length)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={false}
        maxFileSize={2500000}
        showAlerts={false}
        useChipsForPreview={false}
        showPreviewsInDropzone={true}
        initialFiles={[...this.state.images.filter(i=>i.file).map((i) => i.file)]} //onDropRejected
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
    //  catOptions: state.EditCategoryReducer
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CategoryOptionFormImage));
