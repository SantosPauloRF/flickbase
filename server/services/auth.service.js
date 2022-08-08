
{/* MODELS */ }
const { User } = require("../models/user")


const createUser = async(email, password) =>{
    try{
        //check if the email doesnt exists
        if( await User.emailTaken(email)){
            throw new Error ("Sorry email taken")
        }
        // add usert to db with hashed password
        const user = new User({
            email, 
            password
        })
        await user.save();
        return user;

    } catch(err) {
        throw err;
    }
}
 
module.exports = {
    createUser
}