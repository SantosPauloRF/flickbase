const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
require ("dotenv").config();

const userSchema = mongoose.Schema ({

    email:{
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid Email")
            }
        }
    },
    password:{
        type: String,
        required: true, 
        trim: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    firstname:{
        type: String,
        maxLength: 100,
        trim: true
    },
    lastname:{
        type: String,
        maxLength: 100,
        trim: true
    },
    age:{
        type: Number
    },
    date:{
        type: Date,
        default: Date.now
    },
    verified:{
        type: Boolean,
        default: false
    }

})

{/* MIDDLEWARES */}
userSchema.pre("save", async function(next){
    
    let user = this;

    if(user.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;

    }

    next()
})

{/* METHODS */}
userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email});
    return !!user //make the respons become boolean
}



{/* MODELS */}
const User = mongoose.model("User", userSchema );

{/* EXPORT */}
module.exports = { User }