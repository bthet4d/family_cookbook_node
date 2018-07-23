const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipes');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
})

// STARTING MONGO DB
// cd ~/mongo
// sudo ./bin/mongod

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var Recipe = require('../models/recipe');

app.get('/recipes', (req, res) => {
  var allRecipes = Recipe.find({}, 'title', function(err, recipes) {
    if(err){
      console.error(err);
    }

    res.send({
      recipes: recipes
    })
  }).sort({_id: -1})
})

app.post('/recipes', (req, res) => {
  var title = req.body.title;
  var new_recipe = new Recipe({
    title: title
  })

  new_recipe.save(function (err){
    if(err){
      consol.log(err);
    }
    res.send({
      success: true
    })
  })
})

app.put('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id, 'title', function (err, recipe) {
    if(err){
      console.error(err);
    }

    recipe.title = req.body.title
    recipe.save(function (err) {
      if(err){
        console.error(err);
      }
      res.send({
        success: true
      })
    })
  })
})

app.get('/recipes/edit/:id', (req, res) => {

  Recipe.findById({
    _id: req.params.id
  }, function (err, recipe) {
    if(err){
      res.send(err)
    }

    res.send({recipe})
  })
})

app.delete('/recipes/:id', (req, res) => {
  
  Recipe.remove({
    _id: req.params.id
  }, function(err, recipe){
    if (err){
      res.send(err)
    }
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8081)
