import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Accordion from './Accordion'; // Import your Accordion component
import Style from '../style/item.module.css'; // Import your CSS module
import { useShop } from '../context/ShopContext';
import Button from '../style/buttons.module.css'
export const Item = () => {
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const { addToCart } = useShop();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/product/${id}`);
        setItem(response.data[0]);
        setSelectedImage(response.data[0].description.type.images[0])
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [id]);

  console.log(selectedImage)

  return (
    <div>
      {item ? (
        <>
          <div className={Style.container}>
          <div className={Style.half}>
            {item.description && item.description.type && item.description.type.images && (
              <div className={Style.images}>
                {selectedImage && (
                  <div className={Style.selected}>
                    <img src={selectedImage} alt="Main" className={Style.mainImage} />
                  </div>
                )}
                <div className={Style.imageGallery}>
                  {item.description.type.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${index}`}
                      onClick={() => setSelectedImage(image)}
                      className={selectedImage === image ? Style.mainImage : ''}
                    />
                  ))}
                </div>
              </div>
            )}            
            </div>
            <div className={Style.half}>
              <div className={Style.halfContainer}>
                <div className={Style.name}>
                  <h2 className={Style.itemName}>{item.name}</h2>
                  <p className={Style.itemType}>{item.description.type.type}</p>
                  <p className={Style.itemPrice}>{item.price}£</p>
                </div>
                <div className={Style.addToCartButton}>
                  <button className={Button.addToCart} onClick={() => addToCart(item.id, item.price)}>Add to Cart</button>
                </div>
                <div className={Style.accordion}>
                  <Accordion title={'Description'} content={item.description.type.description} />
                  {item.description && item.description.notes && (
                    <>
                      <Accordion title="Olfactive Notes" content={
                        <>
                          <h3 className={Style.subTitle}>Top Notes:</h3>
                          <p className={Style.notes}>{item.description.notes.top.join(', ')}</p>
                          <h3 className={Style.subTitle}>Heart Notes:</h3>
                          <p className={Style.notes}>{item.description.notes.heart.join(', ')}</p>
                          <h3 className={Style.subTitle}>Base Notes:</h3>
                          <p className={Style.notes}>{item.description.notes.base.join(', ')}</p>
                          <h3 className={Style.subTitle}>Best Time to Wear:</h3>
                          <p className={Style.notes}>{item.description.notes.time}</p>
                        </>
                      } />
                    </>
                  )}
                </div>
              </div>
            </div>
        </div>




        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
