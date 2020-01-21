import mongoose from "mongoose";

const { ObjectId, Number } = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema({
    user: {
      //the ObjectId of each collection is important because when we call populate on them we can get 
      //the entire user Document.  
      type: ObjectId,
      ref: "User"
    },
    products: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                //the ObjectId of each collection is important because when we call populate on them we can get 
                //the entire user Document. 
                type: ObjectId,
                ref: "Product"
            }
        }
    ]

});
  
  export default mongoose.models.Cart ||
    mongoose.model("Cart", CartSchema);