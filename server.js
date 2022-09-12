
const express = require("express")
const app = express()
require('dotenv').config();
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
const port = process.env.PORT;

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection
db.on("connected", () => console.log("connected to MongoDB"));
db.on("error", (err) => console.log("MongoDB error: " + err.message))

app.use((req, res, next) => {
    console.log("I run for all routes")
    next()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


const roman = require("./models/romans.js");

})
app.get("/Homepage", (req, res) => {
    roman.find({},(error,allRoman) => {
        res.render("index.ejs", {
            roman: allRoman
        })
    })
    });
app.get("/Homepage/new", (req, res) => {
    res.render("new.ejs")
})
app.post("/roman", (req,res) => {
    if(req.body.conquering === "on"){
        req.body.conqueriing = true
    } else { req.body.conquering = false}
    roman.create(req.body, (error, createdRoman) => {
        res.send(createdRoman);
    });
    res.redirect("Homepage")
});
app.get("/Homepage/:id", (req,res) => {
    roman.findById(req.params.id, (err, foundRoman) => {
        res.render('show.ejs', {
            roman: foundRoman,
        })
    })
});
app.delete("/homepage/:id", (req, res) => {
    roman.findByIdAndDelete(req.params.id, (err, data) => {
      res.redirect("/homepage")
    })
  })
  app.get("/Homepage/:id/edit", (req, res) => {
    roman.findById(req.params.id, (error, foundRoman) => {
      res.render("edit.ejs", {
        roman: foundRoman,
      })
    })
  })
  app.put("/Homepage/:id", (req, res) => {
    if (req.body.completed === "on") {
      req.body.completed = true
    } else {
      req.body.completed = false
    }
  
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
  })

