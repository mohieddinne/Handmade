const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Company  = require('../models/Company')
const Product  = require('../models/Product')
//@route    POST  /add
//@desc     Create New Product
//@access   private
router.post('/add', auth, async(req, res) =>{

    const imageUrl = req.file.path.replace("\\", "/");
    const productFields = {}; 
    const user = req.user.id
    const { price, quantity, category, description, name, size } = req.body;
    const companyId = req.body.company
    productFields.price = price;
     productFields.company = companyId;
    productFields.quantity = quantity;  productFields.category = category;
    productFields.imageUrl = imageUrl;
    productFields.description = description;
    productFields.name = name;
    productFields.size = size;
    productFields.user = user;
    const company = await Company.findOne({user: req.user.id});
    const newProduct = new Product(productFields);
    try {
        if(!company){
        return    res.status(404).json({ msg: 'YOU Must Build Company To Add Product'});
        }
        const product = await newProduct.save()
        res.status(200).json(product)
    } catch (err) {
        console.log(err.message);
        res.send('Internal Server Error');
    }
});

//@route    GET /all
//@desc     Get All Products
//@access   Public

router.get('/all', async(req, res) => {
    const products = await Product.find();
    try {
        if(!products){
        return    res.status(404).json({msg: 'There is No Product'});
        }
        res.status(200).json(products)
    } catch (err) {
        console.log(err.message);
        res.send('Internal Server Error')
    }
});

//@route    GET /all/:userId
//@desc     Get All Products By Id User
//@access   Public

router.get('/all/:userId', async(req, res) => {
  
    const products = await Product.find({ user: req.params.userId});
    const profile = await Company.find({user: req.params.userId})
    try {
        if(!profile){
            return    res.status(404).json({msg: 'There Is No Company For This ID'});
            }
        if(!products){
        return    res.status(404).json({msg: 'There is No Product for this company'});
        }
        res.status(200).json({products, profile})
    
    } catch (err) {
        console.log(err.message);
        res.send('Internal Server Error')
    }
});


//@route    GET /product/:id
//@desc     Get Product By ID
//@access   Public
router.get('/product/:id', async(req, res)=>{
    const product = await Product.findById(req.params.id);
    try {
        if(!product){
           return res.status(404).json({msg: 'There Is No Product For This ID'});
        }
        res.status(200).json(product)
    } catch (err) {
        
    }
});

//@route    POST(patch) /product/:id
//@desc     Update Product By ID
//@access   Private
router.put('/product/:id', auth, async(req, res)=>{
    const { name, price, quantity, category } = req.body;
    imageUrl = req.file.path;
 
    const product = await Product.findOne({user: req.user.id});
    const company = await Company.findOne({user: req.user.id});
    const newProduct = {}
      newProduct.name= name,
      newProduct.price= price,
      newProduct.quantity=quantity,
      newProduct.imageUrl=imageUrl,
      newProduct.category=category
    try {
      
        if(!product || !company || company.user === product.user){
            return res.status(404).json({msg : 'You Are Not Authorized To Update This Product'});
        }
        Product.findByIdAndUpdate(
            req.params.id,
            {$set: newProduct},
            {new: true}
        ).then(Updatedproduct => res.status(200).json(Updatedproduct))
        
    } catch (err) {
        console.log(err.message);
        res.send('Internal Server Error !!')
    }
})

//@route    DELETE /product/:id
//@desc     Delete Product
//@access    Private
router.delete('/product/:id', auth, async(req, res)=>{
    // check authorization 
    const company = await Company.findOne({user: req.user.id});
    const product = await Product.findOne({user: req.user.id});
    //delete product
    try {
      
        if(!product || !company || company.user === product.user){
            return res.status(404).json({msg : 'You Are Not Authorized To Delete This Product'});
        }
        await Product
        .findByIdAndRemove(req.params.id)
         res.status(200).json({msg: 'Product Removed'})
        
    } catch (err) {
        console.log(err.message);
        res.send('Internal Server Error !!')
    }
});

//@route    POST /product/comment/:id
//@desc     Comment Product
//@access   Private
router.post('/product/comment/:id', auth, async(req, res)=>{
    
    const product = await Product.findById(req.params.id);
    const newCommentaire = {
        text: req.body.comment,
        user: req.user.id
    }
    
    try {
        if(!product){
            return res.status(404).json({msg: 'There Is No Product For This ID'})
        }
        product.comments.unshift(newCommentaire);
        product
        .save()
        .then(product => res.status(200).json(product.comments))
        .catch(err => res.status(404).json({msg: 'Echeck Save Comment'}))
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error')
    }
});
//@route    POST product/like/:id
//@desc     Like Product
//@access   Private
router.post('/product/like/:id',auth, async(req, res)=>{
    console.log(req.user.id)
    const product = await Product.findById(req.params.id);
    try {
        if(product.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return  res.status(400).json({msg: 'Already Like This Product !!!'})
          }
          // add userID to likes array
          product.likes.unshift({user: req.user.id});
          product
          .save()
          .then(product => res.status(200).json(product.likes))
          .catch(err =>{ 
            console.log(err)  
            res.status(400).json({msg: 'Echeck Like Product'})})    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
    
});

//@route   POST  /unlike/:id
//@desc    unlike  product
//@access  Private
router.post('/product/unlike/:id', auth, async(req, res)=>{
    const product = await Product.findById(req.params.id);
    try {
        if(product.likes.filter(like=>like.user.toString()===req.user.id).length===0){
          return res.status(400).json({ msg: 'You are sure :('})
        }
        //Get Remove Index
        const index = await product.likes.map(item => item.user.toString()).indexOf(req.user.id)
        // Splice Out Of Array
       await product.likes.splice(index, 1);
        //save 
        product.save().then(product => res.status(200).json(product.likes)).catch(err => res.status(400).json(err))
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// How i can get all product 

module.exports = router