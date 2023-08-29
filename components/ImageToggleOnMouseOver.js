import React, {useRef} from "react";

const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {
  const imageRef = useRef(null)
  
  return (
    <div>
      <img
      onMouseOver={() => {imageRef.current.src = secondaryImg}}
      onMouseOut={() => {imageRef.current.src = primaryImg}} 
      src={primaryImg}
      alt=""
      ref={imageRef}
      />
    </div>
  );
}
 
export default ImageToggleOnMouseOver;