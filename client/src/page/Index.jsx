import React from 'react'
import { Products } from '../component/Products'
import Accordion from '../component/Accordion'

export const Index = () => {
  return (
    <>
        <div>
            <Products/>
            <button><a href="/cart">Cart</a></button>
        </div>
    </>
  )
}
