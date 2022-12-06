import React from 'react'
import Logo from '../img/logo_kc.png'

const Footer = () => {
  return (
    <footer className='container'>
      <img src={Logo} alt="logo" />
      <span>Made with ❤️ and <b>React.js</b>.</span>
    </footer>
  )
}

export default Footer