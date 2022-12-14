const express = require("express");
const app = express();
require ("dotenv").config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const passport = require("passport")
const { jwtSrategy } = require("./middlewares/passport")
const { handleError, convertToApiError } = require("./middlewares/apiError")

const routes = require("./routes");

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoURI)


{/* MIDDLEWARES - PARSING */}

app.use(bodyParser.json());

{/* MIDDLEWARES - SANITIZE */}

app.use(xss()); // to prevent xss atacks
app.use(mongoSanitize()); // clean info to mongo

{/* MIDDLEWARES - PASSPORTS /TOKEN VERIFICATION */}

app.use(passport.initialize())
passport.use("jwt", jwtSrategy)

{/* ROUTES */}

app.use("/api", routes);

{/* ERROR HANDLING MIDDLEWARE */}

app.use(convertToApiError)
app.use((err, req, res, next) => {
    handleError(err, res)
})

app.use(express.static("client/build"))
if(process.env.NODE_ENV === "production"){

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
    })
}

{/* STARTING SERVER */}
const port = process.env.PORT || 3001;

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})