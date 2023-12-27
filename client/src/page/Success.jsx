import React, { useEffect } from 'react'
import { Button } from '../component/Button'
import { useShop } from '../context/ShopContext'

export const Success = () => {

  const { clearCart } = useShop()

  useEffect(() => {
    clearCart()
  })

  const handleClick = () => {
    
  }
  return (
    <>
      <h1>Thank you for your order</h1>
      <Button
        isDisabled={false}
        onClick={handleClick}
        size="medium"
        variant="primary"
        isLoading={false}
        text="Track Order"
        className="additionalClass"
      />
    </>
  )
}
