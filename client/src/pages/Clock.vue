<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Clock as ClockIcon, Video, LogIn, Coffee, LogOut, Droplet, Users, Briefcase, MoreHorizontal } from 'lucide-vue-next'
import { VisuallyHidden, DialogTitle } from 'reka-ui'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/layout/PageHeader.vue'
import { api } from '@/lib/api'
import { useToast } from '@/composables/useToast'
import { cn } from '@/lib/utils'

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

// Workday is considered to start at 09:00; check-ins after this are late.
const SHIFT_START_HOUR = 9
const SHIFT_START_MINUTE = 0

const breakTypes = [
  { value: 'wc', label: 'WC', icon: Droplet },
  { value: 'hr', label: 'HR', icon: Users },
  { value: 'office', label: 'Office Work', icon: Briefcase },
  { value: 'other', label: 'Other', icon: MoreHorizontal },
] as const

interface TodayState {
  session: { id: string; date: string; checkIn: string; checkOut: string | null } | null
  activeBreak: { id: string; breakIn: string; type: string } | null
}

const toast = useToast()
const checkedIn = ref(false)
const onBreak = ref(false)
const breakType = ref<string | null>(null)
const lateMinutes = ref<number | null>(null)
const checkInTime = ref<string | null>(null)
const busy = ref(false)

const showBreakDialog = ref(false)
const showCheckOutDialog = ref(false)

const timeString = computed(() => now.value.toLocaleTimeString('en-GB'))
const dateString = computed(() => now.value.toISOString().slice(0, 10))
const dayIndex = computed(() => now.value.getDay())
const fullDate = computed(() =>
  now.value.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
)

const isLate = computed(() => lateMinutes.value !== null && lateMinutes.value > 0)
const breakTypeLabel = computed(() => breakTypes.find((b) => b.value === breakType.value)?.label ?? null)

function computeLateMinutes(checkInStr: string): number {
  const [h = 0, m = 0] = checkInStr.split(':').map(Number)
  const diff = (h * 60 + m) - (SHIFT_START_HOUR * 60 + SHIFT_START_MINUTE)
  return diff > 0 ? diff : 0
}

function applyState(state: TodayState) {
  const active = !!state.session && !state.session.checkOut
  checkedIn.value = active
  checkInTime.value = active ? state.session!.checkIn : null
  lateMinutes.value = active ? computeLateMinutes(state.session!.checkIn) : null
  onBreak.value = !!state.activeBreak
  breakType.value = state.activeBreak?.type ?? null
}

async function checkIn() {
  busy.value = true
  try {
    applyState(await api.post<TodayState>('/attendance/check-in', {}))
    toast.success(`Checked in at ${checkInTime.value}`)
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Check-in failed')
  } finally {
    busy.value = false
  }
}

async function openBreakDialog() {
  if (onBreak.value) {
    // already on break: break out immediately, no need to pick a type again
    busy.value = true
    try {
      applyState(await api.post<TodayState>('/attendance/break-out', {}))
      toast.success('Break ended')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Break out failed')
    } finally {
      busy.value = false
    }
    return
  }
  showBreakDialog.value = true
}

async function confirmBreak(type: string) {
  showBreakDialog.value = false
  busy.value = true
  try {
    applyState(await api.post<TodayState>('/attendance/break-in', { type }))
    toast.success('Break started')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Break in failed')
  } finally {
    busy.value = false
  }
}

function requestCheckOut() {
  showCheckOutDialog.value = true
}

async function confirmCheckOut() {
  showCheckOutDialog.value = false
  busy.value = true
  try {
    applyState(await api.post<TodayState>('/attendance/check-out', {}))
    toast.success('Checked out — see you tomorrow!')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Check-out failed')
  } finally {
    busy.value = false
  }
}

onMounted(async () => {
  timer = setInterval(() => (now.value = new Date()), 1000)
  try {
    applyState(await api.get<TodayState>('/attendance/today'))
  } catch {
    // not critical: page still works, actions will surface errors
  }
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <PageHeader title="Attendance System" :description="fullDate" />

  <div class="grid gap-4 lg:grid-cols-2">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="flex items-center gap-2 text-base text-foreground">
            <ClockIcon class="h-4 w-4 text-muted-foreground" />
            System Time
          </CardTitle>
          <span class="text-xs text-muted-foreground">@ Asia/Phnom_Penh</span>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="rounded-lg border border-border bg-muted p-6">
          <p class="text-center font-mono text-5xl font-bold tracking-wider text-foreground">{{ timeString }}</p>
          <div class="mt-4 flex justify-center gap-2">
            <span
              v-for="(d, i) in days"
              :key="d"
              :class="cn(
                'rounded px-2 py-1 text-xs font-medium',
                i === dayIndex ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground',
              )"
            >
              {{ d }}
            </span>
          </div>
          <p class="mt-3 text-center text-sm text-muted-foreground">{{ dateString }}</p>
        </div>

        <div class="rounded-lg border border-border bg-muted p-4">
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium text-muted-foreground">Status</span>
            <Badge variant="success">READY</Badge>
          </div>
          <p class="mt-2 text-sm font-medium">
            {{ checkedIn ? (onBreak ? 'On break' : 'Working') : 'Standby mode' }}
          </p>
          <p v-if="checkedIn" class="mt-1 text-xs text-muted-foreground">
            Checked in at {{ checkInTime }} &middot; Break: {{ onBreak ? `Active (${breakTypeLabel})` : 'Inactive' }}
          </p>
          <div v-if="checkedIn" class="mt-2 flex items-center gap-2">
            <Badge v-if="isLate" variant="warning">Late by {{ lateMinutes }} min</Badge>
            <Badge v-else variant="success">On time</Badge>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="flex items-center gap-2 text-base text-foreground">
            <Video class="h-4 w-4 text-muted-foreground" />
            Camera
          </CardTitle>
          <Badge variant="destructive">Offline</Badge>
        </div>
        <p class="text-xs text-muted-foreground">Biometric</p>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted text-muted-foreground">
          <Video class="h-8 w-8" />
          <span class="text-xs">Camera unavailable</span>
        </div>

        <Button type="button" size="lg" class="w-full" :disabled="checkedIn || busy" @click="checkIn">
          <LogIn class="h-4 w-4" />
          Check in
        </Button>
        <Button type="button" size="lg" variant="outline" class="w-full" :disabled="!checkedIn || busy" @click="openBreakDialog">
          <Coffee class="h-4 w-4" />
          {{ onBreak ? 'Break out' : 'Break in' }}
        </Button>
        <Button type="button" size="lg" variant="outline" class="w-full" :disabled="!checkedIn || busy" @click="requestCheckOut">
          <LogOut class="h-4 w-4" />
          Check out
        </Button>
      </CardContent>
    </Card>
  </div>

  <Dialog v-model:open="showBreakDialog">
    <DialogContent class="max-w-sm p-6">
      <VisuallyHidden as-child>
        <DialogTitle>Select break type</DialogTitle>
      </VisuallyHidden>
      <h2 class="text-base font-semibold text-foreground">Select break type</h2>
      <p class="mt-1 text-xs text-muted-foreground">Choose the reason for this break.</p>
      <div class="mt-4 grid grid-cols-2 gap-3">
        <button
          v-for="bt in breakTypes"
          :key="bt.value"
          type="button"
          class="flex flex-col items-center gap-2 rounded-lg border border-border bg-muted p-4 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-accent"
          @click="confirmBreak(bt.value)"
        >
          <component :is="bt.icon" class="h-5 w-5 text-muted-foreground" />
          {{ bt.label }}
        </button>
      </div>
      <div class="mt-4 flex justify-end">
        <Button type="button" variant="outline" @click="showBreakDialog = false">Cancel</Button>
      </div>
    </DialogContent>
  </Dialog>

  <Dialog v-model:open="showCheckOutDialog">
    <DialogContent class="max-w-sm p-6">
      <VisuallyHidden as-child>
        <DialogTitle>Confirm check out</DialogTitle>
      </VisuallyHidden>
      <h2 class="text-base font-semibold text-foreground">Confirm check out</h2>
      <p class="mt-1 text-xs text-muted-foreground">Are you sure you want to check out? This will end your work session for today.</p>
      <div class="mt-4 flex justify-end gap-2">
        <Button type="button" variant="outline" @click="showCheckOutDialog = false">Cancel</Button>
        <Button type="button" @click="confirmCheckOut">Check out</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
