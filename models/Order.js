import mongoose from "mongoose";

const { ObjectId, Number, String } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
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
    ],
    email: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true//this will create time stamps in the document
});
  
  export default mongoose.models.Order ||
    mongoose.model("Order", OrderSchema);