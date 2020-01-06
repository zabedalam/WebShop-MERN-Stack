// function calculateCartTotal(products) {
//     const total = products.reduce((acc, el) => {
//       acc += el.product.price * el.quantity;
//       return acc;
//     }, 0);
//     const cartTotal = ((total * 100) / 100).toFixed(2);
//     const stripeTotal = Number((total * 100).toFixed(2));
  
//     return { cartTotal, stripeTotal };
//   }
  
//   export default calculateCartTotal;


function calculateCartTotal(products){

  function sum(arr) {    
      var sum = 0;
      for (var index = 0; index < arr.length; index++) {
        sum += arr[index];
      }    
      return sum;
    }

  // console.log(products);
  if (products){

  const productsSubTotals = products.map((el, i, arr) => {
      return el.quantity * el.product.price;
  });

  // console.log(productsSubTotals);


  //Not working   
  // const cartTotal = productsSubTotals.forEach((el) => {
  //     x = x + el; 
  //     return x;
      
  // });

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  // const array1 = [1, 2, 3, 4];
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
  // // 1 + 2 + 3 + 4
  // console.log(array1.reduce(reducer));
  // const array1 = [1, 2, 3, 4];
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // // 1 + 2 + 3 + 4
  // //https://stackoverflow.com/questions/32300649/js-round-to-2-decimal-places - toFixed(2)
  // const cartTotal =  productsSubTotals.reduce(reducer).toFixed(2);
  // const stripeTotal = Number(productsSubTotals.reduce(reducer, 0).toFixed(2) * 100);
  
  
  const cartTotal = sum(productsSubTotals);
  const stripeTotal = Number(cartTotal.toFixed(2) * 100);
  return [cartTotal, stripeTotal];
  }
  return [0, 0];
}

export default calculateCartTotal;
  