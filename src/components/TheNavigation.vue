<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/calculator" v-if="isAuthenticated">Calculator</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/records" v-if="isAuthenticated">User Records</router-link>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
import store from '../store'
import {computed} from 'vue'

export default {
  data() {
    return {
      isAuthenticated: computed(() => store.getters.getIsAuthenticated())
    }
  },
  name: "TheNavigation"
}
</script>

<style scoped>

</style>