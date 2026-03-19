<script setup lang="ts">
import { ref } from 'vue';
import Loader from './components/Loader.vue'
import LoginScreen from './components/LoginScreen.vue';
import Database from './components/Database.vue';
import type { User } from './types/types';

// ─── LOCALSTORAGE HELPERS ─────────────────────────────────────────
const USERS_KEY = 'schrecknet_access'
const EXPIRY_DAYS = 7

const saveAccess = (userId: number, accessTo: number[]) => {
  const raw = localStorage.getItem(USERS_KEY)
  const data = raw ? JSON.parse(raw) : {}
  data[userId] = {
    accessTo,
    expires: Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(data))
}

const loadAccess = (userId: number): number[] => {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) return []
  try {
    const data = JSON.parse(raw)
    const entry = data[userId]
    if (!entry) return []
    if (Date.now() > entry.expires) {
      // wygasło — usuń ten wpis
      delete data[userId]
      localStorage.setItem(USERS_KEY, JSON.stringify(data))
      return []
    }
    return entry.accessTo ?? []
  } catch {
    return []
  }
}
// ──────────────────────────────────────────────────────────────────

let users: User[] = [
  { id: 1, username: 'root', password: 'toor', maxAccess: 2, accessTo: [] },
  { id: 2, username: 'admin', password: 'hunter2', maxAccess: 10, accessTo: [] },
  { id: 3, username: 'neo', password: 'matrix', maxAccess: 10, accessTo: [] }
]

// Przy starcie: wczytaj accessTo każdego usera z localStorage
users.forEach(u => {
  u.accessTo = loadAccess(u.id)
})

const loaderText = ref('SCHRECKNET')
const loaderDuration = ref(3)
const currentUser = ref<User | null>(null)
const stage = ref(1)

const setStage = (val: number) => {
  stage.value = val
}

const setLogedUser = (user: User) => {
  loaderDuration.value = (2 + Math.floor(Math.random() * 3))
  loaderText.value = 'Loggin into SchreckNet'
  currentUser.value = user
  setStage(2)
}

const logout = () => {
  loaderDuration.value = (Math.floor(Math.random() * 3))
  loaderText.value = 'Logging out of SchreckNet'
  currentUser.value = null  // czyści sesję, ale accessTo zostaje w localStorage
  setStage(4)
}

const addAccess = (fileId: number) => {
  if (!currentUser.value) return
  currentUser.value.accessTo.push(fileId)
  saveAccess(currentUser.value.id, currentUser.value.accessTo)
}
</script>

<template>
  <LoginScreen v-if="stage == 1" :users="users" @success="setLogedUser"></LoginScreen>
  <Loader v-else-if="stage == 2" :duration="loaderDuration" :text="loaderText" @complete="setStage(3)"></Loader>
  <Database v-else-if="stage == 3" :user="currentUser!" @logout="logout" @new-access="addAccess"></Database>
  <Loader v-else-if="stage == 4" :duration="loaderDuration" :text="loaderText" @complete="setStage(1)"></Loader>
</template>

<style scoped>
  #app {
    width: 100vw;
    height: 100vh;
  }
</style>