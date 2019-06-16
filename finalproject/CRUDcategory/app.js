var express = require('express');
var exphbs  = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var morgan = require('morgan');
var app=express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout:'main.hbs',
    layoutsDir:'./views/_layouts',
    helpers: {
        section: hbs_sections()
    }
}));
require('./middlewares/upload')(app);

app.set('view engine', 'hbs');
 
app.get('/',(req,res)=>{
    res.render('home.hbs');
})
app.use('/writer', require('./routes/writer.route'));
app.use('/admin', require('./routes/admin/admin.route'));
// app.use('/admin/users', require('./routes/admin/user.route'));
// app.use('/admin/categories', require('./routes/admin/category.route'));
// app.use('/admin/tags', require('./routes/admin/tag.route'));
// app.use('/admin/posts', require('./routes/admin/post.route'));
app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000');
})
