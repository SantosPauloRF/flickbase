
{/* MODELS */ }
const { User } = require("../models/user")

{/* SERVICES */ }
const userService = require("./user.service")


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

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token
}

const signInWithEmailAndPassword = async (email, password) => {
    try {
        const user = await userService.findUserByEmail(email);
        if (!user){
            throw new Error ("Sorry, bad email")
        }
        if (! (await user.comparePassword(password))){
            throw new Error ("Sorry, bad password")
        }
        return user
    
    } catch(err) {
        throw err
    }
}
 
module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailAndPassword
}