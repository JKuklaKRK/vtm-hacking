<script setup lang="ts">
import { ref } from 'vue';
import Loader from './components/Loader.vue'
import LoginScreen from './components/LoginScreen.vue';
import Database from './components/Database.vue';
import type { User } from './types/types';

let users: User[] = [
  { id: 1, username: 'root', password: 'toor', maxAccess: 2, accessTo: [] },
  { id: 2, username: 'admin', password: 'hunter2', maxAccess: 10, accessTo: [] },
  { id: 3, username: 'neo', password: 'matrix', maxAccess: 10, accessTo: [] }
]

const loaderText = ref('SCHRECKNET');
const loaderDuration = ref(3)
const currentUser = ref()
const stage = ref(1)

const setStage = (val:number) => {
  stage.value = val
}


const setLogedUser = (user : User) => {
  loaderDuration.value = (2 + Math.floor(Math.random() * 3))
  loaderText.value = 'Loggin into SchreckNet'
  currentUser.value = user
  setStage(2)
}

const logout = () => {
  loaderDuration.value = (Math.floor(Math.random() * 3))
  loaderText.value = 'Logging out of SchreckNet'
  currentUser.value = {}
  setStage(4)
}

const addAccess = (payload: { catId: number | undefined; fileId: number }) => {
  let added = false
  for (let item of currentUser.value.accessTo) {
    if (item.catId == payload.catId && item.fileId == payload.fileId) {
      added = true
      break;
    }
  }
  if (added == false) {
    currentUser.value.accessTo.push({ catId: payload.catId, fileId: payload.fileId })
  }
}
</script>

<template>
  <LoginScreen v-if="stage == 1" :users="users" @success="setLogedUser"></LoginScreen>
  <Loader v-else-if="stage == 2" :duration="loaderDuration" :text="loaderText" @complete="setStage(3)"></Loader>
  <Database v-else-if="stage == 3" :user="currentUser" @logout="logout" @new-access="addAccess"></Database>
  <Loader v-else-if="stage == 4" :duration="loaderDuration" :text="loaderText" @complete="setStage(1)"></Loader>
</template>

<style scoped>
  #app {
    width: 100vw;
    height: 100vh;
  }
</style>
