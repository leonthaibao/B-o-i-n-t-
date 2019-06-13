var express = require('express');
var morgan = require('morgan');


var app = express();
app.use(morgan('dev'));

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);

app.use(express.urlencoded({extended:true }));
app.use(express.json());


app.get('/', (req,res) => { 
    res.render('home');
});
app.use('/writer',require('./routes/writer.route'));

app.use('/account',require('./routes/account.route'));

app.use(express.static('public'));

app.listen(3000, ()=>{
    console.log('sever is running http://localhost:3000');
})