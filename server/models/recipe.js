var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },

  // _creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // }
});

module.exports = Recipe;
