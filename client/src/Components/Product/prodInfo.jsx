import React from 'react';
import MyButton from '../utils/button'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdInfo = (props) => {
  const detail = props.detail;

  const showProdTags = (detail) => (
    <div className="product_tags">
      {
        detail.shipping ?
          <div className="tag">
            <div><FontAwesomeIcon icon={faTruck}/></div>
            <div className="tag_text">Free Shipping and Return</div>
          </div>
        : null
      }
         
      {
        detail.available ?
          <div className="tag">
            <div><FontAwesomeIcon icon={faCheck}/></div>
            <div className="tag_text">Available in store</div>
          </div>
        :
          <div className="tag">
            <div><FontAwesomeIcon icon={faTimes}/></div>
            <div className="tag_text">Not Available</div>
            <div className="tag_text">Preorder Only</div>
          </div>

      }
    </div>
  )

  const showProdAction = (detail) => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <MyButton 
          type="add_to_cart_link"
          runAction={() => {
            console.log('add to cart')
          }}
        />
      </div>
    </div>
  )

  const showProdSpecifications = (detail) => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets:</strong> {detail.frets}
        </div>
        <div className="item">
          <strong>Wood:</strong> {detail.wood.name}
        </div>
      </div>
    </div>
  )
  
  return (
    <div>
      <h1>{detail.brand.name} {detail.name}</h1>
      <p>{detail.description}</p>
      { showProdTags(detail)}
      { showProdAction(detail)}
      { showProdSpecifications(detail)}
    </div>
  );
};

export default ProdInfo;