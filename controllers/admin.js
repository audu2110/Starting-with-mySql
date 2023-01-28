const Product = require('../models/product');
const fs = require('fs');
const path = require('path');
const p=path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);


const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};




exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postProducts=(req,res,next)=>{
  console.log(req.body);
  let incomingData=req.body;
  getProductsFromFile(products => {
    products.push(incomingData);
    fs.writeFile(p, JSON.stringify(products), err => {
      console.log(err);
    });
  });
  // res.send({type:'POST'}); 
}

exports.getProducts = (req, res, next) => {
  console.log("check thi")
  Product.fetchAll(products => {
    res.json(products);

  });
};

exports.getProductsById = (req, res, next) => {
  
  Product.fetchAll(products => {
    console.log(products);
    products.forEach(product=>{
      console.log(product.id);
      if(product.id===req.params.id){
        console.log("matched",product.id);
        res.json(product);
      }
    })
  });
};
