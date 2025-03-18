import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
const PaginaR = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const videoSrc = "https://stream3.aswifi.it/radiopopizz/live/index.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
    }
  }, []);
  return (
    <div className="container">
      <div className="video-container">
        <video
          ref={videoRef}
          id="my-video"
          className="video-js"
          controls
          preload="auto"
          poster="https://www.radiopopizz.it/asset/popizzLogo.png">
          <source src="https://stream3.aswifi.it/radiopopizz/live/index.m3u8"
          type="application/x-mpegURL" />
        </video>
      </div>
    </div>

  );
};

export default PaginaR;