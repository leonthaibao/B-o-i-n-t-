var express = require('express');
var exphbs  = require('express-handlebars');
var hbs_section = require('express-handlebars-sections');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
            section: hbs_section()
    }
}));
app.set('view engine', 'hbs');

app.get('/', (req,res) => { 
    res.render('home');
});

app.use('/account',require('./routes/account.route'));

app.use(express.static('public'));

app.listen(3000, ()=>{
    console.log('sever is running http://localhost:3000');
})