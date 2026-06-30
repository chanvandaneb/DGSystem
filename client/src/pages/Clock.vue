<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Clock as ClockIcon, Video, LogIn, Coffee, LogOut } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const checkedIn = ref(false)
const onBreak = ref(false)

const timeString = computed(() => now.value.toLocaleTimeString('en-GB'))
const dateString = computed(() => now.value.toISOString().slice(0, 10))
const dayIndex = computed(() => now.value.getDay())
const fullDate = computed(() =>
  now.value.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
)

function checkIn() {
  checkedIn.value = true
}
function breakToggle() {
  onBreak.value = !onBreak.value
}
function checkOut() {
  checkedIn.value = false
  onBreak.value = false
}

onMounted(() => {
  timer = setInterval(() => (now.value = new Date()), 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="flex flex-col items-center py-6 text-center">
    <h1 class="text-3xl font-bold text-[#2563EB]">Attendance System</h1>
    <p class="mt-1 text-sm text-muted-foreground">{{ fullDate }}</p>
  </div>

  <div class="mx-auto grid max-w-4xl gap-4 md:grid-cols-[1fr_320px]">
    <Card>
      <CardContent class="space-y-6 pt-6">
        <div class="flex items-center justify-between">
          <p class="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
            <ClockIcon class="h-4 w-4" />
            SYSTEM TIME
            <span class="text-xs font-normal text-muted-foreground">@ Asia/Phnom_Penh</span>
          </p>
          <div class="flex gap-1">
            <span class="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
            <span class="h-1.5 w-1.5 rounded-full bg-[#2563EB]/60" />
            <span class="h-1.5 w-1.5 rounded-full bg-[#2563EB]/30" />
          </div>
        </div>

        <div class="rounded-lg border border-border bg-muted p-6">
          <p class="text-center font-mono text-5xl font-bold tracking-wider text-[#2563EB]">{{ timeString }}</p>
          <div class="mt-4 flex justify-center gap-2">
            <span
              v-for="(d, i) in days"
              :key="d"
              :class="cn(
                'rounded px-2 py-1 text-xs font-medium',
                i === dayIndex ? 'bg-[#2563EB] text-white' : 'bg-background text-muted-foreground',
              )"
            >
              {{ d }}
            </span>
          </div>
          <p class="mt-3 text-center text-sm text-muted-foreground">{{ dateString }}</p>
        </div>

        <div class="rounded-lg border border-border bg-muted p-4">
          <div class="flex items-center justify-between text-xs">
            <span class="flex items-center gap-2 font-mono font-medium text-emerald-600 dark:text-emerald-400">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              STATUS
            </span>
            <Badge variant="success">READY</Badge>
          </div>
          <p class="mt-2 font-mono text-sm font-medium">
            {{ checkedIn ? (onBreak ? 'ON BREAK' : 'WORKING') : 'STANDBY MODE' }}
          </p>
          <p v-if="checkedIn" class="mt-1 text-xs text-muted-foreground">BREAK: {{ onBreak ? 'Active' : 'Inactive' }}</p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="space-y-4 pt-6">
        <div class="flex items-center justify-between">
          <p class="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
            <Video class="h-4 w-4" />
            CAMERA
            <span class="text-xs font-normal text-muted-foreground">Biometric</span>
          </p>
          <Badge variant="destructive">OFFLINE</Badge>
        </div>

        <div class="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted text-muted-foreground">
          <Video class="h-8 w-8" />
          <span class="text-xs">CAMERA UNAVAILABLE</span>
        </div>

        <button
          type="button"
          :disabled="checkedIn"
          class="flex w-full items-center justify-center gap-2 rounded-md bg-[#2563EB] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-40"
          @click="checkIn"
        >
          <LogIn class="h-4 w-4" />
          CHECK IN
        </button>
        <button
          type="button"
          :disabled="!checkedIn"
          class="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-muted py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          @click="breakToggle"
        >
          <Coffee class="h-4 w-4" />
          {{ onBreak ? 'BREAK OUT' : 'BREAK IN' }}
        </button>
        <button
          type="button"
          :disabled="!checkedIn"
          class="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-muted py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          @click="checkOut"
        >
          <LogOut class="h-4 w-4" />
          CHECK OUT
        </button>
      </CardContent>
    </Card>
  </div>
</template>
