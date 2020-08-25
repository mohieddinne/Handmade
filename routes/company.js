const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { validName, validEmail} = require('./validInfo');
const { validationResult } = require('express-validator')
const Profile = require('../models/Company');
const Product = require ('../models/Product');


//@route     GET /current/company
//@desc      Get Current Company Profile
//@access    Private
router.get('/current/company', auth, async(req, res)=>{
     const profile= await Profile.findOne({ user: req.user.id});
     try {
         if(!profile){
             return res.status(404).json({msg: 'You must Build A Company To Get Profile'});
         }
         res.status(200).json(profile)
     } catch (err) {
         console.log(err.message);
         res.status(500).send('Interna Server Error');
     }
});

//@route    GET /company/:id
//@desc     Get Company By ID
//@access   Private

router.get('/company/:id', async(req, res)=>{
    const user =  req.params.id
    console.log(user)
    const profile = await Profile.findOne({ user  })
    try {
        if(!profile){
            return res.status(404).json({msg: 'There Is No Profile For this Comany'});
        }
        res.status(200).json(profile)
    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error')
        
    }
});
//@route    GET /all
//@desc     get all company
//@access   Public
router.get('/all', async(req, res)=>{
    const profiles = await Profile.find()
    try {
        if(!profiles){
            return res.status(404).json({msg: 'No Profile Found'});

        }
        res.status(200).json(profiles)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error')
        
    }
})
   

//@route    POST  /add/company   !
//@desc     Create New Company Profile
//@access   Private
router.post('/add/company', auth, async(req, res)=> {
    const imageUrl = req.file.path.replace("\\", "/");
    const profileFields = {}; 
    profileFields.product = req.user.id;
    profileFields.user = req.user.id;
    profileFields.name = req.body.name;
    profileFields.imageUrl = imageUrl;
    profileFields.location = req.body.location;
    profileFields.website = req.body.website;
    profileFields.phone = req.body.phone;
    profileFields.description = req.description;
    profileFields.social = {}
if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
//Social Media 

const profile = await Profile.findOne({user: req.user.id});
try {
    if(profile){
        return res.status(404).json({msg: 'Profile Already Exists'})
    }
    new Profile(profileFields).save().then(p => res.json(p))      
} catch (err) {
    console.log(err.msg);
    res.status(500).send('Internal Server Error ')
}
});

//@route    POST(patch) /product/:id
//@desc     Update Product By ID
//@access   Private
router.post('/:id', auth, async(req, res)=>{
    console.log(req.file)
    const imageUrl = req.file.path.replace("\\", "/");
    const profileFields = {}; 
    profileFields.product = req.user.id;
    profileFields.user = req.user.id;
    profileFields.name = req.body.name;
    profileFields.imageUrl = imageUrl;
    profileFields.location = req.body.location;
    profileFields.website = req.body.website;
    profileFields.phone = req.body.phone;
    profileFields.description = req.description;
    profileFields.social = {}
if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    
    const company = await Company.findOne({user: req.user.id});
    
    try {
        if(!company){
            return res.status(404).json({msg : 'You Are Not Authorized To Update This Product'});
        }
        Company.findByIdAndUpdate(
            req.params.id,
            {$set: profileFields},
            {new: true}
        ).then(p => res.status(200).json(p))
        
    } catch (err) {
        console.log(err.message);
        res.send('Internal Server Error !!')
    }
})

//@route    DELETE /product/:id
//@desc     Delete Product
//@access    Private
router.delete('/:id', auth, async(req, res)=>{
    // check authorization 
    const company = await Company.findOne({user: req.user.id});
    try {
      
        if( !company || company.user === req.user.id){
            return res.status(404).json({msg : 'You Are Not Authorized To Delete This Company'});
        }
          //delete product
          await Product.deleteMany({ user: req.user.id });
          await Company
        .findByIdAndRemove(req.params.id)
         res.status(200).json({msg: 'Company Removed'})
        
    } catch (err) {
        console.log(err.message);
        res.send('Internal Server Error !!')
    }
});

//@route    POST /like/:id
//@desc     Like Company Profile
//@access   Private
const io = require('../socket'); 

router.post('/like/:id',auth, async(req, res)=>{
    
    const profile = await Profile.findById(req.params.id);
    try {
        if(profile.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return  res.status(400).json({msg: 'Already Like This Company !!!'})
          }
          // add userID to likes array
          profile.likes.unshift({user: req.user.id, avatar: req.user.avatar});
          profile
          .save()
          .catch(err => res.status(400).json({msh: 'Echeck Like Company'}))    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
    
});

//@route   POST  /unlike/:id
//@desc    unlike Company Profile
//@access  Private
router.post('/unlike/:id', auth, async(req, res)=>{
    const profile = await Profile.findById(req.params.id);
    try {
        if(profile.likes.filter(like=>like.user.toString()===req.user.id).length===0){
          return res.status(400).json({ msg: 'You are sure :('})
        }
        //Get Remove Index
        const index = await profile.likes.map(item => item.user.toString()).indexOf(req.user.id)
        // Splice Out Of Array
       await profile.likes.splice(index, 1);
        //save 
        profile.save().then(profile => res.status(200).json(profile.likes)).catch(err => res.status(400).json(err))
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});


//@route   POST  /comment/:IDprofile
//@desc    Commenter une Company
//@access  Private
   
router.post('/comment/:id', auth, async(req, res)=>{
    console.log(req.body)
    profile = await Profile.findById(req.params.id);
    const newComment = {
      text: req.body.comment,
      user: req.user.id, 
      avatar: req.body.avatar
  } 
   
    try {
        if(!profile){
        return res.status(404).json({msg:'There is No Profile  for this ID'})
        }
        profile.comments.unshift(newComment);
        profile
        .save()
        .then(profile => res.status(200).json(profile.comments))
        .catch(err => res.status(404).json({msg: 'Echeck Save Comment'}))
    } catch (err) {
         console.log(err.message);
         res.send('Internal Server Error');
    }
});



module.exports = router