// // import products from "../../static/products.json";
// import Product from "../../models/Product";
// import connectDb from "../../utils/connectDb";

// connectDb();

// export default async (req, res) => {
//   const { page, size } = req.query;
//   // Convert querystring values to numbers
//   const pageNum = Number(page);
//   const pageSize = Number(size);
//   let products = [];
//   const totalDocs = await Product.countDocuments();
//   const totalPages = Math.ceil(totalDocs / pageSize);
//   if (pageNum === 1) {
//     products = await Product.find().limit(pageSize);
//   } else {
//     const skips = pageSize * (pageNum - 1);
//     products = await Product.find()
//       .skip(skips)
//       .limit(pageSize);
//   }
//   // const products = await Product.find();
//   res.status(200).json({ products, totalPages });
// };

// import products from '../../static/products.json'
import connectDb from '../../utils/connectDb';
import Product from '../../models/Product';

connectDb();//************ */just execute it like this to connect to db

export default async (req, res) => {
    // console.log(req);
    // console.log(req.method);//useful to filter out methods that are not valid
    // res.status(200).send('some string value');//to send back a string response.
    const { page, size } = req.query;
    const pageNum = Number(page);
    const pageSize = Number(size);

    let products = [];

    const totalDocs = await Product.countDocuments();

    const totalPages = Math.ceil(totalDocs / pageSize);

    if (pageNum === 1){
        products = await Product.find().limit(pageSize);//*** */does n't actually return a promie to get a promise - Product.find.exec()
    } else {
        //if pageNum == 2 then skips will be 9, so it will skip the first 9 docs and so on
        const skips = pageSize * (pageNum - 1);
        products = await Product.find().skip(skips).limit(pageSize);//*** */does n't actually return a promie to get a promise - Product.find.exec()
    }

    // const products = await Product.find();//*** */does n't actually return a promie to get a promise - Product.find.exec()

    res.status(200).json({
        products, totalPages, page
    });
}