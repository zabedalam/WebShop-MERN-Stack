// import React from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { Button, Segment, Divider } from "semantic-ui-react";
// import calculateCartTotal from "../../utils/calculateCartTotal";

// function CartSummary({ products, handleCheckout, success }) {
//   const [cartAmount, setCartAmount] = React.useState(0);
//   const [stripeAmount, setStripeAmount] = React.useState(0);
//   const [isCartEmpty, setCartEmpty] = React.useState(false);

//   React.useEffect(() => {
//     const { cartTotal, stripeTotal } = calculateCartTotal(products);
//     setCartAmount(cartTotal);
//     setStripeAmount(stripeTotal);
//     setCartEmpty(products.length === 0);
//   }, [products]);

//   return (
//     <>
//       <Divider />
//       <Segment clearing size="large">
//         <strong>Sub total:</strong> ${cartAmount}
//         <StripeCheckout
//           name="React Reserve"
//           amount={stripeAmount}
//           image={products.length > 0 ? products[0].product.mediaUrl : ""}
//           currency="USD"
//           shippingAddress={true}
//           billingAddress={true}
//           zipCode={true}
//           stripeKey="pk_test_SxMEVE9KlnpGvvCPUDVF7PBo00GKDWMXFU"
//           token={handleCheckout}
//           triggerEvent="onClick"
//         >
//           <Button
//             icon="cart"
//             disabled={isCartEmpty || success}
//             color="teal"
//             floated="right"
//             content="Checkout"
//           />
//         </StripeCheckout>
//       </Segment>
//     </>
//   );
// }

// export default CartSummary;


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
