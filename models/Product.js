const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'companies' 
    },
    name: {
        type:String
    },
    size: {
        type:String,
        
    },
    category: {
        type: String
    },
    description: {
     type: String,
     
    },
    imageUrl:{
        type: String,
        required : true
    },
    quantity: {
        type: String,

    },
    price: {
        type: String,
        required: true
    },
    comments: [
        {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users' 
        },
        text: {
            type: String,
            required: true
        },
     
        date: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users' 
            },
        }
    ], 
    

});
module.exports = mongoose.model('product', ProductSchema)