<template>

  <div class="container">
    <h4>{{ message }}</h4>
    <div class="form-horizontal">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" class="form-control" id="username">
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input v-model="password" class="form-control" id="pwd">
      </div>
      <div class="form-group">
        <button type="button" @click="login" class="btn btn-primary">Login</button>
        <button type="button" @click="logout" class="btn btn-info">Logout</button>
      </div>
    </div>
    <hr>
    <h4>Users available in the App</h4>
    <p>
      <br/>
      username: 'a@foo.com', password: '1234567890', status: 'active', balance: 999999999},
      <br/>
      username: 'user-no-balance@foo.com', password: '1234567890', status: 'active', balance: 0
      <br/>
      username: 'wrong@foo.com', password: '1234567890', status: 'inactive', balance: 999999999
      <br/>
    </p>
  </div>
</template>

<script>
import {computed} from 'vue'
import store from '../store'

export default {
  data() {
    return {
      count: computed(() => store.getters.getCount()),
      isAuthenticated: computed(() => store.getters.getIsAuthenticated()),
      username: 'a@foo.com',
      password: '1234567890',
      message: 'Enter your credentials'
    }
  },
  methods: {
    logout() {
      this.username = undefined
      this.password = undefined
      store.mutations.clearLogin()
    },
    async login() {
      try {
        const loginResponse = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: this.username, password: this.password})
        });
        if (loginResponse.status === 200) {
          const responseAsJson = JSON.parse(JSON.stringify(await loginResponse.json()))
          const token = responseAsJson.token
          store.mutations.saveLogin(this.username, token)
        } else {
          this.username = undefined
          this.password = undefined
          store.mutations.clearLogin()
        }
      } catch (e) {
        this.username = undefined
        this.password = undefined
        store.mutations.clearLogin()
      }
    }
  }
}
</script>
