<template>
  <div class="recipes">
    <h1>Edit Recipe</h1>
    <div class="form">
      <div>
        <input type="text" name="title" placeholder="TITLE" v-model="title"  />
      </div>

      <div>
        <button class="app_recipe_btn" @click="updateRecipe">Update Recipe</button>
      </div>
    </div>
  </div>

</template>

<script>
import RecipesService from '@/services/RecipesService'
export default {
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await RecipesService.getRecipe({
        id: this.$route.params.id
      })
      this.title = response.data.recipe.title
    },
    async updateRecipe () {
      await RecipesService.updateRecipe({
        id: this.$route.params.id,
        title: this.title
      })
      this.$router.push({name: 'EditRecipe'})
    }
  }
}
</script>

<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_recipe_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
