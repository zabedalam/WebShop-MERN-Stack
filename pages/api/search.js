import connectDb from '../../utils/connectDb';
import Product from '../../models/Product';

connectDb();//************ */just execute it like this to connect to db

export default async (req, res) => {
    // console.log(req);
    // console.log(req.method);//useful to filter out methods that are not valid
    // res.status(200).send('some string value');//to send back a string response.
    const { q } = req.query;

    const search = q;

    // console.log(search);
    // console.log(req.query)

    const resultArray = [];

    const products = await Product.find();

    // const products = await Product.find();//*** */does n't actually return a promie to get a promise - Product.find.exec()

    if (search) {
      products.map((el) => {
        const c = el.name;
        let obj;
        if (c.toLowerCase().startsWith(search.toLowerCase())) {
            obj = { _id: el._id, name: el.name, mediaUrl: el.mediaUrl }
          resultArray.push(obj);
        }
      })
    }

    res.status(200).json({
        resultArray
    });
}