var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var app=express();
app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.json());

app.engine('hbs', exphbs({
    defaultLayout:'main.hbs',
    layoutsDir:'./views/_layouts'
}));

app.set('view engine', 'hbs');
 
app.get('/',(req,res)=>{
    res.render('home.hbs',{style:'adminstyle.css'});
})
app.use('/admin/categories', require('./routes/admin/category.route'));

app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000');
})
