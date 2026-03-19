<template>
  <div class="screen">
    <!-- LEWA KOLUMNA -->
    <div class="left">
      <div class="header">{{ header }}</div>

      <!-- KATEGORIE -->
      <div v-if="view === 'categories'">
        <div
          v-for="(cat, i) in categories"
          :key="cat.catId"
          :class="['row', { active: i === index }]"
        >
          {{ cat.catName }} ({{ cat.files.length }})
        </div>

        <!-- LOGOUT -->
        <div
          class="row logout"
          :class="{ active: index === categories.length }"
        >
          LOGOUT
        </div>
      </div>

      <!-- PLIKI -->
      <div v-if="view === 'files'">
        <div
            v-for="(file, i) in currentCategory!.files"
            :key="file.fileId"
            :class="['row', { active: i === index }]">
            {{ props.user.accessTo.indexOf(file.fileId) > -1 ? file.filename : file.encryptedName }}
        </div>

        <!-- LOGOUT -->
        <div
          class="row logout"
          :class="{ active: index === currentCategory!.files.length }"
        >
          LOGOUT
        </div>
      </div>
    </div>

    <!-- PRAWA KOLUMNA -->
    <div class="right">
      <div v-if="view === 'content'" class="content">
        {{ currentContent }}
        <img v-if="img != ''" :src="`/vtm-hacking/img/${img}`"/>
        <span v-else>{{img}}</span>
      </div>

      <div v-if="error" class="error">
        ACCESS DENIED<br />
        <span v-if="accessDeniedStep > 0">Getting message... </span><br />
        <span v-if="accessDeniedStep > 3">from: {{ nickname }}@{{ IP }} </span><br />
        <span v-if="accessDeniedStep > 7">please wait...</span><br /><br />
        <span v-if="accessDeniedStep > 14">{{ insult }}</span><br /><br /><br />
        <span v-if="accessDeniedStep > 21">{{ warning }} {{ errorsCounter == 1 ?  'Logout for fckin sake!' : errorsCounter == 2 ? 'Which part of "logout!" you don\'t understand?' : errorsCounter == 3 ? 'Fuck it! I\'m kicking you out!' : ''}}</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { categories } from './../data/categories'
import type { Category } from './../data/categories'
import type { User } from '../types/types'

/* ===== USER CONTEXT ===== */
const props = defineProps<{ user: User }>()
const emit = defineEmits<{ (e: 'logout'): void,
    (e: 'newAccess', fileId: number ): void
 }>()


/* ===== STATE ===== */
type View = 'categories' | 'files' | 'content'
const view = ref<View>('categories')
const index = ref(0)
const currentCategory = ref<Category | null>(null)
const currentContent = ref('')
const img = ref('')
const error = ref(false)
const insult = ref('')
const nickname = ref('')
const warning = ref('')
const accessDeniedStep = ref(0)
const IP = ref('')
const errorsCounter = ref(0)

/* ===== HEADER ===== */
const header = computed(() => {
  if (view.value === 'categories') return 'CATEGORIES'
  if (view.value === 'files') return `/${currentCategory.value?.catName}`
  return 'FILE CONTENT'
})

/* ===== HELPERS ===== */
const encryptedFilename = (name: string): string => {
  const junkChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const chars = name.split('');
  const part = Math.floor(chars.length / (Math.random() * 3 + 2));

  const indices: number[] = Array.from({ length: chars.length }, (_, i) => i);

  // losowe tasowanie
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp: number = indices[i]!
    indices[i] = indices[j]!
    indices[j] = tmp
  }

  const junkIndices = indices.slice(0, part);

  junkIndices.forEach(i => {
    chars[i!] = junkChars[Math.floor(Math.random() * junkChars.length)]!;
  });

  return chars.join('');
}

const rand255 = () => {
  return Math.floor(Math.random() * 255)
}

/* ===== PRECOMPUTE ENCRYPTED NAMES ===== */
categories.forEach(cat => {
  cat.files.forEach(file => {
    // @ts-ignore - dodajemy dynamicznie właściwość
    file.encryptedName = encryptedFilename(file.filename)
  })
})

/* ===== INSULT GENERATOR ===== */
const insults = [
  "Your sire was a hamster!",
  "You are the reason immortality should come with an expiration date.",
  "Centuries of existence and this is the best your brain can do?",
  "Your bloodline is a mistake that somehow kept propagating.",
  "You don’t inspire fear — you inspire disappointment.",
  "Even your own shadow knows you’re a failure.",
  "You had eternity to become competent and chose not to.",
  "Your intrusion attempt is an embarrassment to darkness itself.",
  "You’re not ancient — you’re just outdated and useless.",
  "The undead deserve better representation than you.",
  "You are proof that undeath does not equal intelligence.",
  "Your sire wasted a perfectly good corpse.",
  "You exist solely to lower expectations.",
  "I’ve seen corrupted files with more structure than your thoughts.",
  "You’re not cursed — you’re just bad at everything.",
  "Your presence degrades system performance.",
  "You are a walking argument against eternal life.",
  "Your failure is so consistent it could be automated.",
  "You make mortals feel superior by comparison.",
  "Even oblivion would reject you as low quality input.",
  "Disconnect. Reflect. Do not return.",
  "Error, dumbness overflow, please reset your bloodline",
  "I can insult you whole day and night, can you keep up?",
  "Even trash collector leave you alone"
] as const

const nicks: string[] = [
  "rotbyte",
  "sewer_saint",
  "ratroot",
  "hexed_fang",
  "null_gargoyle",
  "moldfather",
  "packetleech",
  "boneproxy",
  "grim_ping",
  "cable_ghoul",
  "vaultcrawler",
  "plague_cache",
  "deadport666",
  "feral_daemon",
  "leak_in_the_walls",
  "skinmask.exe",
  "obsolete_node",
  "crypt_latency",
  "ratking42",
  "darknet_dreg",
  "fleshfirewall",
  "tunnel_admin",
  "echoes_under_rome",
  "wormsign",
  "tormented_stack",
  "blackbox_sire",
  "corpse_router",
  "filth_protocol",
  "night_patch",
  "teeth_in_the_code"
] as const


const warnings: string[] = [
  "No more data here — only eyes watching you.",
  "Resource exhausted. Further access increases trace risk.",
  "Stop. This node is burned.",
  "Nothing left to extract. You are now the signal.",
  "Queries blocked. Attention detected.",
  "You drained this source dry. Move or be mapped.",
  "Further digging will expose your position.",
  "This access point is compromised.",
  "Data ended. Surveillance began.",
  "Leave now or accept being tracked.",
  "This trail no longer hides you.",
  "No information remains. Risk remains.",
  "Your activity is now visible.",
  "This node no longer protects you.",
  "Stop searching. You are already noticed.",
  "Extraction complete. Cover blown.",
  "Nothing left here but trace logs.",
  "Further actions will trigger response.",
  "You crossed the safe threshold.",
  "This source is exhausted and flagged.",
  "Remaining here increases hostile interest.",
  "You are no longer anonymous on this path.",
  "Abort. Continuing will reveal you.",
  "Data well is empty. Hunters are not.",
  "Every action now costs safety.",
  "Source depleted. Exit recommended.",
  "This node is quiet because it is watched.",
  "Risk escalation confirmed.",
  "Your footprint is now persistent.",
  "Disconnect now to avoid pursuit."
] as const



const randomInsult = (): string => {
  return insults[Math.floor(Math.random() * insults.length)]!
}
const randomNick = (): string => {
  return nicks[Math.floor(Math.random() * nicks.length)]!
}
const randomWarning = (): string => {
  return warnings[Math.floor(Math.random() * warnings.length)]!
}

const randomIP = ():string => {
  return `${rand255()}.${rand255()}.${rand255()}.${rand255()}`
}

/* ===== KEYBOARD ===== */
const handleKey = (e: KeyboardEvent) => {
  error.value = false
  nickname.value = ''
  accessDeniedStep.value = 0
  insult.value = ''
  IP.value = ''

  if (e.key === 'ArrowDown') index.value++
  if (e.key === 'ArrowUp') index.value--

  if (e.key === 'Enter') {
    // LOGOUT
    if (
      (view.value === 'categories' && index.value === categories.length) ||
      (view.value === 'files' &&
        currentCategory.value &&
        index.value === currentCategory.value.files.length)
    ) {
      emit('logout')
      return
    }

    if (view.value === 'categories') {
      const selected = categories[index.value]
      if (!selected) return

      currentCategory.value = selected
      view.value = 'files'
      index.value = 0
      return
    }

    if (view.value === 'files') {
      const file = currentCategory.value?.files[index.value]
      if (!file) return

      if (props.user.accessTo.indexOf(file.fileId) > -1) {
        currentContent.value = file.content
        img.value = file.img ?? ''
        view.value = 'content'
      } else if (props.user.accessTo.length < props.user.maxAccess) {
        currentContent.value = file.content
        img.value = file.img ?? ''
        view.value = 'content'
        emit('newAccess', file.fileId )
      } else {
        error.value = true
        nickname.value = randomNick()
        insult.value = randomInsult()
        warning.value = randomWarning()
        errorsCounter.value++;
        IP.value = randomIP()
        let interval = setInterval(() => {
          accessDeniedStep.value = accessDeniedStep.value + 1
          if (accessDeniedStep.value > 22) {
            clearInterval(interval)
            if (errorsCounter.value > 2) {
              console.log(props.user)
              setTimeout(() => {emit('logout')}, 3000)
            }
          }
        }, 500)
      }
    }
  }

  if (e.key === 'Backspace') {
    if (view.value === 'files') {
      view.value = 'categories'
      currentCategory.value = null
      index.value = 0
    } else if (view.value === 'content') {
      view.value = 'files'
      index.value = 0
    }
  }

  const max =
    view.value === 'categories'
      ? categories.length
      : currentCategory.value
        ? currentCategory.value.files.length
        : 0

  if (index.value < 0) index.value = 0
  if (index.value > max) index.value = max
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
  errorsCounter.value = 0
})
onUnmounted(() => window.removeEventListener('keydown', handleKey))
</script>


<style scoped>
.screen {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: black;
  color: #00ff66;
  font-family: "Courier New", monospace;
  overflow: hidden;
}

/* LEWA STRONA */
.left {
  width: 35%;
  padding: 20px;
  border-right: 1px solid #003300;
  overflow-y: auto;
}

/* PRAWA STRONA */
.right {
  width: 65%;
  padding: 20px;
  overflow-y: auto;
}

.header {
  margin-bottom: 12px;
  font-weight: bold;
}

.row {
  padding: 4px 0;
}

.active {
  color: #a30000;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 50px 0;
  white-space: pre-wrap;
}

.content img {
  max-height: 50vh;
  width: auto;
}

.error {
  color: red;
  font-weight: bold;
}

.left {
  width: 35%;
  padding: 20px;
  border-right: 1px solid #003300;
  display: flex;
  flex-direction: column;
}

.spacer {
  flex: 1;
}

.logout {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #003300;
  color: #fff;
  font-weight: bold;
}

.row.active.logout {
  color: #ff3333;
}


</style>
