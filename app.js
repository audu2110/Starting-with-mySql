const path = require('path');
const db=require('./util/database');
const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors');
const errorController = require('./controllers/error');

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.json());

db.execute('SELECT * FROM products')
.then(result=>{
    console.log(result);
})
.catch(err=>{
    console.log(err);
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
