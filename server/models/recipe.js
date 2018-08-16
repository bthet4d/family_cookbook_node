var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  chef: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
      },
      quantity: {
        type: Number,
      },
      measure: {
        type: String,
        enum: ['tsp', 'Tbsp', 'cup', 'ounce', 'pound', 'each']
      },
      format: {
          type: String
      }
    }
  ],

  servings: {
    type: Number,
    required: false,

  }

  // _creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // }
});

module.exports = Recipe;
