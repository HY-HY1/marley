import React from 'react'
import { Products } from '../component/Products'
import Accordion from '../component/Accordion'
import { Aside } from '../component/Aside'

export const Index = () => {
  return (
    <>
        <div>
            <Products/>
            <Aside/>
        </div>
    </>
  )
}
