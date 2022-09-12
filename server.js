
const express = require("express")
const romanRouter = express()
require('dotenv').config();
const methodOverride = require("method-override")
romanRouter.use(methodOverride("_method"))
const port = process.env.PORT;

const mongoose = require('mongoose');
const romanRouter = require("./controllers/roman.js");
mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection
db.on("connected", () => console.log("connected to MongoDB"));
db.on("error", (err) => console.log("MongoDB error: " + err.message))

romanRouter.use((req, res, next) => {
    console.log("I run for all routes")
    next()
})
romanRouter.use(express.urlencoded({ extended: true }))
romanRouter.use(express.static('public'))







  
    roman.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedBook) => {
        res.redirect(`/Homepage/${req.params.id}`)
      }
    )

