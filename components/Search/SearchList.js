function SearchList({item}){

    // console.log(item);

    return (
        <li>
        <div className="search-item">
            <div className="div-img-search">
                <img src={item.mediaUrl} alt="product"/>
            </div>
            <div className="div-item-search">
                <p><a href={`/product?_id=${item._id}`}>{item.name}</a></p>
            </div>
            <div className="clearfix"></div>
        </div>
    </li>        
    )

}

export default SearchList;