const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'ecommerce_shop',
    password:'AUDUMBAR'
});
module.exports=pool.promise();