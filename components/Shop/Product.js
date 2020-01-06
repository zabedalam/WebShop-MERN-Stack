function Product({product}){

    const productContent = product ? 
    (
    <>
        <div className="col-3" style={{padding: "10px"}}>
        <a href={`/product?_id=${product._id}`} style={{textDecoration: "none"}}>
        <div className="div-product border">
        <div className="img-product">
                    <img src={product.mediaUrl} alt="Product"></img>
                </div>
                <div className="div-info-product">
                    <div className="info-product">
                        <p className="name-product">{product.name}</p>
                        <p className="price-product">${product.price}</p>
                    </div>
                </div>
            </div>
            </a>
        </div>
    </>
    )
    :
    (<div className="col-3" style={{padding: "10px"}}></div>)

    return productContent;

}

export default Product;