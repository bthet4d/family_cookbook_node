import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Recipes from '@/components/Recipes'
import NewRecipe from '@/components/NewRecipe'
import EditRecipe from '@/components/EditRecipe'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/recipes/new',
      name: 'NewRecipe',
      component: NewRecipe
    },
    {
      path: '/recipes/edit/:id',
      name: 'EditRecipe',
      component: EditRecipe
    }

  ]
})
