const express = require('express');
const path = require('path');

const users = require('./routes/users')
const app = express();
const connectDB = require('./config/db')


app.use(express.json({extended: false })); //application/json
app.use(require('./middleware/imgconf'));
app.use('/images', express.static(path.join(__dirname, 'images'))); // make folder public
app.use('/profile/images', express.static(path.join(__dirname, 'images'))); // make folder public
app.use('/product/images', express.static(path.join(__dirname, 'images'))); // make folder public
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
    next()
})


  app.use('/users', users);
app.use('/profile', require('./routes/company'))
app.use('/products', require('./routes/products'))
const PORT = process.env.PORT || 5000
//DATA BASE connexion 
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
connectDB()
app.listen(5000,()=> {console.log(`Server Run At port ${PORT}`)})



