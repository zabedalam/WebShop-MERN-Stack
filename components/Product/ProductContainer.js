import ProductAttributes from "./ProductAttributes";


// function ProductContainer({prod}){

function ProductContainer({name, price, description, mediaUrl, sku, _id, user}){
    // console.log(user)
    return (
        <ProductAttributes name={name} price={price} description={description}
        mediaUrl={mediaUrl} sku={sku} _id={_id} user={user}
        />
    )
}

export default ProductContainer;