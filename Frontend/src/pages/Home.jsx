import React, { useEffect } from 'react'
import Footer from '../components/footer'
import Header_navbar from '../components/Header_navbar'
import { useAuth } from '../context/auth'
const Home = () => {
  const {isLoggedIn, auth} = useAuth()
 

  return (
    <div>
      <Header_navbar/>
      <h1 className='text-3xl text-blue-700'>
        HOME PAGE
      </h1>
      <pre>
        {isLoggedIn ? "Hello" : "No"}
      </pre>
      <Footer/>
    </div>
  )
}

export default Home