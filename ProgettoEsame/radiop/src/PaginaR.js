import React from 'react'

const PaginaR = () => {
  return (
    <div>
      <div className="container" style={{height: "100%"}}>
      <div className="row-center" style={{height: "100%"}}>
        <div className="col">
          <video id="my-video" class="video-js" controls preload="auto" poster="https://www.radiopopizz.it/asset/popizzLogo.png">
          <source src="https://stream3.aswifi.it/radiopopizz/live/index.m3u8" type="application/x-mpegURL"/>
          </video>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default PaginaR