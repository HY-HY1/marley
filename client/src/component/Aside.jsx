import React from 'react'
import Style from '../style/aside.module.css'
import { Button } from './Button'

export const Aside = ({ visible }) => {
  return (
    <React.Fragment>
        {visible ? (
                    <div className={Style.container}>
                    <div className={Style.header}>
                        <header>
                            <h1>Cart</h1>
                        </header>
                    </div>
                    <div className={Style.main}>
                        <main>
        
                        </main>
                    </div>
                    <div className={Style.footer}>
                        <footer>
                        <Button
                            isDisabled={false}
                            size="medium"
                            variant="primary"
                            isLoading={false}
                            text="Checkout"
                            className="additionalClass"
                            />
                            <Button
                            isDisabled={false}
                            size="medium"
                            variant="primary"
                            isLoading={false}
                            text="Continue Shopping"
                            className="additionalClass"
                            />
                        </footer>
                    </div>
                </div>
        ) : (
            <></>
        )}
    </React.Fragment>
  )
}
