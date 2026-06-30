<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FileText, Camera } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { useToast } from '@/composables/useToast'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ProfileData {
  avatar: string
  eid: string
  fullname: string
  birthday: string
  gender: string
  nationality: string
  passportExpiry: string
  visaExpiry: string
  personalEmail: string
  personalPhone: string
  telegram: string
  messenger: string
  workingPhone: string
  homeAddress: string
  abroadAddress: string
  status: string
  interviewDate: string
  contractDate: string
  onboardDate: string
  regularDate: string
  resignedDate: string
  notes: string
}

interface ProfileDevice {
  id: string
  name: string
  lastActive: string
  location: string
}

const toast = useToast()
const profile = ref<ProfileData | null>(null)
const devices = ref<ProfileDevice[]>([])
const activeTab = ref<'about' | 'devices'>('about')
const saving = ref(false)
const uploadingAvatar = ref(false)
const avatarInput = ref<HTMLInputElement | null>(null)

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

onMounted(async () => {
  profile.value = await api.get<ProfileData>('/profile')
  devices.value = await api.get<ProfileDevice[]>('/profile/devices')
})

async function saveProfile() {
  if (!profile.value) return
  saving.value = true
  try {
    profile.value = await api.put<ProfileData>('/profile', profile.value)
    toast.success('Profile saved')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to save profile')
  } finally {
    saving.value = false
  }
}

function pickAvatar() {
  avatarInput.value?.click()
}

function resizeImage(file: File, maxDimension = 320, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Failed to read image'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Failed to load image'))
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas not supported'))
          return
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

async function onAvatarSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file || !profile.value) return
  if (!file.type.startsWith('image/')) {
    toast.error('Please select an image file')
    return
  }
  uploadingAvatar.value = true
  try {
    const dataUrl = await resizeImage(file)
    profile.value = await api.put<ProfileData>('/profile/avatar', { avatar: dataUrl })
    toast.success('Profile photo updated')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to upload photo')
  } finally {
    uploadingAvatar.value = false
    if (avatarInput.value) avatarInput.value.value = ''
  }
}
</script>

<template>
  <PageHeader title="Profile" />

  <div class="grid gap-4 lg:grid-cols-[320px_1fr]" v-if="profile">
    <div class="space-y-4">
      <Card>
        <CardContent class="flex flex-col items-center gap-2 pt-6 text-center">
          <input ref="avatarInput" type="file" accept="image/*" class="hidden" @change="onAvatarSelected" />
          <button
            type="button"
            class="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#2563EB]/10 text-[#2563EB] disabled:cursor-not-allowed"
            :disabled="uploadingAvatar"
            @click="pickAvatar"
          >
            <img v-if="profile.avatar" :src="profile.avatar" alt="Profile photo" class="h-full w-full object-cover" />
            <span v-else class="text-xl font-semibold">{{ profile.fullname.slice(0, 1).toUpperCase() }}</span>
            <span class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera class="h-5 w-5 text-white" />
            </span>
          </button>
          <p class="text-lg font-semibold">{{ profile.eid }}</p>
          <p class="text-sm text-muted-foreground">{{ profile.fullname.toUpperCase() }}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-base text-foreground">Update Password</CardTitle>
          <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <div>
            <label class="text-sm text-muted-foreground">Current Password</label>
            <Input v-model="currentPassword" type="password" class="mt-1.5" />
          </div>
          <div>
            <label class="text-sm text-muted-foreground">New Password</label>
            <Input v-model="newPassword" type="password" class="mt-1.5" />
          </div>
          <div>
            <label class="text-sm text-muted-foreground">Confirm Password</label>
            <Input v-model="confirmPassword" type="password" class="mt-1.5" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>

    <Card>
      <CardContent class="pt-6">
        <div class="mb-6 flex gap-1 border-b border-border">
          <button
            type="button"
            class="px-3 py-2 text-sm font-medium transition-colors"
            :class="activeTab === 'about' ? 'border-b-2 border-[#2563EB] text-[#2563EB]' : 'text-muted-foreground hover:text-foreground'"
            @click="activeTab = 'about'"
          >
            About me
          </button>
          <button
            type="button"
            class="px-3 py-2 text-sm font-medium transition-colors"
            :class="activeTab === 'devices' ? 'border-b-2 border-[#2563EB] text-[#2563EB]' : 'text-muted-foreground hover:text-foreground'"
            @click="activeTab = 'devices'"
          >
            Devices
          </button>
        </div>

        <div v-if="activeTab === 'about'" class="space-y-5">
          <button
            type="button"
            class="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground disabled:cursor-not-allowed"
            :disabled="uploadingAvatar"
            @click="pickAvatar"
          >
            <img v-if="profile.avatar" :src="profile.avatar" alt="Profile photo" class="h-full w-full object-cover" />
            <FileText v-else class="h-8 w-8" />
            <span class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera class="h-5 w-5 text-white" />
            </span>
          </button>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="text-sm text-muted-foreground">Fullname</label>
              <Input v-model="profile.fullname" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Birthday</label>
              <Input v-model="profile.birthday" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Gender <span class="text-[#2563EB]">*</span></label>
              <Input v-model="profile.gender" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Nationality</label>
              <Input v-model="profile.nationality" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Passport expiry</label>
              <Input v-model="profile.passportExpiry" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Visa expiry</label>
              <Input v-model="profile.visaExpiry" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Personal email</label>
              <Input v-model="profile.personalEmail" type="email" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Personal phone</label>
              <Input v-model="profile.personalPhone" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Telegram</label>
              <Input v-model="profile.telegram" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Messenger</label>
              <Input v-model="profile.messenger" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Working phone</label>
              <Input v-model="profile.workingPhone" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Home address</label>
              <Input v-model="profile.homeAddress" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Abroad address</label>
              <Input v-model="profile.abroadAddress" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Status</label>
              <Input :model-value="profile.status" readonly class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Interview date</label>
              <Input v-model="profile.interviewDate" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Contract date</label>
              <Input v-model="profile.contractDate" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Onboard date</label>
              <Input :model-value="profile.onboardDate" type="date" readonly class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Regular date</label>
              <Input :model-value="profile.regularDate" type="date" readonly class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Resigned date</label>
              <Input v-model="profile.resignedDate" type="date" class="mt-1.5" />
            </div>
            <div class="sm:col-span-2">
              <label class="text-sm text-muted-foreground">Notes</label>
              <Input v-model="profile.notes" class="mt-1.5" />
            </div>
          </div>

          <Button :disabled="saving" @click="saveProfile">{{ saving ? 'Saving...' : 'Save Profile' }}</Button>
        </div>

        <div v-else class="space-y-3">
          <div v-for="d in devices" :key="d.id" class="flex items-center justify-between border-b border-border pb-3 last:border-0">
            <div>
              <p class="text-sm font-medium">{{ d.name }}</p>
              <p class="text-xs text-muted-foreground">{{ d.location }}</p>
            </div>
            <span class="text-xs text-muted-foreground">{{ d.lastActive }}</span>
          </div>
          <p v-if="!devices.length" class="text-sm text-muted-foreground">No devices registered</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
