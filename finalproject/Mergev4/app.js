var express = require('express');
var morgan = require('morgan');


var app = express();
app.use(morgan('dev'));

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);

app.use(express.urlencoded({extended:true }));
app.use(express.json());


app.get('/', (req,res) => { 
    console.log(res.locals.isAuthenticated)
    res.render('home');
});

app.use((req,res,next) =>{
    if(req.user)
    {
        res.locals.isAuthenticated = true;
        res.locals.authUser = req.user;
    }
  
    next();
  });

app.use('/account',require('./routes/account.route'));
app.use('/ad',require('./routes/admin/admin.login.route'));
app.use('/editor', require('./routes/admin/editor.route'));
app.use('/writer', require('./routes/admin/writer.route'));
app.use('/admin', require('./routes/admin/admin.route'));
app.use('/postlist', require('./routes/local.route'));
app.use(express.static('public'));

app.listen(3000, ()=>{
    console.log('sever is running http://localhost:3000');
})