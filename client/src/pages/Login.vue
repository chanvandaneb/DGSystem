<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Eye, EyeOff, LoaderCircle } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    const res = await api.post<{ token: string; user: { id: string; username: string; name: string } }>('/auth/login', {
      username: username.value,
      password: password.value,
    })
    auth.setSession(res.token, res.user)
    toast.success(`Welcome back, ${res.user.name}`)
    router.push('/')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Sign in failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <!-- Left: form -->
    <div class="flex items-center justify-center px-6 py-12 sm:px-10">
      <div class="w-full max-w-sm">
        <div class="mb-10 flex items-center">
          <img src="/logo-dark.png" alt="DGSystem" class="h-9 w-auto dark:hidden" />
          <img src="/logo-light.png" alt="DGSystem" class="hidden h-9 w-auto dark:block" />
        </div>

        <h1 class="text-2xl font-bold tracking-tight">Welcome Back</h1>
        <p class="mt-1 text-sm text-muted-foreground">Sign in to your account:</p>

        <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
          <p v-if="error" class="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>

          <div>
            <label class="text-sm font-medium">Username<span class="text-[#2563EB]">*</span></label>
            <Input v-model="username" placeholder="Enter your username" required class="mt-1.5" />
          </div>

          <div>
            <label class="text-sm font-medium">Password<span class="text-[#2563EB]">*</span></label>
            <div class="relative mt-1.5">
              <Input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" class="pr-10" required />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-1">
            <label class="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox v-model="rememberMe" />
              Remember Me
            </label>
            <RouterLink to="/login" class="text-sm font-medium text-[#2563EB] hover:underline">
              Forgot Password?
            </RouterLink>
          </div>

          <Button type="submit" class="w-full" :disabled="loading">
            <LoaderCircle v-if="loading" class="h-4 w-4 animate-spin" />
            {{ loading ? 'Signing in...' : 'Sign in to DGSystem' }}
          </Button>
        </form>
      </div>
    </div>

    <!-- Right: brand panel -->
    <div class="relative hidden overflow-hidden bg-[#0B1530] lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div
        class="pointer-events-none absolute inset-0 opacity-40"
        style="background: repeating-linear-gradient(115deg, transparent 0px, transparent 60px, rgba(37,99,235,0.35) 60px, rgba(37,99,235,0.35) 62px)"
      />

      <div class="relative z-10">
        <h2 class="text-4xl font-bold leading-tight text-white">Welcome back!</h2>
        <p class="mt-4 max-w-md text-sm text-white/60">
          Sign in to track attendance, manage KPIs, and keep your team's tasks moving — all from one dashboard.
        </p>
      </div>

      <div class="relative z-10 rounded-2xl bg-white p-6 shadow-xl">
        <p class="text-lg font-semibold text-zinc-900">Please enter your login details</p>
        <p class="mt-2 text-sm text-zinc-500">
          Stay on top of your team's day-to-day, all in one place.
        </p>
        <div class="mt-4 flex items-center gap-2">
          <div class="flex -space-x-2">
            <span class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[10px] font-semibold text-zinc-700">CV</span>
            <span class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[10px] font-semibold text-zinc-700">SD</span>
            <span class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[10px] font-semibold text-zinc-700">NA</span>
          </div>
          <span class="text-xs text-zinc-500">+ your whole team</span>
        </div>
      </div>
    </div>
  </div>
</template>
