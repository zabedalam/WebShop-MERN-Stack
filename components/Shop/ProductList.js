import Product from './Product';

function ProductList({products}) {
  
  const list = [];

  //https://stackoverflow.com/questions/44309300/iterating-over-json-in-react  
  // Object.keys(products).forEach(function(key) {
    // const num = products[key].length/3;
    const num = products.length/3;
    const numRows = Math.ceil(num);
    // console.log(numRows);

    let j = 0;
    let p, q, r;

    for (let i = 0; i < numRows; i++){

        p = (i+(i+j+0)).toString();
        q = (i+(i+j+1)).toString();
        r = (i+(i+j+2)).toString();

        // console.log(j);
        //index.js:1 Warning: Each child in a list should have a unique "key" so added this
        //<div key={i.toString() + '_row'} 
        //https://stackoverflow.com/questions/36251751/react-send-keyed-children-to-a-component-keys-always-null
        
        list.push(
          <div key={i.toString() + '_row'} className="container flex" style={{marginBottom: "40px"}}>
            <Product key={ p } product={products[(i+(i+j+0))]} />
            <Product key={ q } product={products[(i+(i+j+1))]} />
            <Product key={ r } product={products[(i+(i+j+2))]} />
          </div>
        );
        
        
        // console.log(i+(i+j+0))
        // console.log(i+(i+j+1))
        // console.log(i+(i+j+2))
        j = j + 1;
      }  
      // console.log(list);  
  // });

  return (list);

}

export default ProductList;
