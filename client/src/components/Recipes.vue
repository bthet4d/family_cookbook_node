<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <div v-if="recipes.length > 0" class="table-wrap">
      <div>
        <router-link :to="{ name: 'NewRecipe'}" class="add_recipe_link">Add Recipe</router-link>
      </div>

      <table>
        <tr>
          <td>Title</td>
          <td width="100" align="center">
            Action
          </td>
        </tr>

        <tr v-for="recipe in recipes" v-bind:key="recipe._id">
          <td>
            {{recipe.title}}
          </td>
          <td align="center">
            <router-link :to="{ name: 'EditRecipe', params: {id: recipe._id} }">Edit</router-link>
            <a href="#" @click="deleteRecipe(recipe._id)">Delete</a>

          </td>

        </tr>
      </table>
    </div>
    <div v-else>
      There are no recipes..Lets add one now <br /><br />
      <router-link :to="{ name: 'NewRecipe'}" class="add_recipe_link">Add Recipe</router-link>
    </div>
  </div>
</template>

<script>
import RecipesService from '@/services/RecipesService'
export default {
  name: 'recipes',
  data () {
    return {
      recipes: []
    }
  },
  mounted () {
    this.getRecipes()
  },
  methods: {
    async getRecipes () {
      const response = await RecipesService.fetchRecipes()
      this.recipes = response.data.recipes
    },
    async deleteRecipe (id) {
      await RecipesService.deleteRecipe(id)
      this.$router.push({name: 'Recipes'})
    }
  }
}
</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table {
  padding-top: 2em;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
.add_recipe_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
