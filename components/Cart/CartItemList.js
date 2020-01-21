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
