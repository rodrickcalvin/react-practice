import React, { useEffect, useState } from 'react';
import ImageToggleOnScroll from '../components/ImageToggleOnScroll';

const ImageChangeOnScroll = () => {
  const imageStore = [1124, 187, 823, 1269, 1530]
  const [currentSpeakerId, setCurrentSpeakerId] = useState(0);
  const [mouseEventCnt, setMouseEventCnt] = useState(0);

  useEffect(() => {
    window.document.title = `SpeakerId: ${currentSpeakerId}`;
    console.log(`useEffect: setting title to ${currentSpeakerId}`);
  }, [])


  return (
    <div>
      <span>MouseEvent-Counter: {mouseEventCnt}</span>
      {imageStore.map((speakerId) => {
        return (
          <div
            key={speakerId}
            onMouseOver={() => {
              setCurrentSpeakerId(speakerId);
              setMouseEventCnt(mouseEventCnt + 1);
              console.log(`onMouseOver:${speakerId}`);
            }}
          >
            <ImageToggleOnScroll
              primaryImg={`/static/speakers/bw/Speaker-${speakerId}.jpg`}
              secondaryImg={`/static/speakers/Speaker-${speakerId}.jpg`}
              alt=""
            />
          </div>
        )
      })}
    </div>
  );
};

export default ImageChangeOnScroll;
