import React from 'react'
import Style from '../style/navbar.module.css'
import PDM from '../assets/PDMLogo.avif'
import { Link } from 'react-router-dom'
import { User, MagnifyingGlass, Bag  } from 'phosphor-react'

export const Navbar = () => {
  return (
    <>
        <div className={Style.container}>
          <div className={Style.navbar}>
            <div className={Style.top}>
              <div className={Style.item}>
            
              </div>
              <div className={Style.item}>
              <div className={Style.logo}>
                <Link to={'/'}><img src={PDM} alt="Logo" /></Link>
               </div>
              </div>
              <div className={Style.item}>
                <div className={Style.icons}>
                  <ul>
                    <li><Link to={'/account'}><User size={24}/></Link></li>
                    <li><MagnifyingGlass size={24}/></li>
                    <li><Link to={'/Cart'}><Bag size={24}/></Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={Style.bottom}>
              <ul>
                <li>
                  <Link>Holiday</Link>
                </li>
                <li>
                  <Link>Gift Guide</Link>
                </li>
                <li>
                  <Link>Fragrances</Link>
                </li>
                <li>
                  <Link>Collections</Link>
                </li>
                <li>
                  <Link>Body Line</Link>
                </li>
                <li>
                  <Link>Maiso</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </>
  )
}
