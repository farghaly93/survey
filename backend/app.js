
const express= require('express');
const path = require('path');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const app= express();
const adminRouter = require('./routers/adminRouter');
const clientRouter = require('./routers/clientRouter');
const session = require('express-session');
const expressValidator = require('express-validator');
const expressSanitizer = require('express-sanitizer');


mongoose.connect('mongodb+srv://farghaly:farghaly_93@cluster0-i8la2.mongodb.net/farghaly-survey')
.then(() => {
  console.log('Connected successfully..');
}
).catch(()=>{
  console.log('Connection failed ... !');
});
app.use(session( {
  secret: 'mohammad farghaly ali saadawy',
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join(__dirname,'images')));
//app.use('/', express.static(path.join(__dirname, 'angular')));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
//app.use(expressValidator);
app.use(expressSanitizer());
app.use(adminRouter);
app.use(clientRouter);
//app.use((req, res, next) => {
 // res.sendFile(path.join(__dirname, 'angular', 'index.html'));
//});
module.exports =app;

