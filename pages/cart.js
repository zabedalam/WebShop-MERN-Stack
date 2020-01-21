import React, { useState, useEffect } from 'react';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import catchErrors from '../utils/catchErrors';

function Cart({ user, products }) {

// const { prod } = products;

// console.log(products)
  const [cartProducts, setCartProducts] = useState(products.products);
  const [msg, setMsg] = useState({display: 'none', class: '', msg: '' }); 
  const [loading, setLoading] = useState(false);
 
  
//   console.log(products.products);
//   console.log(user)

//   const cartProds = products.products;

//   console.log(cartProds);
//   console.log(cartProducts);

//   useEffect(() => {

//     setLoading(true);

//   }, [cartProducts]);


  function displayError(errorMsg){
    setMsg({display: 'block', class: "msg msg-fail", msg: `Fail! ${errorMsg}.`});
  } 

  async function handleRemoveFromCart(e, productId){

    e.preventDefault();
    
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token');
    const payload = {
        params: {//because the productId is being passed as params we will have to get it in the end point as req.query;
            productId
        },
        headers: {
            Authorization: token
        }
    }
    const response = await axios.delete(url, payload);
    // console.log(response.data);
    setCartProducts(response.data);

  }

  async function handleCheckout(paymentData){
    try {
        setLoading(true);
        const url = `${baseUrl}/api/checkout`;
        const token = cookie.get('token');
        const payload = { paymentData }
        const headers = {
            headers: { Authorization: token }
        }

        const response = await axios.post(url, payload, headers);

        // console.log(response.data);
        setCartProducts(response.data);
        
        setMsg({display: 'block', class: "msg msg-success", msg: "Success! payment received."});

    } catch (error) {
        console.error(error);
        catchErrors(error, displayError);
    } finally {
        setLoading(false);
    }
  }


  
  function mapCartProducts(prods){
      if (prods.length !== 0){
        return prods.map(prod => <CartItemList 
            key={prod._id} 
            quantity={prod.quantity} 
            {...prod.product} 
            handleRemoveFromCart={handleRemoveFromCart}/>)
      } else {
          return null;
      }

  }  

  const message = msg.display === 'block' ? <div className={msg.class}>{msg.msg}</div> : null;

  if (!user){
      return (
        <section className="section-cart-data">
            <h2 className="title" style={{marginTop: '150px'}}>CART.</h2>

                <div className="div-msg">
                    {message}
                </div>  
            
            <div className="div-msg">
                <div className="msg msg-fail"><a href="/login">Login</a> to add products to your cart.</div>
            </div>
        </section>
      ) 
  } else if (cartProducts !== undefined){
      
      if (cartProducts.length === 0){
        
        return (
            <section className="section-cart-data">
                <h2 className="title" style={{marginTop: '150px'}}>CART.</h2>
                    <div className="div-msg">
                        {message}
                    </div>  
                
                <div className="div-msg">
                    <div className="msg msg-fail"> <a href="/shop"> BACK TO SHOP PAGE.</a></div>
                </div>
            </section>
        ) 

      } else if (loading){       
        return (
            <section className="section-cart-data">
                <div className="container" style={{textAlign: 'center', fontSize: '500%', margin: '15% 15%'}}>
                <i className="fas fa-spinner fa-spin"></i>
                </div>
            </section>
        )
      } else {

        return (
            <section className="section-cart-data">
                <h2 className="title" style={{marginTop: '150px'}}>CART.</h2>
                {mapCartProducts(cartProducts)}
                <CartSummary products={cartProducts} handleCheckout={handleCheckout} />
                {/* {console.log(cartProducts)} */}
            </section>    
        );
      }


  } else if (cartProducts === undefined){
    return (
        <section className="section-cart-data">
            <h2 className="title" style={{marginTop: '150px'}}>CART.</h2>
                <div className="div-msg">
                    {message}
                </div>  
            
            <div className="div-msg">
                <div className="msg msg-fail"> <a href="/shop"> BACK TO SHOP PAGE.</a></div>
            </div>
        </section>
    )      
  }  

}

  //get the initial data that will be added to the props parameter
  Cart.getInitialProps = async (ctx) => {//ctx give us access to the req. res objs.
    const { token } = parseCookies(ctx);

    if (!token){//if not logged in let the products array be empty
        return { products: [] };
    }

    //fetch data on the server
    // return {hello: "world"};
    const url = `${baseUrl}/api/cart`
    const payload = {headers: { Authorization: token } }
    const response = await axios.get(url, payload);
    return { products: response.data };
    //and return the data as an object

    //this obj. will be merged with existing props, it wont overide the other props

  };

export default Cart;

