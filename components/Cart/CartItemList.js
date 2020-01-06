// import {
//   Header,
//   Segment,
//   Button,
//   Icon,
//   Item,
//   Message
// } from "semantic-ui-react";
// import { useRouter } from "next/router";

// function CartItemList({ products, user, handleRemoveFromCart, success }) {
//   const router = useRouter();

//   function mapCartProductsToItems(products) {
//     return products.map(p => ({
//       childKey: p.product._id,
//       header: (
//         <Item.Header
//           as="a"
//           onClick={() => router.push(`/product?_id=${p.product._id}`)}
//         >
//           {p.product.name}
//         </Item.Header>
//       ),
//       image: p.product.mediaUrl,
//       meta: `${p.quantity} x $${p.product.price}`,
//       fluid: "true",
//       extra: (
//         <Button
//           basic
//           icon="remove"
//           floated="right"
//           onClick={() => handleRemoveFromCart(p.product._id)}
//         />
//       )
//     }));
//   }

//   if (success) {
//     return (
//       <Message
//         success
//         header="Success!"
//         content="Your order and payment has been accepted"
//         icon="star outline"
//       />
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <Segment secondary color="teal" inverted textAlign="center" placeholder>
//         <Header icon>
//           <Icon name="shopping basket" />
//           No products in your cart. Add some!
//         </Header>
//         <div>
//           {user ? (
//             <Button color="orange" onClick={() => router.push("/")}>
//               View Products
//             </Button>
//           ) : (
//             <Button color="blue" onClick={() => router.push("/login")}>
//               Login to Add Products
//             </Button>
//           )}
//         </div>
//       </Segment>
//     );
//   }

//   return <Item.Group divided items={mapCartProductsToItems(products)} />;
// }

// export default CartItemList;


import { withRouter } from "next/router";

function CartItemList({name, quantity, price, mediaUrl, _id, handleRemoveFromCart}) {

  return (
    <div className="container flex border margin-t">
    <div className="col-2">
        <div className="div-product ">
            <div className="img-product">
                <img src={ mediaUrl } alt="Product"/>
            </div>
        </div>                
    </div>
    <div className="col-2">

        <div className="cart-info-product">
            <p className="name-product"><a href={ `/product?_id=${_id}` }>{ name }</a></p>
            <p className="price-product">{ quantity } X ${ price }</p>
            <span><button 
            style={{backgroundColor: 'white', border: '0', color: '#91ce89'}}
            onClick={ (e) => handleRemoveFromCart(e, _id) }><i className="fas fa-trash"></i></button></span>
        </div>
        
    </div>
</div>
  );
}

export default CartItemList;
