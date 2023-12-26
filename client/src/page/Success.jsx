import React from 'react'
import { Button } from '../component/Button'

export const Success = () => {
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
