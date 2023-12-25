import React, { useState } from 'react';
import { CaretRight, CaretDown  } from 'phosphor-react';
import Style from '../style/accordion.module.css';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={Style.container}>
        <div className={Style.accordion}>
            <div className={Style.accordionHeader} onClick={toggleAccordion}>
                <h3>{title}<span>{isOpen ?  <CaretDown/> : <CaretRight/>}</span></h3>
                
            </div>
            {isOpen && <div className={Style.accordionContent}><p>{content}</p></div>}
        </div>
    </div>
  );
};

export default Accordion;
