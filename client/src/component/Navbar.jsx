import React from 'react'
import Style from '../style/navbar.module.css'
import PDM from '../assets/PDMLogo.avif'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
        <div className={Style.container}>
          <div className={Style.navbar}>
            <div className={Style.top}>
              <div className={Style.item}>
                <Link to={'/'}><img src={PDM} alt="Logo" /></Link>
              </div>
              <div className={Style.item}>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div className={Style.bottom}>
              <ul>
                <li>Fragrances</li>
                <li>Collections</li>
              </ul>
            </div>
          </div>
        </div>
    </>
  )
}
