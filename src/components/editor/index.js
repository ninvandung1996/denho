import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { endpointImage } from "../../redux/api/common";
import configs from "../../redux/constants/configs";
const editorProps = {
  apiKey: "kafqfni3x7vjqn0u9cgerj6x94455s9xpcy7cn87v1ydljrb",
  cloudChannel: "dev",
  init: {
    selector: "textarea",
    height: 400,
    menubar: true,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks fullscreen",
      "insertdatetime media table contextmenu "
    ],
    toolbar:
      "undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code",
    // powerpaste_allow_local_images: true,
    // powerpaste_word_import: "prompt",
    // powerpaste_html_import: "prompt",
    content_css: [
      "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
      "//www.tinymce.com/css/codepen.min.css"
    ],
    images_upload_handler: function (blobInfo, success, failure) {
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      axios
        .post(`${configs.endPoint}/uploads/files/notify/`, formData)
        .then(res => {
          const linkImage = res.data.data;
          success(`${endpointImage}/${linkImage}`);
        })
        .catch(error => failure(error.message));
    },
    automatic_uploads: true,
    paste_data_images: true
  }
  // init: {
  //   content_css: ["//fonts.googleapis.com/css?family=Lato:300,300i,400,400i"],
  //   plugins:
  //     "print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount   imagetools mediaembed   contextmenu colorpicker textpattern help",
  //   // plugins: "image code imagetools paste table wordcount",
  //   toolbar1:
  //     "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
  //   content_style: "div {margin: 10px; padding: 3px}",
  //   selector: "textarea", // change this value according to your HTML
  //   imagetools_toolbar:
  //     "rotateleft rotateright | flipv fliph | editimage imageoptions",
  //   font_formats:
  //     "Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n",
  //   images_upload_handler: function(blobInfo, success, failure) {
  //     const formData = new FormData();
  //     formData.append("file", blobInfo.blob(), blobInfo.filename());

  //     axios
  //       .post(`${configs.endPoint}/uploads/files/notify/`, formData)
  //       .then(res => {
  //         const linkImage = res.data.data;
  //         success(`${endpointImage}/${linkImage}`);
  //       })
  //       .catch(error => failure(error.message));
  //   },
  //   automatic_uploads: true,
  //   paste_data_images: true,
  //   themes: "modern"
  // }
};
export default class extends Component {
  render() {
    return (
      <div className="App">
        <Editor
          {...editorProps}
          {...this.props.customProps}
          init={{ ...editorProps.init, ...this.props.customProps.init }}
        />
      </div>
    );
  }
}
