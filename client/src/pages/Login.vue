<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Eye, EyeOff, LoaderCircle } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar } from '@/components/ui/avatar'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()
const username = ref('chanvandaneb')
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
          <img src="/logo-dark.png" alt="DGSystem" class="h-9 w-auto" />
        </div>

        <h1 class="text-2xl font-bold tracking-tight">Welcome Back</h1>
        <p class="mt-1 text-sm text-muted-foreground">Welcome back! Select a method to sign in:</p>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" class="w-full">
            <svg class="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Google
          </Button>
          <Button variant="outline" type="button" class="w-full">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.2 22 17.06 22 12.06z" />
            </svg>
            Facebook
          </Button>
        </div>

        <div class="my-6 flex items-center gap-3">
          <div class="h-px flex-1 bg-border" />
          <span class="text-xs text-muted-foreground">Or continue with Email</span>
          <div class="h-px flex-1 bg-border" />
        </div>

        <form class="space-y-4" @submit.prevent="onSubmit">
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

        <p class="mt-6 text-center text-sm text-muted-foreground">
          New on our platform?
          <RouterLink to="/login" class="font-medium text-[#2563EB] hover:underline">Create an account</RouterLink>
        </p>
        <p class="mt-4 text-center text-xs text-muted-foreground">
          Demo credentials: <span class="font-mono">chanvandaneb</span> / <span class="font-mono">dgsystem123</span>
        </p>
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
        <p class="text-lg font-semibold text-foreground">Please enter your login details</p>
        <p class="mt-2 text-sm text-muted-foreground">
          Stay on top of your team's day-to-day, all in one place.
        </p>
        <div class="mt-4 flex items-center gap-2">
          <div class="flex -space-x-2">
            <Avatar class="h-7 w-7 border-2 border-white">CV</Avatar>
            <Avatar class="h-7 w-7 border-2 border-white">SD</Avatar>
            <Avatar class="h-7 w-7 border-2 border-white">NA</Avatar>
          </div>
          <span class="text-xs text-muted-foreground">+ your whole team</span>
        </div>
      </div>
    </div>
  </div>
</template>
