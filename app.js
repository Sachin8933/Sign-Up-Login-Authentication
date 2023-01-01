const express=require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const homeRouter=require('./routers/homeRouter');

const port =process.env.port|| 8080;

const app =express();

//db connect
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://localhost:27017/registration',{useNewUrlParser:true })
const db =mongoose.connection;
db.on("error" ,()=>{
    console.log("Error in connection");
})
db.once('open',()=>{
    console.log("Connected");















})

app.set('view engine' ,'ejs')
app.use(express.static('public'))
// parse application/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// Parse application/json
app.use(bodyParser.json())



app.use('/', homeRouter)
app.listen(port)