import jwt from 'jsonwebtoken';
import Order from '../../models/Order';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {

    // console.log(req);
    // console.log(req.query._id);

    try {
      const { userId, role } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );

      let orders;

      if (role === 'root' || role === 'admin'){
        orders = await Order.find({ _id: req.query._id })
        .populate({
          path: "products.product",
          model: Product
        })
        //populating the user also//https://stackoverflow.com/questions/12821596/multiple-populates-mongoosejs
        .populate('user');//populte can accept a obj, and also a string
      } else {
        orders = await Order.find({ _id: req.query._id, user: userId })
        .populate({
          path: "products.product",
          model: Product
        });
      }

      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(403).send("Please login again");
    }
  };