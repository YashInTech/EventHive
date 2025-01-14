import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (

    <div className='flex flex-row bg-yellow-200'>
        <div className='flex flex-col sm:mx-8 mx-4 gap-7'>
            <h1 className='font-bold font-serif sm:text-[60px] text-[30px] text-left mt-12 text-black'>
            Seamless event planning at your fingertips. <br />
            Manage every detail with simplicity and precision.</h1>
            <p className='sm:text-2xl text-base text-gray-500 text-left'>Our intuitive platform helps you stay organized, 
                ensuring every detail is handled smoothly—so you can focus on what truly matters.</p>
            <Link to={'/create-event'}>
                <button className='mb-5'>Let's Get Started</button>
            </Link>
        </div>    
    </div>
  )
}

export default Home