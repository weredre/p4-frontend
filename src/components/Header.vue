<template>
  <div class="header">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://e7.pngegg.com/pngimages/609/174/png-clipart-shadowrun-dragonfall-shadowrun-returns-logo-emblem-others-emblem-logo.png"
          />
          <!-- <ul>
            <li v-for="character in characters" v-bind:key="character.id">{{character.name}}</li>
          </ul> -->
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
    <ul>
      <h1>Characters</h1>
      <li v-for="character in characters" v-bind:key="character.id">Name:{{character.name}} STR:{{character.STR}} AGL:{{character.AGL}} WILL:{{character.WILL}} LOG:{{character.LOG}} CHA:{{character.CHA}} EDG:{{character.EDG}} ID:{{character.id}} <button v-bind:id="character.id" v-on:click="() => {editSelect(character.id, character.name, character.STR, character.AGL, character.WILL, character.LOG, character.CHA, character.EDG)}">Edit</button><button v-on:click="deleteCharacter(character.id)">Delete</button></li>
      <h1>ShadowAmps</h1>
      <li v-for="shadowamp in shadowamps" v-bind:key="shadowamp.id">Name:{{shadowamp.name}} Description:{{shadowamp.description}}</li>
    </ul>
    <div class="form">
      <h1>New Character</h1>
      <input type=text v-model="nameInput"/>


      <input type=number STR=STR v-model="createSTRinput" placeholder="Strength"/>

      <input type=number AGL=AGL v-model="createAGLinput" placeholder="Agility"/>

      <input type=number WIL=WIL v-model="createWILinput" placeholder="Wisdom"/>

      <input type=number LOG=LOG v-model="createLOGinput" placeholder="Logic"/>

      <input type=number CHA=CHA v-model="createCHAinput" placeholder="Charisma"/>

      <input type=number EDG=EDG v-model="createEDGinput" placeholder="Edge"/>

      <button v-on:click="createCharacter()">Submit</button>
    </div>
    <div class="form">
      <h1>Edit Character</h1>
      <input type=text v-model="editnameInput"/>


      <input type=number STR=STR v-model="editSTRinput" placeholder="Strength"/>

      <input type=number AGL=AGL v-model="editAGLinput" placeholder="Agility"/>

      <input type=number WIL=WIL v-model="editWILinput" placeholder="Wisdom"/>

      <input type=number LOG=LOG v-model="editLOGinput" placeholder="Logic"/>

      <input type=number CHA=CHA v-model="editCHAinput" placeholder="Charisma"/>

      <input type=number EDG=EDG v-model="editEDGinput" placeholder="Edge"/>



      <!-- <select name="wand" id="editselect">
      </select> -->
      <button v-on:click="editCharacter()">Edit</button>
  </div>
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
        characters:[],
        shadowamps: [],
        nameInput: "",
        createSTRinput: null,
        createAGLinput: null,
        createWILinput: null,
        createLOGinput: null,
        createCHAinput: null,
        createEDGinput: null,
        characterID: null,
        editnameInput: "",
        editSTRinput: null,
        editAGLinput: null,
        editWILinput: null,
        editLOGinput: null,
        editCHAinput: null,
        editEDGinput: null,
        editCharacterID: null,
        // user:{
        //   username:"",
        //   password:""
        // }
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
            this.email = '',
            this.user= data,
            this.populateCharacters()
            this.populateShadowamps()
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
        this.firstname = ''
      },
      createCharacter: function() {
        const character = {
          name: this.nameInput,
          STR: this.createSTRinput,
          AGL: this.createAGLinput,
          WILL: this.createWILinput,
          LOG: this.createLOGinput,
          CHA: this.createCHAinput,
          EDG: this.createEDGinput,
          // ShadowAmp: ["http://127.0.0.1:8000/shadowamps/2/"],
          user: this.$URL +"users/"+"1"+"/"
        }
        fetch(`${this.$URL}characters/`, {
          method: "POST",
          body: JSON.stringify(character),
          headers: {
              "Authorization": `JWT ${this.token}`,
              "Content-Type": "application/json",
          }
        })
        .then(() => {
          this.populateCharacters()
        })
      },
      editSelect: function(id, name, STR, AGL, WILL, LOG, CHA, EDG) {
      this.editCharacterID = id;
      this.editnameInput = name;
      this.editSTRinput = STR;
      this.editAGLinput = AGL;
      this.editWILinput = WILL;
      this.editLOGinput = LOG;
      this.editCHAinput = CHA;
      this.editEDGinput = EDG;
    },
    editCharacter: function() {
      const id = this.editCharacterID;
      fetch(`${this.$URL}characters/${id}/`, {
        method: "PATCH",
        headers: {
          "Authorization": `JWT ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.editnameInput,
          STR: this.editSTRinput,
          AGL: this.editAGLinput,
          WILL: this.editWILinput,
          LOG: this.editLOGinput,
          CHA: this.editCHAinput,
          EDG: this.editEDGinput
        })
      }).then(() => {
        this.populateCharacters()
      });
    },
      deleteCharacter: function(id){
          // const token = this.$route.query.tokens
          //const = event.target.id
           fetch(`${this.$URL}characters/${id}/`, {
            method: 'delete',
            headers: {
                "Authorization": `JWT ${this.token}`,
              "Content-Type":"application/json"
            },
        })
          .then(() => {
            this.populateCharacters()
          })
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
      populateCharacters: function(){
        console.log(this.token)
        fetch(`${this.$URL}characters/`, {
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
            this.characters = data
            // this.$emit(characters)
          } else {
            console.log("No characters found for this user. Create a new character?")
          }
        })
      },
      populateShadowamps: function(){
        console.log(this.token)
        fetch(`${this.$URL}shadowamps/`, {
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
            this.shadowamps = data
            // this.$emit(characters)
          } else {
            console.log("No shadowamps found for this user. Create a new shadowamp?")
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
