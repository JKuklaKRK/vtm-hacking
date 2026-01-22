<template>
  <div class="hacker-screen" :class="{ glitch: glitchActive }">
    <div class="noise">{{ noise }}</div>

    <div class="loader">
      <div class="label">
        {{ text }} {{ Math.round(progress) }}%
      </div>
      <pre class="bar">[{{ bar }}]</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { hackerWords } from '../data/constants'

interface Props {
  duration: number
  text: string
  width?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 30
})

const emit = defineEmits<{
  (e: 'complete'): void
}>()

const progress = ref(0)
const noise = ref('')
const glitchActive = ref(false)

let noiseInterval: number
let progressInterval: number
let glitchInterval: number

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@*!?/\\|<>'

const generateNoise = () => {
  const charWidth = 8
  const charHeight = 14

  const cols = Math.ceil((window.innerWidth * 1.4) / charWidth)
  const lines = Math.ceil((window.innerHeight * 1.4) / charHeight)

  let output = ''

  for (let y = 0; y < lines; y++) {
    for (let x = 0; x < cols; x++) {
      output += randomNoiseChar()
    }
    output += '\n'
  }

  noise.value = output
}

const randomNoiseChar = () => {
  // 40% szans na pustkę
  if (Math.random() < 0.4) return ' '

  // 3% szans na słowo (tylko na początku "komórki")
  if (Math.random() < 0.03) {
    return hackerWords[Math.floor(Math.random() * hackerWords.length)]
  }

  return chars[Math.floor(Math.random() * chars.length)]
}


const bar = computed(() => {
  const filled = Math.round((progress.value / 100) * props.width)
  const empty = props.width - filled
  return '█'.repeat(filled) + '░'.repeat(empty)
})

onMounted(() => {
  const totalMs = props.duration * 1000
  const stepMs = 100
  const steps = totalMs / stepMs
  const stepValue = 100 / steps

  noiseInterval = window.setInterval(generateNoise, 50)

  glitchInterval = window.setInterval(() => {
    glitchActive.value = true
    setTimeout(() => (glitchActive.value = false), 80)
  }, 700 + Math.random() * 600)

  progressInterval = window.setInterval(() => {
    progress.value += stepValue

    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(progressInterval)
      clearInterval(noiseInterval)
      clearInterval(glitchInterval)
      emit('complete')
    }
  }, stepMs)
})

onUnmounted(() => {
  clearInterval(noiseInterval)
  clearInterval(progressInterval)
  clearInterval(glitchInterval)
})
</script>

<style scoped>
.hacker-screen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden; /* ← KLUCZ */
}

/* ===== NOISE ===== */
.noise {
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  font-family: "Courier New", monospace;
  font-size: 12px;
  line-height: 1.1;
  white-space: pre;
  opacity: 0.15;
  pointer-events: none;
}

/* ===== LOADER ===== */
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: #A30000;
}

.label {
  margin-bottom: 6px;
  font-weight: bold;
  letter-spacing: 1px;
}

.bar {
  font-size: 15px;
}

/* ===== GLITCH EFFECT ===== */
.glitch {
  animation: glitch-shift 0.08s linear;
}

@keyframes glitch-shift {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-2px, 1px);
  }
  50% {
    transform: translate(2px, -1px);
  }
  75% {
    transform: translate(-1px, 2px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.glitch .loader {
  text-shadow:
    2px 0 red,
    -2px 0 cyan;
}
</style>
