import React from 'react'
import './premium.css'
import Image from 'next/image'
import pic1 from '@/app/Assets/Images/premium.jpg'
import pic2 from '@/app/Assets/Images/premium1.jpg'
import { FaCheck } from "react-icons/fa";

export default function Premium() {



    const premium = [
        { id: 1, title: "Classic Acrylic Print", image: pic1, subtitle: "Perfect for portraits and landscapes with vibrant color reproduction", list1: "UV Resistant", list2: "Scratch Resistant", list3: "Easy to Clean" },
        { id: 2, title: "Classic Acrylic Print", image: pic2, subtitle: "Perfect for portraits and landscapes with vibrant color reproduction", list1: "UV Resistant", list2: "Scratch Resistant", list3: "Easy to Clean" },
        { id: 3, title: "Classic Acrylic Print", image: pic1, subtitle: "Perfect for portraits and landscapes with vibrant color reproduction", list1: "UV Resistant", list2: "Scratch Resistant", list3: "Easy to Clean" },
    ]
    return (
        <>
            <div className='PremiumMainSec'>
                <div className="PremiumTopSec">
                    <h3>Our Premium Products</h3>
                    <div className='paraPremium'>
                        <p>Choose from our collection of high-quality acrylic photo products designed to showcase your memories beautifully</p>
                    </div>
                </div>



                <div className="PremiumBottomSec">
                    <div className="container">
                        <div className="row">
                            {premium.map((item) => (
                                <div key={item.id} className="col-md-4 mb-4">
                                    <div className='card cardSection'>
                                        <Image src={item.image} alt={item.title} className='PremiumImage' />

                                        <div className=' PremiumDetailSection'>
                                            <h4>{item.title}</h4>
                                            <p className=''>{item.subtitle}</p>

                                            <ul className='list-unstyled '>
                                                <li className='listtext'><FaCheck className='me-3 text-success' />{item.list1}</li>
                                                <li className='listtext'> <FaCheck className='me-3 text-success' />{item.list2}</li>
                                                <li className='listtext'><FaCheck className='me-3 text-success' />{item.list3}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
