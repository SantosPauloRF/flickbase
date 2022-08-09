const express = require("express");
const app = express();
require ("dotenv").config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const { handleError, convertToApiError } = require("./middlewares/apiError")

const routes = require("./routes");

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoURI)


{/* GLOBAL MIDDLEWARES */}

    //PARSING
    app.use(bodyParser.json());

    //SANITIZE
    app.use(xss()); // to prevent xss atacks
    app.use(mongoSanitize()); // clean info to mongo

{/* ROUTES */}

app.use("/api", routes);


{/* ERROR HANDLING MIDDLEWARE */}

app.use(convertToApiError)
app.use((err, req, res, next) => {
    handleError(err, res)
})


{/* STARTING SERVER */}
const port = process.env.PORT || 3001;

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})