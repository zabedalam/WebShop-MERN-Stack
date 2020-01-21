import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary(prods) {
  console.log(prods.handleCheckout)
  // console.log(handleCheckout)

  const { products } = prods;
  // console.log(products);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);
  const cartTotal = calculateCartTotal(products);

  // console.log(cartTotal)

  useEffect(() => {
    setCartAmount(cartTotal[0]);
    setStripeAmount(cartTotal[1]);
    setIsCartEmpty(products.length === 0 ? true : false);
  }, [products]);

  const chekcoutBtn = isCartEmpty ? null : (
    <div className="container flex">
      <div className="checkout">
          <h3>
              CHECKOUT
          </h3>
          <StripeCheckout
          name="MERN STACK"
          amount={ stripeAmount }
          // image={ products.length > 0 ? products[0].product.mediaUrl : '' }
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_ReOv8DJAobTrle2ezSuhyznn00XV0nfRYd"
          token={prods.handleCheckout}
          //triggerEvent={onClick}//show the stripe modal on click
          >
              <button className="btn btn-primary btn-full-width">PAY: ${ cartAmount }</button>
          </StripeCheckout>

      </div>
    </div> 
  )

  return (
     chekcoutBtn 
  );
}

export default CartSummary;
