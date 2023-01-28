const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const adminController = require('../controllers/admin');
const { Router } = require('express');
let p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.post('/products',adminController.postProducts);

// /admin/products => GET
router.get('/products', adminController.getProducts);

router.get('/products/:id', adminController.getProductsById);



//  /admin/products=>POST


module.exports = router;
