import React, {useEffect, useRef, useState} from "react";

const ImageToggleOnScroll = ({primaryImg, secondaryImg}) => {
  const imageRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  // check if image is in scrollable view area
  const isInView = () => {
    const rect = imageRef.current.getBoundingClientRect()
    return rect.top >= 0 && rect.bottom < window.innerHeight
  }

  const scrollHandler = () => {
    setInView(isInView())
  }

  useEffect(() => {
    setIsLoading(false)
    setInView(isInView())
    window.addEventListener("scroll", scrollHandler)

    return () => {
      window.removeEventListener("scroll", scrollHandler)
    }
  },[])
  
  return (
    <div>
      <img
      src={
        isLoading
          ? 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' // 1x1gif
          : inView ? secondaryImg : primaryImg
      }
      alt=""
      ref={imageRef}
      />
    </div>
  );
}
 
export default ImageToggleOnScroll;