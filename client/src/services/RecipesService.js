import Api from '@/services/Api'

export default {
  fetchRecipes () {
    return Api().get('recipes')
  },

  addRecipe (params) {
    return Api().post('recipes', params)
  },

  updateRecipe (params) {
    return Api().put('recipes/' + params.id)
  },

  getRecipe (params) {
    return Api().get('/recipes/edit/' + params.id)
  },

  deleteRecipe (params) {
    return Api().delete('recipes/' + params.id)
  }
}
