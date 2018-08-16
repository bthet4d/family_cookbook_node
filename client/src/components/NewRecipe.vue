<template>
  <div class="recipe">
    <h1>Add Recipe</h1>

    <div class="recipe-data">
      <div class="recipe-item">
        <span>Title</span>
        <input type="text" name="title" v-model="title" />
      </div>

      <div class="recipe-item">
        <span>Chef:</span>
        <input type="text" name="chef" v-model="chef"  />
      </div>

      <div class="recipe-item">
        <span>Servings:</span>
        <input type="text" name="servings" v-model="servings"  />

      </div>
    </div>

    <div class="ingredients">
      <div class="ingredient_input">
        <p>
          Ingredients:
        </p>
        <div class="recipe-ingredient">
          <span>Name:</span>
          <input class="recipe-input" type="text" name="ingredient_name" placeholder="Ingredient Name"  v-model="ingredientName"/>
        </div>

        <div class="recipe-ingredient">
          <span>Quantity:</span>
          <input class="recipe-input" type="number" name="ingredient_quantity" placeholder="Quantity"  v-model="ingredientQuantity"/>
        </div>

        <div class="recipe-ingredient">
          <span>Measurement</span>
          <select class="recipe-input" name="measurement" v-model="ingredientMeasurement">
            <option>
              tsp
            </option>
            <option>
              Tbsp
            </option>
            <option>
              Cup
            </option>
            <option>
              ounce
            </option>
            <option>
              pound
            </option>
            <option>
              each
            </option>
          </select>
        </div>

        <button class="app_recipe_btn ingredient_btn" @click="addIngredient">Add Ingredient</button>
      </div>

      <div class="ingredient_list">
        <p>Ingredient List</p>
        <ul id="ingredients_list" v-for="ing in ingredients" v-bind:key="ing.name">
          <li>
            {{formatIngredient(ing)}}
          </li>

        </ul>
      </div>


    </div>

    <div>
      <button class="app_recipe_btn" @click="addRecipe">Add Recipe</button>
    </div>
  </div>

</template>

<script>
import RecipesService from '@/services/RecipesService'
export default {
  name: 'NewRecipe',
  data () {
    return {
      title: '',
      chef: '',
      ingredients: [],
      servings: null,
      ingredientName: '',
      ingredientQuantity: null,
      ingredientMeasurement: ''
    }
  },
  methods: {
    async addRecipe () {
      await RecipesService.addRecipe({
        title: this.title
      })

      this.$router.push({name: 'Recipes'})
    },
    addIngredient () {
      var ingredient = {
        name: this.ingredientName,
        quantity: this.ingredientQuantity,
        measurement: this.ingredientMeasurement
      }

      this.ingredients.push(ingredient)
      this.ingredientName = ''
      this.ingredientQuantity = null
      this.ingredientMeasurement = ''
    },
    formatIngredient (ingredient) {
      if (ingredient.quantity && ingredient.measurement) {
        return ingredient.quantity + ' ' + ingredient.measurement + ' ' + ingredient.name
      } else if (ingredient.quantity) {
        return ingredient.quantity + ' ' + ingredient.name
      } else if (ingredient.measurement) {
        return ingredient.measurement + ' ' + ingredient.name
      } else {
        return ingredient.name
      }
    }
  },
  computed: {

  }
}
</script>

<style type="text/css">

body, html {
  height: 100%;
  overflow: auto;
}

.recipe{
  display: grid;
  grid-template-rows: 20% 20% 60%;
  grid-template-areas: "header" "data" "ingredients";
  row-gap: 30px;
  margin: 1em;
}

.recipe h1{
  grid-area: "header";
}
.recipe-data{
  grid-area: "data";
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-gap: 5px;
}

.recipe-item {
  display: grid;
  grid-template-columns: 100px 4fr;
  grid-template-areas: "label input";

}

.recipe-item span {
  grid-area: "label";
  display: grid;

}

.recipe-item input{
  grid-area: "input";
  width: 50%;
}

.ingredients{
  grid-area: "ingredients";
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: auto 50px;
  grid-template-areas:
    "ingredient_input ingredient_list"
    "add_ingredient";
  grid-gap: 10px;
  column-gap: 2em;
  min-height: 500px;
}

.ingredient_input{
  grid-area: "ingredient_input";
  display: grid;
  grid-template-rows: repeat(4 10%) auto;
  align-content: start;
  grid-gap: 2em;

}

.ingredient_input p {
  font-weight: bold;
}

.recipe-ingredient{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "label input"
    "label input"
    "label input";
}

.recipe-ingredient span{
  display: grid;
  grid-area: "label";
  justify-items: start;
}

.recipe-ingredient .recipe-input{
  grid-area: "input";
}

.ingredient_list{
  grid-area: "ingredient_list";
  border: 1px solid black;
}
.ingredients button{
  grid-area: "add_ingredient";
  grid-column: 1 / 2;
}
.app_recipe_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

@media (max-width: 600px) {
  .ingredients{
    grid-area: "ingredients";
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 50px 1fr;
    grid-template-areas:
    "ingredient_input"
    "add_ingredient"
    "ingredient_list";
    grid-gap: 10px;
  }

  .ingredient_input{
    grid-area: "ingredient_input";
    display: grid;
    grid-template-rows: repeat(4 auto);
    order: 1;

  }
  .ingredient_list{
    grid-area: "ingredient_list";
    border: 1px solid black;
    min-height: 500px;
    order: 3;
  }

  .ingredients button{
    grid-area: "add_ingredient";
    grid-column: 1 / 2;
    order: 2;
  }
}
</style>
