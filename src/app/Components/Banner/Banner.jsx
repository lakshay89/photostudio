import React from 'react'
import './banner.css'

export default function Banner() {
  return (
    <>
      <div className='BannerMainSec'>
        <div className='TextSection'>
             <h3 className='mainBannerTitle'>Transform Your Memories Into </h3>
             <h3 className='mainBannerSubTitle'>Stunning Acrylic Art</h3>
            <div className='ParaSection'>
            <p className='BannerPara'>Premium quality acrylic photo prints that bring your precious moments to life with vibrant colors and crystal-clear clarity</p>
            </div>
            
              <div className='BannerBtnSec'>
                <button className='BannerBtn1'>Start Creating Now</button>
                <button className='BannerBtn2'>View Gallery</button>
              </div>
        </div>
        

      </div>
    </>
  )
}
