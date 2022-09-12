
const express = require('express');
const romanRouter = express.Router();
const roman = require("./models/romans.js");


module.exports = romanRouter;

romanRouter.get("/Homepage", (req, res) => {
    roman.find({},(error,allRoman) => {
        res.render("index.ejs", {
            roman: allRoman
        })
    })
    });
romanRouter.get("/Homepage/new", (req, res) => {
    res.render("new.ejs")
})
romanRouter.get("/Homepage/:id", (req,res) => {
    roman.findById(req.params.id, (err, foundRoman) => {
        res.render('show.ejs', {
            roman: foundRoman,
        })
    })
});
romanRouter.get("/Homepage/:id/edit", (req, res) => {
    roman.findById(req.params.id, (error, foundRoman) => {
      res.render("edit.ejs", {
        roman: foundRoman,
      })
    })
  })
  romanRouter.delete("/homepage/:id", (req, res) => {
    roman.findByIdAndDelete(req.params.id, (err, data) => {
      res.redirect("/homepage")
    })
  })
 
  romanRouter.put("/Homepage/:id", (req, res) => {
    if (req.body.completed === "on") {
      req.body.completed = true
    } else {
      req.body.completed = false
    }
    romanRouter.post("/", (req,res) => {
        if(req.body.conquering === "on"){
            req.body.conqueriing = true
        } else { req.body.conquering = false}
        roman.create(req.body, (error, createdRoman) => {
            res.send(createdRoman);
        });
        res.redirect("Homepage")
    });})
    module.exports=romanRouter