const mongoose = require('mongoose');
const Schema = require = mongoose.Schema;

//Create Profile Schema
const CompanySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
    name: {
        type: String,
         required: true
    },
    location: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    website:{
        type: String
    },
    social: {
         youtube:{
                                type: String
                            },
         facebook: {
                                type: String
                            },
         linkedin:{
                                type: String
                            },
         twitter:{
                                type: String
                            },
         instagram: {
                                type:String
                            }
                        },
    description: {
            type: String,
    },
                        
    comments: [{
                            user: {
                            type: Schema.Types.ObjectId,
                            ref: 'user'
                            },
                            text: {
                                type: String,
                                required: true
                            },
                            avatar: {
                                type: String
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
                                avatar: {
                                    type: String
                                }
                            }
                        ], 
  
    imageUrl: {
                type: String
     },

        date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Company = mongoose.model('company', CompanySchema)