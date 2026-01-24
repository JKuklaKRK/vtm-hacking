<template>
  <div class="hacker-screen">
    <div class="noise">{{ noise }}</div>

    <div class="terminal">
        <div class="line">GEHENNA TERMINAL v3.7</div>
        <div class="line">AUTHORIZATION REQUIRED</div>
        <div class="spacer"></div>

        <div class="line">
            <span class="label">USERNAME:</span>
            <span class="input">
                {{ stage === 'username' ? maskedInput : maskedUsername }}
            </span>
        </div>

        <div v-if="stage === 'password'" class="line">
            <span class="label">PASSWORD:</span>
            <span class="input">
                {{ maskedInput }}
            </span>
        </div>

      <div v-if="error" class="error">
        {{ errorText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { hackerWords } from '../data/constants'
import type { User } from '../types/types'

type Stage = 'username' | 'password'
const props = defineProps<{ users: User[] }>()

const logged = ref<number | null>(null)

const stage = ref<Stage>('username')
const username = ref('')
const input = ref('')
const error = ref(false)
const errorText = ref('')

const noise = ref('')
let noiseInterval: number

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const randomNoiseChar = () => {
  if (Math.random() < 0.55) return ' '
  if (Math.random() < 0.08)
    return hackerWords[Math.floor(Math.random() * hackerWords.length)]
  return chars[Math.floor(Math.random() * chars.length)]
}

const generateNoise = () => {
  const charWidth = 8
  const charHeight = 14

  const cols = Math.ceil((window.innerWidth * 1.4) / charWidth)
  const rows = Math.ceil((window.innerHeight * 1.4) / charHeight)

  let output = ''
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      output += randomNoiseChar()
    }
    output += '\n'
  }

  noise.value = output
}

const maskedUsername = computed(() => '*'.repeat(username.value.length))
//const maskedPassword = computed(() => '*'.repeat(password.value.length))
const maskedInput = computed(() => '*'.repeat(input.value.length))

const emit = defineEmits<{
  (e: 'success', user:User): void
}>()

const handleKey = (e: KeyboardEvent) => {
  if (logged.value) return

  if (e.key === 'Enter') {
    if (stage.value === 'username') {
      username.value = input.value
      input.value = ''
      stage.value = 'password'
      return
    }

    if (stage.value === 'password') {
      const user = props.users.find(
        u => u.username === username.value && u.password === input.value
      )

      if (user) {
        console.log(user)
        if (user.accessTo.length >= user.maxAccess) {
          error.value = true
          stage.value = 'username'
          username.value = ''
          input.value = ''
          errorText.value = 'YOU USED ALL YOUR RESOURCES, DO SOMETHING TO INCREASE THEM AND MAYYYYBE WE WILL LET YOU IN!'
        } else {
          logged.value = user.id
          error.value = false
          emit('success', user)
        }
      } else {
        error.value = true
        stage.value = 'username'
        username.value = ''
        input.value = ''
      }
    }
    return
  }

  if (e.key === 'Backspace') {
    input.value = input.value.slice(0, -1)
    return
  }

  if (e.key.length === 1) {
    input.value += e.key
    error.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
  generateNoise()
  noiseInterval = window.setInterval(generateNoise, 250)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
  clearInterval(noiseInterval)
})
</script>

<style scoped>
.hacker-screen {
  position: fixed;
  inset: 0;
  background: black;
  overflow: hidden;
  font-family: "Courier New", monospace;
}

.noise {
  position: absolute;
  inset: -20%;
  white-space: pre;
  font-size: 12px;
  line-height: 1.1;
  opacity: 0.1;
  color: white;
  pointer-events: none;
}

.terminal {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10vw;
  color: white;
  z-index: 2;
}

.line {
  margin-bottom: 6px;
}

.label {
  margin-right: 8px;
}

.input {
  color: #A30000;
  letter-spacing: 2px;
}

.error {
  margin-top: 10px;
  color: #ff3333;
  font-weight: bold;
}

.spacer {
  height: 12px;
}
</style>
