<template>
  <div class="header">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://e7.pngegg.com/pngimages/609/174/png-clipart-shadowrun-dragonfall-shadowrun-returns-logo-emblem-others-emblem-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          <router-link to="/">Home</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          <router-link to="/Page2">About</router-link>
        </b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
          <a class="button is-light" v-if="!loggedin" v-on:click="isComponentModalActive = true">
            Log in
          </a>
        <a class="button is-light" v-if="loggedin" v-on:click="logOut()">
          Log out
        </a>

          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
     <section>
    <b-modal
          v-model="isComponentModalActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="false"
          aria-role="dialog"
          aria-modal>
        <form action="">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Login</p>
              <button
                type="button"
                class="delete"
                @click="isComponentModalActive=false"/>
            </header>
            <section class="modal-card-body">
              <b-field label="Username">
                <b-input
                    :value="username"
                    placeholder="Your username"
                    v-model="username"
                    required>
                </b-input>
              </b-field>
              <b-field label="Password">
                <b-input
                    type="password"
                    :value="password"
                    password-reveal
                    placeholder="Your password"
                    v-model="password"
                    required>
                </b-input>
              </b-field>
              <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="isComponentModalActive=false">Close</button>
                <button class="button is-primary" v-on:click="logIn(),isComponentModalActive=false">Login</button>
            </footer>
          </div>
        </form>
      </b-modal>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        isComponentModalActive: false,
        // isRegisterModalActive: false,
        username: "",
        password: "",
        loggedin: "",
        token: "",
        // listname: "",
        // listoflists: [],
      }
    },
    methods: {
      logIn: function() {
        // const URL = this.$prodURL ? this.$prodURL : this.$URL
        const user = {username: this.username, password: this.password}
        fetch(`${this.$URL}auth/users/login/`, {
          method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        })
        // following code block courtesy of Narissa
        .then((response) => {
          if (response.status != 200) {
            response.status
          } else {
            return response.json()
          }
        })
        .then(data => {
          console.log('data', data)
          if(data){
            this.$emit('loggedin', data)
            this.token = data.token,
            this.username = '',
            this.password = '',
            this.loggedin = true,
            this.isComponentModalActive = false,
            this.firstname = '',
            this.lastname='',
            this.email = ''
            // this.populateLists()
          } else {
            alert('Incorrect Login')
          }
        })
      },
      logOut: function() {
        this.loggedin = false,
        this.token = '',
        this.username = '',
        this.password = '',
        this.firstname = '',
        this.listoflists = []
      },
      register: function() {
        const user = {
          username: this.username,
          password: this.password,
          first_name: this.firstname,
          last_name: this.username,
          email: this.email
        }
        fetch(`${this.$URL}auth/users/register/`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
              "Content-Type": "application/json",
          }
        })
        // following code block courtesy of Narissa
        .then((response) => {
          if (response.status != 201) {
            response.status
          } else {
            return response.json()
          }
        })
        .then(data => {
          console.log('data', data)
          if(data){
            this.$emit('loggedin', data) // do I even need this?
            this.token = data.token,
            this.loggedin = true,
            this.isRegisterModalActive = false
          } else {
            alert('Incorrect Registration Info')
          }
        })
      },
      populateLists: function(){
        fetch(`${this.$URL}auth/api/lists/`, {
          method: "GET",
          headers: {
            "Authorization": `JWT ${this.token}`
          }
        })
        .then((response) => {
          console.log(response)
          if (response.status != 200) {
            response.status
            console.log(response.status)
          } else {
            return response.json()
          }
        })
        .then(data => {
          if (data){
            console.log("data: ", data)
            this.listoflists = data
          } else {
            console.log("No lists found for this user. Create a new list?")
          }
        })
      }
    },
  }
</script>
<style>
.header {
    width: 90%;
    margin: 10px auto
}

</style>
