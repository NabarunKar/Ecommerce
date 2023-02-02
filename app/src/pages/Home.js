import React from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'

function Home() {
  return (
    <div>
        <Navbar/>
        <Slider/>
        <Products/>
    </div>
  )
}

export default Home