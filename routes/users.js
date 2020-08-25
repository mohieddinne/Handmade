const express = require('express');
const { validName, validEmail, validPassword } = require('./validInfo')
const { validationResult } = require('express-validator')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config= require('config')
const auth = require('../middleware/auth')

//@route      POST /add
//@desc       Create new user
//@access     Public

router.post('/add', async(req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
     const { email, password ,role } = req.body 
     const avatar =req.file.path.replace("\\", "/");
         try {
             let user = await User.findOne({ email })
             if(user){
                 return res.status(400).json({ msg: 'User Already Exists'});
             }
              user = new User({
              avatar, email, password , role
             });
             const salt = await bcrypt.genSalt(10) 
             user.password = await bcrypt.hash(password, salt)
             await user.save()
             const payload = {
                 user: {
                     id: user.id,
                     email: user.email,
                     avatar: user.avatar,
                     role : user.role
                 }
             };
           
              jwt.sign(
                  payload,
                config.get('jwtSecret'),
                { expiresIn: 360000},
                (err, token) =>{
                    if(err)throw err
                    res.json({ token })
                 }
                );
         } catch (err) {
             console.log(err.message);
             re(500).send('Server Error')
         }
});

//@route      POST /login
//@desc       Login user
//@access     Public
router.post('/login',[validEmail, validPassword], async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array() })
    }
    const { email, password } = req.body
    try {
       let user =await  User.findOne({ email });
        if(!user){
            return res.status(400).json({msg: 'Invalid Email'});
        } 
        const isMatch  = bcrypt.compare(password, user.password)
           if(!isMatch){
            return  res.status(400).json({ msg : 'Invalid password'})
           }
         const payload = {
            user: {
                id: user.id,
                email: user.email,
                avatar: user.avatar,
                role: user.role            }
         }
         jwt.sign(
             payload,
             config.get('jwtSecret'),
             {expiresIn: 360000},
             (err, token) => {
                 if(err) throw err;
                 res.json({ token })
             }
             )
   } catch (err) {
        console.log(error.message)
        res.status(500).send('Internal Server Error ')
    }
});

//@route     GET /current
//@desc      Return Current User
//@acces     Private

router.get('/current', auth, async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
             res.status(200).json(user);
             
         
    } catch (error) {
        res.status(500).send('Server Error !!!')
    }   
    });



module.exports = router