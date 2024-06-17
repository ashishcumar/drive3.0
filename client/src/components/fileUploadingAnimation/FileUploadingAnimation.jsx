import React from "react";
import "./fileUploadAnimation.css";

function FileUploadingAnimation({animationText}) {
  return (
    <div className="container">
      <div className="folder">
        <div className="top"></div>
        <div className="bottom"></div>
      </div>
      <div className="title">{animationText}</div>
    </div>
  );
}

export default FileUploadingAnimation;
