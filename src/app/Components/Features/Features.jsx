import React from 'react'
import './features.css'
import pic1 from '@/app/Assets/Images/feature1.jpg'
import pic2 from '@/app/Assets/Images/feature2.jpg'
import pic3 from '@/app/Assets/Images/feature3.jpg'
import pic4 from '@/app/Assets/Images/feature4.jpg'
import Image from 'next/image'
import { FiUpload } from "react-icons/fi";
import { IoPrintSharp } from "react-icons/io5";
import { FaTruck } from "react-icons/fa6";
import { MdZoomOutMap } from "react-icons/md";





export default function Features() {

    const features = [
        {id:1, title:"Upload Your Photo",subtitle:"Choose your favorite high-resolution photo from your device or cloud storage",icon: <FiUpload  className='fs-3'/>, image:pic1},
        {id:2, title:"Upload Your Photo",subtitle:"Choose your favorite high-resolution photo from your device or cloud storage",icon:<IoPrintSharp  className='fs-3'/>, image:pic2},
        {id:3, title:"Upload Your Photo",subtitle:"Choose your favorite high-resolution photo from your device or cloud storage",icon:<FaTruck  className='fs-3'/> , image:pic3},
        {id:4, title:"Upload Your Photo",subtitle:"Choose your favorite high-resolution photo from your device or cloud storage",icon:<MdZoomOutMap  className='fs-3'/> , image:pic4}
    ]
  return (
    <div className='FeaturesMainSection'>
        <div className="FeatureTopSection">
             <h3>How it Works</h3>
           <p>Creating your perfect acrylic print is simple and straightforward</p>
        </div>
    <div className="FeatureBottomSection">
        <div className="container">
            <div className="row">
               {features.map((item, index)=>(
                <div className="col-md-3" key={index}>
                   <div className='card FeatureCard'>
                           <div className='CardContent'>
                            <Image src={item.image} alt={item.title} className='FeatureImg'/>
                             <div>
                                <span className='overlayNum'>{item.id}</span>
                             </div>
                            <div className='FeatureTextSection'>
                                <span className='text-success mb-2 ' style={{background :" #e6fffa"}}>{item.icon}</span>
                                <h3>{item.title}</h3>
                                <p>{item.subtitle}</p>
                            </div>
                              </div>
                   </div>
                  </div>
               ))
                 
               }
            </div>
        </div>
    </div>
        
    </div>
  )
}
