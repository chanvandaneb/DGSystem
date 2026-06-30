<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Eye, EyeOff, ClipboardCheck, FileText, Upload } from 'lucide-vue-next'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ProfileData {
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

const profile = ref<ProfileData | null>(null)
const devices = ref<ProfileDevice[]>([])
const reveal = ref(false)
const activeTab = ref<'about' | 'devices'>('about')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

onMounted(async () => {
  profile.value = await api.get<ProfileData>('/profile')
  devices.value = await api.get<ProfileDevice[]>('/profile/devices')
})
</script>

<template>
  <PageHeader title="Profile" />

  <div class="grid gap-4 lg:grid-cols-[320px_1fr]" v-if="profile">
    <div class="space-y-4">
      <Card>
        <CardContent class="flex flex-col items-center gap-2 pt-6 text-center">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
            <ClipboardCheck class="h-9 w-9" />
          </div>
          <p class="text-lg font-semibold">{{ profile.eid }}</p>
          <p class="text-sm text-muted-foreground">{{ profile.fullname.toUpperCase() }}</p>
          <Button variant="ghost" size="icon" @click="reveal = !reveal">
            <Eye v-if="!reveal" class="h-4 w-4" />
            <EyeOff v-else class="h-4 w-4" />
          </Button>
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
          <div class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground">
            <FileText class="h-8 w-8" />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="text-sm text-muted-foreground">Fullname</label>
              <Input :model-value="reveal ? profile.fullname : '•'.repeat(profile.fullname.length)" readonly class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Birthday</label>
              <Input :model-value="reveal ? profile.birthday : '•'.repeat(10)" readonly class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Gender <span class="text-[#2563EB]">*</span></label>
              <Input :model-value="profile.gender" readonly class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Nationality</label>
              <Input :model-value="profile.nationality" readonly class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Passport expiry</label>
              <Input :model-value="profile.passportExpiry" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Visa expiry</label>
              <Input :model-value="profile.visaExpiry" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Personal email</label>
              <Input :model-value="profile.personalEmail" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Personal phone</label>
              <Input :model-value="profile.personalPhone" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Telegram</label>
              <Input :model-value="profile.telegram" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Messenger</label>
              <Input :model-value="profile.messenger" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Working phone</label>
              <Input :model-value="profile.workingPhone" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Home address</label>
              <Input :model-value="profile.homeAddress" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Abroad address</label>
              <Input :model-value="profile.abroadAddress" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Status</label>
              <Input :model-value="profile.status" readonly class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Interview date</label>
              <Input :model-value="profile.interviewDate" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Contract date</label>
              <Input :model-value="profile.contractDate" type="date" class="mt-1.5" />
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
              <Input :model-value="profile.resignedDate" type="date" class="mt-1.5" />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Notes</label>
              <Input :model-value="profile.notes" class="mt-1.5" />
            </div>
          </div>

          <div>
            <p class="mb-2 text-sm font-medium">Curriculum Vitae</p>
            <div class="flex gap-2">
              <div class="flex h-16 w-12 items-center justify-center rounded-md border border-border bg-muted">
                <FileText class="h-5 w-5 text-muted-foreground" />
              </div>
              <button type="button" class="flex h-16 w-12 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground hover:bg-accent">
                <Upload class="h-4 w-4" />
              </button>
            </div>
          </div>

          <Button>Save Profile</Button>
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
