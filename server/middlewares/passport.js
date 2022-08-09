const { User } = require("../models/user");
require("dotenv").config();

const { Strategy:JwtSrategy, ExtractJwt } = require("passport-jwt")

const jwtOptions = {
    secretOrKey: process.env.DB_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => { // done is a cb function
    try{
        const user = await User.findById(payload.sub) // this sub was created when the token was created in a User method

        if (!user){
            return done(null, false); // 1st arg is what returns from payload, 2nd arg is if is good = true or false
        }

        done(null, user)

    } catch(err){
        done(err, false)
    }

}

const jwtSrategy = new JwtSrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtSrategy
}